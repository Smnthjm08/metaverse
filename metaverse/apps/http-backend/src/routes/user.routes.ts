import { Router } from "express";
import {
    deleteUserController,
  getUserController,
  updateUserController,
  updateUsermetadataController,
} from "../controllers/user.controller";

const userRoutes: Router = Router();

userRoutes.get("/:id", getUserController);
userRoutes.put("/:id", updateUserController);
userRoutes.delete("/:id", deleteUserController);
userRoutes.put("/metadata", updateUsermetadataController);

export default userRoutes;
