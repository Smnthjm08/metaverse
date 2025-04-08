import { prisma } from "@repo/db/client";
import { Request, Response } from "express";

export const getChatsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const roomId: number = parseInt(req.params.roomId as string, 10);
    if (isNaN(roomId)) {
      res.status(400).json({ message: "Invalid roomId" });
    }

    const messages = await prisma.chat.findMany({
      where: { roomId: roomId },
      orderBy: {
        id: 'desc'
      },
      take: 50
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
