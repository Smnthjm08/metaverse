import "dotenv/config";
import morgan from "morgan";
import express, { Router } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { FRONTEND_ORIGIN } from "./configs/env";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error.middleware";
import { OK } from "./constants/http-status.code";
import userRoutes from "./routes/user.routes";
import authenticate from "./middlewares/auth.middleware";
import sessionRoutes from "./routes/session.routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);
app.use(cookieParser());

const v1Route = Router();

app.use("/api/v1", v1Route);

v1Route.get("/", async (req, res, next) => {
  try {
    res.status(OK).json({ message: "Backend is working fine" });
  } catch (error) {
    next(error);
  }
});

v1Route.use("/auth", authRoutes);
v1Route.use("/user", authenticate, userRoutes);
v1Route.use("/session", authenticate, sessionRoutes);

app.use(errorHandler);
const PORT = 5001;

app
  .listen(PORT, () => {
    console.log(
      `App is listening on PORT ${PORT} at http://localhost:${PORT}/api/v1`
    );
  })
  .on("error", (error) => {
    console.error("Server startup error:", error);
  });
