import { prisma } from "@repo/db/client";
import { Request, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../constants/http-status.code";
import { userSchema } from "@repo/common/user";

export const getUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
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

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.userId,
      },
    });
    res.status(OK).json({ message: "User deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      // Prisma error code for "Record to delete does not exist."
      res.status(NOT_FOUND).json({ message: "User not found" });
      return;
    }
    console.error("Error in deleteUserController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    // Use id from params if present, otherwise fallback to req.userId
    const id = req.params.id ;

    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    // check if user exists
    if (!user) {
      res.status(NOT_FOUND).json({ message: "User not found" });
      return;
    }

    const parsedData = userSchema.safeParse(req.body);

    if (!parsedData.success) {
      res.status(BAD_REQUEST).json({
        message: "Invalid data",
        errors: parsedData.error.errors,
      });
      return;
    }
    const { name, username, email } = parsedData.data;

    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name,
        username,
        email,
      },
    });

    const { password, ...userWithoutPassword } = updatedUser;
    res.status(OK).json(userWithoutPassword);
  } catch (error) {
    console.error("Error in updateUserController:", error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};
