import "dotenv/config";

import express, { Router } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3001", // Replace with your frontend's URL
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true, // If using cookies or authentication
}));
// app.use(cookieParser());

const v1Route = Router();

app.use("/api/v1", v1Route);

v1Route.use("/auth", authRoutes);

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
