import { prisma } from "@repo/db/client";
import { Request, Response } from "express";
import { spaceSchema } from "@repo/common/space";

export const getAllSpacesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const spaces = await prisma.space.findMany();

    res.status(200).json(spaces);
  } catch (error) {
    console.log("error updating metadata", error);
  }
};

export const getSpaceByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const space = await prisma.space.findUnique({
      where: {
        id: id,
      },
    });

    if (!space) {
      res.status(404).json({ message: "Space not found" });
      return;
    }

    res.status(200).json(space);
  } catch (error) {
    console.log("error updating metadata", error);
  }
};

export const createSpaceController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsedData = await spaceSchema.safeParse(req.body);

    if (!parsedData.success) {
      res
        .status(400)
        .json({ error: "Invalid data", details: parsedData.error.format() });
      return;
    }
    const { name, width, height, thumbnail, capacity } = parsedData?.data;

    const space = await prisma.space.create({
      name,
      width,
      height,
      thumbnail,
      capacity,
      // @ts-ignore
      creator: { connect: { id: req?.userId } },
    });
  } catch (error) {
    console.log("error updating metadata", error);
  }
};

export const updateSpaceController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json("hello");
  } catch (error) {
    console.log("error updating metadata", error);
  }
};

export const deleteSpaceController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;

    const deletedSpace = await prisma.space.delete({
      where: {
        id: id,
      },
    });

    res
      .status(200)
      .json({ message: "Space deleted successfully", deletedSpace });
  } catch (error) {
    console.log("error deleting space", error);
    res.status(500).json({ error: "Failed to delete space" });
  }
};
