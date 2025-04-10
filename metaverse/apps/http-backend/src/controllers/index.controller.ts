import { Request, Response } from "express";

export const getAvailableAvatars = async (req: Request, res: Response):Promise<void> => {
  try {
    res.status(200).json("hello");
  } catch (error) {
    console.log("error updating metadata", error);
  }
};
