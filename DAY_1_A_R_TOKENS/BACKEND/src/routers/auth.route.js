const { Router } = require("express");
const {
  registerController,
  loginController,
  getAccessTokenController,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const authRoute = Router();

authRoute.get("/me", authMiddleware, (req, res) => {
  return res.status(200).json({
    message: "Current User loggedIn.",
    user: req.user,
  });
});
authRoute.post("/register", registerController);
authRoute.post("/login", loginController);

authRoute.get("/get-accesstoken", getAccessTokenController);

module.exports = authRoute;
