import { prisma } from "@repo/db/client";
import { encryptPassword } from "../utils/auth.utils";
import { VerificationCodeTypes } from "../constants/auth.types";
import { oneYearFromNow } from "../utils/date.utils";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/env";
import appAssert from "../utils/app-assert.utils";
import { CONFLICT } from "../constants/http";

export type CreateAccountParams = {
  username: string;
  email: string;
  password?: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  // verify existing user doesn't exist
  const { username, email, password, userAgent } = data;

  const userExists = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  // if (userExists) {
  //   throw new Error("User already exists!");
  // }

  appAssert(!userExists, CONFLICT, "Email already in Use.");

  if (typeof password !== "string") {
    throw new Error("Password needs to be string");
  }

  const hashedPassword = await encryptPassword(password, 10);

  // create user
  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword,
    },
  });

  // create verfication code
  await prisma.verificationCode.create({
    data: {
      userId: user?.id,
      type: VerificationCodeTypes.email,
      expiresAt: oneYearFromNow(),
    },
  });

  // TODO: send email

  // create session
  const session = await prisma.sessions.create({
    data: {
      userId: user?.id,
      userAgent: userAgent,
      expiresAt: oneYearFromNow(),
    },
  });

  // sign access and refresh token
  const accessToken = jwt.sign(
    { sessionId: session?.id, userId: user?.id },
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

  // return user and token
  // Exclude password from user object
  const { password: _password, ...userWithoutPassword } = user;
  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
};
