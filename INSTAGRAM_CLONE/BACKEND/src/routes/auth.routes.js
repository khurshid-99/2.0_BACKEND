const express = require("express");
const {
  registreController,
  loginController,
} = require("../controllers/auth.controller");

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

module.exports = authRouter;
