const express = require("express");
const { authRegister } = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/register", authRegister);

module.exports = authRouter;
