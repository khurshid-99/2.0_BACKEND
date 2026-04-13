import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
  }),
);

app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "App is OK",
  });
});

import authRouter from "./routes/auth.routes.js";

app.use("/api/auth", authRouter);

export default app;
