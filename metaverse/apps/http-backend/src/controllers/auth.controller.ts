import { signUpSchema, signInSchema } from "@repo/common/auth";
import { prisma } from "@repo/db/client";
import { Request, Response, RequestHandler } from "express";
import { verifyToken } from "../utils/auth.utils";
import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  OK,
  UNAUTHORIZED,
} from "../constants/http-status.code";
import { createUser, refreshUserAccessToken, signinUser } from "../services/auth.services";
import { clearAuthCookies, setAuthCookies } from "../utils/cookies";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "../utils/date.utils";

export const signUpController: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // validate request
    const parsedData = signUpSchema.safeParse({
      ...req.body,
      userAgent: req.headers["user-agent"],
    });

    if (!parsedData.success) {
      res
        .status(BAD_REQUEST)
        .json({ error: "Invalid data", details: parsedData.error.format() });
      return;
    }

    const { user, accessToken, refreshToken } = await createUser(
      parsedData.data
    );

    setAuthCookies({ res, accessToken, refreshToken })
      .status(CREATED)
      .json(user);
  } catch (error) {
    console.error(error);
    // Handle specific errors
    if (error instanceof Error) {
      if (error.message === "User already exists!") {
        console.log("error at opas", error);
        res.status(BAD_REQUEST).json({ error: error.message });
        return;
      }
      if (error.message === "Password needs to be string") {
        console.log("error at Password", error);
        res.status(BAD_REQUEST).json({ error: error.message });
        return;
      }
    }

    res.status(INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
  }
};

export const signInController: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const parsedData = signInSchema.safeParse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  if (!parsedData.success) {
    res
      .status(BAD_REQUEST)
      .json({ error: "Invalid data", details: parsedData.error.format() });
    return;
  }

  const { accessToken, refreshToken } = await signinUser(parsedData?.data);

  setAuthCookies({ res, accessToken, refreshToken })
    .status(OK)
    .json({ message: "Login Successful" });
};

export const logoutController: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const accessToken = req.cookies.accessToken as string;

  const { payload, error } = verifyToken(accessToken || "");

  if (payload) {
    const sessionId = payload?.sessionId;

    if (sessionId) {
      try {
        const existingSession = await prisma.sessions.findUnique({
          where: { id: sessionId },
        });

        if (existingSession) {
          await prisma.sessions.delete({
            where: { id: sessionId },
          });
        } else {
          console.warn(`No session found for id ${sessionId}, skipping delete.`);
        }
      } catch (err) {
        console.error("Error deleting session:", err);
        // return res.status(INTERNAL_SERVER_ERROR).json({ message: "Logout failed." });
      }
    }
  }

  clearAuthCookies(res);
  res.status(OK).json({
    message: "Logout successful.",
  });
};

export const refreshTokenController: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Check if refreshToken exists in cookies
    const currentRefreshToken = req.cookies.refreshToken;
    
    if (!currentRefreshToken) {
       res.status(UNAUTHORIZED).json({ message: "Missing Refresh Token" });
    }
        
    try {
      // Await the refresh token function
      const { accessToken, refreshToken } = await refreshUserAccessToken(currentRefreshToken);
      
      // Set the access token cookie
      res.cookie("accessToken", accessToken, {
        expires: fifteenMinutesFromNow(),
        httpOnly: true,
        sameSite: 'strict'
      });
      
      // Set the refresh token cookie if a new one was generated
      if (refreshToken) {
        res.cookie("refreshToken", refreshToken, {
          expires: thirtyDaysFromNow(),
          httpOnly: true,
          sameSite: 'strict'
        });
      }
      
      // Send the response
       res.status(OK).json({
        message: "Access Token Refreshed",
      });
    } catch (tokenError) {
      console.error("Token refresh error:", tokenError);
       res.status(UNAUTHORIZED).json({ 
        message: "Invalid or expired refresh token",
        // @ts-ignore
        error: tokenError.message 
      });
    }
  } catch (error) {
    console.error("Refresh controller error:", error);
     res.status(500).json({ error: "Internal Server Error" });
  }
};