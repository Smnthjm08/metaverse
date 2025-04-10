import { Request, Response } from "express";

export const updateUsermetadataController = async (req: Request, res: Response):Promise<void> => {
  try {
    res.status(200).json("hello");
  } catch (error) {
    console.log("error updating metadata", error);
  }
};

export const getUserController = async (req: Request, res: Response):Promise<void> => {
  try {
    res.status(200).json("hello");
  } catch (error) {
    console.log("error updating metadata", error);
  }
};

export const updateUserController = async (req: Request, res: Response):Promise<void> => {
  try {
    res.status(200).json("hello");
  } catch (error) {
    console.log("error updating metadata", error);
  }
};

export const deleteUserController = async (req: Request, res: Response):Promise<void> => {
  try {
    res.status(200).json("hello");
  } catch (error) {
    console.log("error updating metadata", error);
  }
};
