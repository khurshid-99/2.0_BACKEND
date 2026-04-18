import { Router } from "express";
import {
  validatLoginUser,
  validatRegisterUser,
} from "../validators/auth.validator.js";
import {
  getMeController,
  googleCallback,
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import passport from "passport";
import config from "../configs/config.js";
import { authenticateUser } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", validatRegisterUser, registerController);
authRouter.post("/login", validatLoginUser, loginController);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect:
      config.NODE_ENV === "development"
        ? "http://localhost:5173/login"
        : "/login",
  }),
  googleCallback,
);

authRouter.get("/me", authenticateUser, getMeController);

export default authRouter;
