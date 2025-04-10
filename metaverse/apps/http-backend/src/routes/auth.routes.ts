import { Router } from "express";
import {
  refreshTokenController,
  signInController,
  signUpController,
} from "../controllers/auth.controller";

const authRoutes: Router = Router();

authRoutes.post("/signup", signUpController);
authRoutes.post("/signin", signInController);
authRoutes.post("/refresh", refreshTokenController);

export default authRoutes;
