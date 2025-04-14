import "dotenv/config";
import morgan from "morgan";
import express, { Router } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import { authMiddleware } from "./middlewares/auth.middleware";
import spaceRoutes from "./routes/space.routes";
import { getAvailableAvatars } from "./controllers/index.controller";

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);
// app.use(cookieParser());

const v1Route = Router();

app.use("/api/v1", v1Route);

v1Route.get("/", (req, res) => {
  res.json("Backend is working fine");
});

v1Route.use("/auth", authRoutes);
// @ts-ignore
v1Route.use("/user", authMiddleware, userRoutes);
// @ts-ignore
v1Route.use("/space", authMiddleware, spaceRoutes);
// @ts-ignore
v1Route.use("/avatar", authMiddleware, getAvailableAvatars);

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
