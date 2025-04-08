import jwt from "jsonwebtoken";
import { signInSchema, signUpSchema } from "@repo/common/schema";
import { prisma } from "@repo/db/client";
import { Request, Response, RequestHandler } from "express";

// TODO - pending env
const JWT_SECRET = "secret";

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

    const { username, email, password } = parsedData.data;

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

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
        avatar: "default-avatar.jpg",
      },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, user });
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

    if (user.password !== password) {
      res.status(400).json({ error: "Incorrect password" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Sign-in successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
