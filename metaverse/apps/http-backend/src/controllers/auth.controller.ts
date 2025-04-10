import { signUpSchema, signInSchema } from "@repo/common/auth";
import { prisma } from "@repo/db/client";
import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import {
  comparePassword,
  encryptPassword,
  generateAccessToken,
  generateRefreshToken,
  userTypes,
} from "../utils/auth.utils";
import { envConfig } from "../configs/env";

export const signUpController: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsedData = signUpSchema.safeParse(req.body);

    if (!parsedData.success) {
      res
        .status(400)
        .json({ error: "Invalid data", details: parsedData.error.format() });
      return;
    }

    const { username, name, email, password, role, avatar } = parsedData.data;

    const userExists = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (userExists) {
      res
        .status(400)
        .json({ error: "User with this email/username already exists" });
      return;
    }

    const hashedPassword = await encryptPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        name,
        email,
        password: hashedPassword,
        avatarId: avatar ?? 1,
        // @ts-ignore
        role,
      },
    });

    // Generate both access and refresh tokens
    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
    });

    res.status(201).json({
      message: "Signed Up Successfully",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        avatarId: user.avatarId,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signInController: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const parsedData = signInSchema.safeParse(req.body);

  if (!parsedData.success) {
    res
      .status(400)
      .json({ error: "Invalid data", details: parsedData.error.format() });
    return;
  }

  const { username, email, password } = parsedData.data;

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (!user) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    const comparedPassword = await comparePassword(password, user.password);
    if (!comparedPassword) {
      res.status(400).json({ error: "Incorrect password" });
      return;
    }

    // Generate both access and refresh tokens
    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
    });

    res.status(200).json({
      message: "Signed in Successfully",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const refreshTokenController: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //refresh token from request body, headers, or cookies
    const refreshToken =
      req.body.refreshToken ||
      req.headers.authorization?.split(" ")[1] ||
      req.cookies?.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ error: "Refresh token is required" });
      return;
    }

    // Verify the refresh token
    jwt.verify(
      refreshToken,
      envConfig.JWT_SECRET,
      async (err: any, decoded: any) => {
        if (err) {
          return res
            .status(403)
            .json({ error: "Invalid or expired refresh token" });
        }

        try {
          // Get user from database to ensure they still exist and are authorized
          const user = await prisma.user.findUnique({
            where: { id: decoded.id },
          });

          if (!user) {
            return res.status(403).json({ error: "User not found" });
          }

          // Generate new access token
          const newAccessToken = generateAccessToken({
            id: user.id,
            email: user.email,
          });

          // Return the new access token
          res.status(200).json({
            accessToken: newAccessToken,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
