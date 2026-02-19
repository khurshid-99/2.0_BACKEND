const express = require("express");
const identifyUser = require("../middlewares/auth.middleware");
const {
  followUserController,
  unfollowUserController,
  followStatusController,
} = require("../controllers/follow.controller");

const followRouter = express.Router();

followRouter.post("/follow/:username", identifyUser, followUserController);
followRouter.post("/unfollow/:username", identifyUser, unfollowUserController);
followRouter.patch(
  "/follow/:username",
  identifyUser,
  followStatusController,
);

module.exports = followRouter;
