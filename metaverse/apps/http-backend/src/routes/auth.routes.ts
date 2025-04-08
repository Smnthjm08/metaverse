import { Router } from "express";
import { signInController, signUpController } from '../controllers/auth.controllers';

const authRoutes: Router = Router();

authRoutes.post("/signup",signUpController);
authRoutes.post("/signin",signInController);

export default authRoutes;