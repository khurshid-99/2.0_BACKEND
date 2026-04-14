import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./configs/config.js";
import passport from "passport";
import { Strategy as GoogleStratgy } from "passport-google-oauth20";

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

app.use(passport.initialize());
passport.use(
  new GoogleStratgy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "App is OK",
  });
});

import authRouter from "./routes/auth.routes.js";

app.use("/api/auth", authRouter);

export default app;
