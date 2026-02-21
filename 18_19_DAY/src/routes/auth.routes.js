const express = require("express");
const authContorllers = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/register", authContorllers.registerController);
authRouter.post("/login", authContorllers.loginController);


module.exports = authRouter;
