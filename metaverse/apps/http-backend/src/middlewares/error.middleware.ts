import { ErrorRequestHandler, Response } from "express";
import z from "zod";
import { BAD_REQUEST } from "../constants/http-status.code";
import AppError from "../utils/error.utils";
import { REFRESH_PATH } from "../utils/cookies";

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

const handleAppError = (res: Response, error: AppError) => {
  return res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};

// @ts-ignore
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH: ${req.path}`, error);

  if (req.path === REFRESH_PATH) {
    res.status(401).json({
      message: "Unauthorized",
      errorCode: "UNAUTHORIZED",
    });
  }

  if (error instanceof z.ZodError) {
    return handleZodError(res, error);
  }

  if (error instanceof AppError) {
    return handleAppError(res, error);
  }

  return res.status(500).send("Internal Server Error");
};

export default errorHandler;
