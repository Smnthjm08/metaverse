import { prisma } from "@repo/db/client";
import {
  encryptPassword,
  comparePassword,
  verifyToken,
} from "../utils/auth.utils";
import { VerificationCodeTypes } from "../constants/auth.types";
import {
  oneDayInMilliseconds,
  oneYearFromNow,
  thirtyDaysFromNow,
} from "../utils/date.utils";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/env";


export type createUserParams = {
  username: string;
  email: string;
  name?: string;
  password: string;
  userAgent?: string;
  avatarId?: number;
};

export type signinUserParams = {
  username?: string;
  email?: string;
  password: string;
  userAgent?: string;
};

export type RefreshTokenPayload = {
  sessionId: number;
};

export const createUser = async (data: createUserParams) => {
  const { username, email, password, userAgent, name, avatarId } = data;

  try {
    // Check for existing user
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      throw new Error("User already exists!");
    }

    if (typeof password !== "string") {
      throw new Error("Password needs to be string");
    }

    const hashedPassword = await encryptPassword(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        name,
        password: hashedPassword,
        avatarId: avatarId,
      },
    });

    // Create verification code
    await prisma.verificationCode.create({
      data: {
        userId: user.id,
        type: VerificationCodeTypes.email,
        expiresAt: oneYearFromNow(),
      },
    });

    // TODO: Send verification email

    // Create session
    const session = await prisma.sessions.create({
      data: {
        userId: user.id,
        userAgent,
        expiresAt: oneYearFromNow(),
      },
    });

    // Sign tokens
    const accessToken = jwt.sign(
      { sessionId: session.id, userId: user.id },
      JWT_SECRET,
      {
        expiresIn: "15m",
        audience: ["user"],
      }
    );

    const refreshToken = jwt.sign(
      { sessionId: session.id },
      JWT_SECRET,
      {
        expiresIn: "30d",
        audience: ["user"],
      }
    );

    const { password: _password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  } catch (err) {
    console.error("Error in createUser:", err);
    throw err; // Let the controller handle the response
  }
};

export const signinUser = async (data: signinUserParams) => {
  const { username, email, password, userAgent } = data;

  // get the user by email/username
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  // validate password
  const validatePassword = await comparePassword(password, user?.password);

  if (!validatePassword) {
    throw new Error("Invalid email or password.");
  }

  const userId = user?.id;

  // create session
  const session = await prisma.sessions.create({
    data: {
      userId: userId,
      userAgent: userAgent,
      expiresAt: oneYearFromNow(),
    },
  });

  // sign access and refresh token
  const accessToken = jwt.sign(
    { sessionId: session?.id, userId: userId },
    JWT_SECRET,
    {
      expiresIn: "15m",
      audience: ["user"],
    }
  );

  const refreshToken = jwt.sign({ sessionId: session?.id }, JWT_SECRET, {
    expiresIn: "30d",
    audience: ["user"],
  });

  // return user and tokens
  const { password: _password, ...userWithoutPassword } = user;
    return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: JWT_SECRET,
  });

  if (!payload) {
    throw new Error("Unauthorized, Invalid refresh token");
  }

  const session = await prisma.sessions.findUnique({
    where: {
      id: payload.sessionId,
    },
  });

  const now = Date.now();

  if (session && session.expiresAt.getTime() < now) {
    throw new Error("Unauthorized, Session Expired");
  }

  // refresh session it it expires in 24 hours
  const sessionNeedsRefresh = session && session.expiresAt.getTime() - now < oneDayInMilliseconds
  if (sessionNeedsRefresh) {
    await prisma.sessions.update({
      where: {
        id: session.id,
      },
      data: {
        expiresAt: thirtyDaysFromNow(),
      },
    });
  }

  const newRefreshToken = sessionNeedsRefresh ? jwt.sign({ sessionId: session?.id }, JWT_SECRET, {
    expiresIn: "30d",
    audience: ["user"],
  }) :  undefined;

  // sign new access token
  const accessToken = jwt.sign(
    { sessionId: session?.id, userId: session?.userId },
    JWT_SECRET,
    {
      expiresIn: "15m",
      audience: ["user"],
    }
  );


  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};
