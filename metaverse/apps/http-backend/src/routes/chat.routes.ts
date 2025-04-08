import { Router, Router as ExpressRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

const chatRoutes: ExpressRouter = Router();

// chatRoutes.get("/:roomId", authMiddleware, getChatsController);

export default chatRoutes;
