import { prisma } from "@repo/db/client";
import { Request, Response } from "express";

export const updateUsermetadataController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json("hello");
  } catch (error) {
    console.log("error updating metadata", error);
  }
};

export const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await prisma.user.findMany({
      select: {
        name: true,
        id: true,
        email: true,
        username: true,
        avatar: true,
        avatarId: true,
        role: true,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log("error updating metadata", error);
  }
};

export const getSessionUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // @ts-ignore
    const id = req?.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        avatar: true,
        avatarId: true,
        role: true,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.log("error updating metadata", error);
  }
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    console.log("id", req.params.id);

    if (!id || typeof id !== "string") {
      res.status(400).json({ message: "Invalid or missing user ID" });
      return;
    }

    const userExists = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    console.log("userExists", userExists);
    if (!userExists) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const { name, email, username, avatarId } = req.body;

    const user = await prisma.user.update({
      where: {
        // @ts-ignore
        id: id,
      },
      data: {
        name,
        email,
        username,
        avatarId,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.log("error updating metadata", error);
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    console.log("id", req.params.id);

    if (!id || typeof id !== "string") {
      res.status(400).json({ message: "Invalid or missing user ID" });
      return;
    }

    const userExists = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    console.log("userExists", userExists);

    if (!userExists) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("error updating metadata", error);
  }
};
