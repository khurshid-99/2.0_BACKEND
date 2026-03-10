import { Router } from "express";
import { registerController } from "../controllers/auth.controllers.js";
import { body, validationResult } from "express-validator";
import { registerValidation } from "../validation/auth.validation.js";

const authRouter = Router();

// authRouter.post(
//   "/register",
//   [
//     body("username").isString().withMessage("username should be string"),
//     body("email").isEmail().withMessage("email should be valid email address"),
//     (req, res, next) => {
//       const errors = validationResult(req);

//       if (errors.isEmpty()) {
//         return next();
//       }

//       res.status(400).json({
//         errors: errors.array(),
//       });
//     },
//   ],
//   registerController,
// );

authRouter.post("/register", registerValidation, registerController);

export default authRouter;
