import { Router, Router as ExpressRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createRoomController,
  getRoomIdController,
  getRoomsController,
} from "../controllers/room.controllers";

const roomRoutes: ExpressRouter = Router();

roomRoutes.post("/", authMiddleware, createRoomController);
roomRoutes.get("/", authMiddleware, getRoomsController);
roomRoutes.get("/:slug", authMiddleware, getRoomIdController);

export default roomRoutes;
