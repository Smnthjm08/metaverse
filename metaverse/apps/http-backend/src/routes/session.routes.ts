import { Router } from "express";
import { deleteSessionController, getSessionsController } from "../controllers/session.controller";

const sessionRoutes: Router = Router();


sessionRoutes.get("/", getSessionsController);
sessionRoutes.delete("/:id", deleteSessionController);


export default sessionRoutes;