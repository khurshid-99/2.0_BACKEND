const express = require("express");
const { followUserController, unfollowUserController } = require("../controllers/follow.controller");
const identifyUser = require("../middlewares/auth.middleware");

const followRouter = express.Router();

followRouter.post("/follow/:username", identifyUser, followUserController);
followRouter.post("/unfollow/:username", identifyUser, unfollowUserController);

module.exports = followRouter;
