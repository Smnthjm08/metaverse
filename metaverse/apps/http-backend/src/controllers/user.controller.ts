import { prisma } from "@repo/db/client";
import { Request, Response } from "express";
import { NOT_FOUND, OK } from "../constants/http-status.code";

export const getUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("getUserController called with userId:", req?.userId);
    const user = await prisma.user.findUnique({
      where: {
        id: req?.userId,
      },
    });

    // check if user exists
    if (!user) {
      res.status(NOT_FOUND).json({ message: "User not found" });
      return;
    }

    const { password, ...userWithoutPassword } = user;
    res.status(OK).json(userWithoutPassword);
  } catch (error) {
    console.error("Error in getUserController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
