const express = require("express");
const userIdentify = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.post(
  "/follow/:username",
  userIdentify,
  userController.followController,
);

userRouter.post(
  "/unfollow/:username",
  userIdentify,
  userController.unfollowController,
);

module.exports = userRouter;
