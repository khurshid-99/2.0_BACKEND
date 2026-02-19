const express = require("express");
const {
  likePostController,
  removePostLikeController,
} = require("../controllers/like.contoller");
const identifyUser = require("../middlewares/auth.middleware");

const likeRouter = express.Router();

likeRouter.post("/like/:postId", identifyUser, likePostController);
likeRouter.post("/dislike/:postId", identifyUser, removePostLikeController);

module.exports = likeRouter;
