const express = require("express");
const {
  authRegisterController,
  authLoginController,
} = require("../controllers/auth.controller");

const authRoute = express.Router();

authRoute.post("/register", authRegisterController);
authRoute.post("/login", authLoginController);

module.exports = authRoute;
