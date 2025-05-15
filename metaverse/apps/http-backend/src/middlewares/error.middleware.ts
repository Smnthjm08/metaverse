import { ErrorRequestHandler, Response } from "express";
import z from "zod";
import { BAD_REQUEST } from "../constants/http";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));

  return res.status(BAD_REQUEST).json({
    message: error?.message,
    errors,
  });
};

// @ts-ignore
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH: ${req.path}`, error);

  // if (error instanceof z.ZodError) {
  //   return handleZodError(res, error);
  // }

  res.status(500).send("Internal Server Error");
  //   return res.status(500).send("Internal Server Error");
};

export default errorHandler;
