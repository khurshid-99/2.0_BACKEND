const express = require("express");
const identifyUser = require("../middlewares/auth.middleware");
const {
  followUserController,
  unfollowUserController,
  followStatusController,
} = require("../controllers/follow.controller");

const followRouter = express.Router();

followRouter.post("/follow/:id", identifyUser, followUserController);
followRouter.post("/unfollow/:id", identifyUser, unfollowUserController);
followRouter.patch("/follow/:username", identifyUser, followStatusController);

// followRouter.get("/following", identifyUser, followingController)
// followRouter.get("/followers", identifyUser, getFollowers)

module.exports = followRouter;
