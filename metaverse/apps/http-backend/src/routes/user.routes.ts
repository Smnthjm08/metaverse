import { Router } from "express";
import {
  deleteUserController,
  getSessionUserController,
  getAllUsersController,
  updateUserController,
  updateUsermetadataController,
} from "../controllers/user.controller";

const userRoutes: Router = Router();

userRoutes.get("/:id", getAllUsersController);
userRoutes.get("/", getSessionUserController);
userRoutes.put("/:id", updateUserController);
userRoutes.delete("/:id", deleteUserController);

userRoutes.put("/metadata", updateUsermetadataController);

export default userRoutes;
