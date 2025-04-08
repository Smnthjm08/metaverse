import { createRoomSchema } from "@repo/common/schema";
import { prisma } from "@repo/db/client";
import { Request, Response } from "express";

const JWT_SECRET = "secret";

// export interface requestUser extends Request {
//   userId: string // or any other type
// }

export const createRoomController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsedData = createRoomSchema.safeParse(req.body);

    if (!parsedData.success) {
      res.status(400).json({
        error: "Invalid data",
        details: parsedData.error.format(),
      });
    }

    // @ts-ignore
    const adminId = req.userId;
    // @ts-ignore
    const { slug } = parsedData.data;

    const slugExists = await prisma.room.findUnique({
      where: { slug: slug },
    });

    if (slugExists) {
      res.status(400).json({
        message: "Room with this name already exists",
      });
    }

    const room = await prisma.room.create({
      data: {
        slug: slug,
        adminId: adminId,
      },
    });

    res.status(201).json({ roomId: room.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRoomsController = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const adminId = req.userId;

    const data = await prisma.room.findMany({ where: { adminId: adminId } });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRoomIdController = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;
    if (typeof slug !== "string") {
      res.status(400).json({
        error: "Invalid data",
      });
      return;
    }

    const room = await prisma.room.findFirst({
      where: {
        slug: slug,
      },
    });

    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }

    res.status(200).json(room.id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
