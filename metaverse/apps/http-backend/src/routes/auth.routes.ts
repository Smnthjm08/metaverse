import { Router } from "express";
import {
  logoutController,
  refreshTokenController,
  signInController,
  signUpController,
} from "../controllers/auth.controller";

// /v1/auth
const authRoutes: Router = Router();

authRoutes.post("/signup", signUpController);
authRoutes.post("/signin", signInController);
authRoutes.get("/logout", logoutController);
authRoutes.get("/refresh", refreshTokenController);

export default authRoutes;
