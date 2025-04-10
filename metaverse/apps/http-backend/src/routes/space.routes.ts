import { Router } from "express";
import {
  createSpaceController,
  deleteSpaceController,
  getAllSpacesController,
  getSpaceByIdController,
  updateSpaceController,
} from "../controllers/space.controller";

const spaceRoutes: Router = Router();

spaceRoutes.get("/", getAllSpacesController);
spaceRoutes.post("/", createSpaceController);
spaceRoutes.get("/:id", getSpaceByIdController);
spaceRoutes.put("/:id", updateSpaceController);
spaceRoutes.delete("/:id", deleteSpaceController);

export default spaceRoutes;
