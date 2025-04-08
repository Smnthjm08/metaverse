import { Router, Router as ExpressRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getChatsController } from "../controllers/chat.controllers";

const chatRoutes: ExpressRouter = Router();

chatRoutes.get("/:roomId", authMiddleware, getChatsController);

export default chatRoutes;
