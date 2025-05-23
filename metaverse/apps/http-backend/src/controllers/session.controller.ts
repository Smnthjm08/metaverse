import { Request, Response } from "express";
import { INTERNAL_SERVER_ERROR, OK } from "../constants/http-status.code";
import { prisma } from "@repo/db/client";

interface sessionTypes {
  id: number;
  expiresAt: Date;
  createdAt: Date;
  userAgent: string | null;
  currentSession?: boolean;
}

export const getSessionsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const sessions = await prisma.sessions.findMany({
      where: {
        userId: req.userId,
        expiresAt: {
          gt: new Date(),
        },
      },
      select: {
        id: true,
        expiresAt: true,
        createdAt: true,
        userAgent: true,
      },
    });

    //isCurrent property to each session
    const sessionsWithCurrent = sessions.map((session: sessionTypes) => ({
      ...session,
      currentSession: session.id === req.sessionId,
    }));

    res.status(OK).json(sessionsWithCurrent);
  } catch (error) {
    console.error("Error in getSessionsController:", error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
    return;
  }
};

export const deleteSessionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const sessionIdParam = req.params.id;
    const sessionId = sessionIdParam ? parseInt(sessionIdParam, 10) : NaN;

    if (isNaN(sessionId)) {
      res.status(400).json({ message: "Invalid session ID" });
      return;
    }

    // Check if the session ID is valid
    const session = await prisma.sessions.delete({
      where: {
        id: sessionId,
        userId: req.userId,
      },
    });

    if (!session) {
      res.status(404).json({ message: "Session not found" });
      return;
    }

    res.status(OK).json({
      message: "Session deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteSessionController:", error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
    return;
  }
};
