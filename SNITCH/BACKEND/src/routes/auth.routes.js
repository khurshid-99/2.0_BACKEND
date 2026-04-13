import {Router} from "express"
import { validatLoginUser, validatRegisterUser } from "../validators/auth.validator.js";
import { loginController, registerController } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", validatRegisterUser, registerController );
authRouter.post("/login",validatLoginUser, loginController)

export default authRouter;