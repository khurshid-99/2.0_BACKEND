const { Router } = require("express");
const {
  registerController,
  loginController,
  getAccessTokenController,
} = require("../controllers/auth.controller");

const authRoute = Router();

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);

authRoute.get("/get-accesstoken", getAccessTokenController);

module.exports = authRoute;
