const express = require("express");
const postController = require("../controllers/post.controller");
const userIdentify = require("../middlewares/auth.middleware");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const postRouter = express.Router();

postRouter.post(
  "/",
  userIdentify,
  upload.single("post"),
  postController.createPostController,
);

postRouter.get("/", userIdentify, postController.getAllPostController);

postRouter.get(
  "/details/:postId",
  userIdentify,
  postController.getDetailController,
);

module.exports = postRouter;
