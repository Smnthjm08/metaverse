import { Request, Response } from "express";
import { prisma } from "@repo/db/client";

export const getAvailableAvatars = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const avatars = await prisma.avatar.findMany();
    res.status(200).json(avatars);
  } catch (error) {
    console.log("error updating metadata", error);
  }
};
