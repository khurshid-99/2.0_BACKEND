import {Router} from "express"
import { validatRegisterUser } from "../validators/auth.validator.js";
import { registerController } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", validatRegisterUser, registerController )

export default authRouter;