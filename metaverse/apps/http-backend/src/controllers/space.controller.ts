import { Request, Response } from "express";

export const getSpaceByIdController = async (req: Request, res: Response):Promise<void> => {
  try {
    res.status(200).json("hello");
  } catch (error) {
    console.log("error updating metadata", error);
  }
};

export const getAllSpacesController = async (req: Request, res: Response):Promise<void> => {
  try {
    res.status(200).json("hello");
  } catch (error) {
    console.log("error updating metadata", error);
  }
};

export const createSpaceController = async (req: Request, res: Response):Promise<void> => {
  try {
    res.status(200).json("hello");
  } catch (error) {
    console.log("error updating metadata", error);
  }
};

export const updateSpaceController = async (req: Request, res: Response):Promise<void> => {
  try {
    res.status(200).json("hello");
  } catch (error) {
    console.log("error updating metadata", error);
  }
};

export const deleteSpaceController = async (req: Request, res: Response):Promise<void> => {
  try {
    res.status(200).json("hello");
  } catch (error) {
    console.log("error updating metadata", error);
  }
};
