import { Router } from "express";
import { deleteUserController, getUserController, updateUserController } from "../controllers/user.controller";

const userRoutes: Router = Router();

// api/v1/user
userRoutes.get("/", getUserController);
userRoutes.delete("/:id", deleteUserController);
userRoutes.put("/:id", updateUserController);

export default userRoutes;
