const express = require("express");

const {
  registreController,
  loginController,
  getMeController,
} = require("../controllers/auth.controller");

const userIdentify = require("../middlewares/auth.middleware");

const authRouter = express.Router();

/**
 * @API apiName
 * @DESCRIPTION  description
 * @CLIENT_INPUT  data received from client
 * @RESPONSE  what this API returns
 * @AUTHOR  KHURSHID ALAM
 */
authRouter.post("/register", registreController);
authRouter.post("/login", loginController);
authRouter.get("/get_me", userIdentify, getMeController);

module.exports = authRouter;
