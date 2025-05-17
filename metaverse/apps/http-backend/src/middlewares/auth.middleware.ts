import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/env";

export interface AuthRequest extends Request {
  userId: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.header("Authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.replace("Bearer ", "")
    : authHeader;

  if (!token) {
    return res.status(401).json({
      message: "Authentication required. Please provide a valid token.",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
    };

    // Add user ID to request object for use in route handlers
    (req as AuthRequest).userId = decoded.id;

    next();
  } catch (err) {
    if ((err as Error).name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired",
        code: "TOKEN_EXPIRED",
      });
    }

    console.error("JWT verification failed:", err);
    next(err);
    return res.status(403).json({ message: "Invalid token" });
  }
}
