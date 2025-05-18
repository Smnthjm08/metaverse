import { Router } from "express";
import { getUserController } from "../controllers/user.controller";

const userRoutes: Router = Router();

// api/v1/user
userRoutes.get("/", getUserController);

export default userRoutes;
