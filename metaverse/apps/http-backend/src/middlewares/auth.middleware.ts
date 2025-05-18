import { Request, Response, NextFunction, RequestHandler } from "express";
import { UNAUTHORIZED } from "../constants/http-status.code";
import { verifyToken } from "../utils/auth.utils";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      sessionId?: number;
    }
  }
}

const authenticate: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const accessToken = req.cookies.accessToken as string | undefined;

  if (!accessToken) {
    res.status(UNAUTHORIZED).json({ message: "Unauthorized" });
    return;
  }

  try {
    const { payload, error } = verifyToken(accessToken);

    if (error && error.message === "jwt expired") {
      res.status(UNAUTHORIZED).json({ message: "Token expired" });
      return;
    }

    if (error) {
      res.status(UNAUTHORIZED).json({ message: "Invalid access token" });
      return;
    }

    req.userId = payload?.userId;
    req.sessionId = payload?.sessionId;
    next();
  } catch (error) {
    res.status(UNAUTHORIZED).json({ message: "Unauthorized" });
    return;
  }
};

export default authenticate;
export {};