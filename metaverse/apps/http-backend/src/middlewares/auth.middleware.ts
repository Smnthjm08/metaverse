import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
// import  JWT_SECRET  from '@repo/backend-common/config';

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export function  authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
     res.status(401).json({ message: "No token provided" });
  }

  try {
    // @ts-ignore
    const decoded = jwt?.verify(token, JWT_SECRET) as { userId: string };

    // @ts-ignore
    req.userId = decoded.userId;

    next(); 
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(403).json({ message: "Unauthorized" });
  }
}

