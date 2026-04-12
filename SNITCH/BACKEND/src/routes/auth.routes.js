import {Router} from "express"
import { validatRegisterUser } from "../validators/auth.validator.js";

const authRouter = Router();

authRouter.post("/register", validatRegisterUser )

export default authRouter;