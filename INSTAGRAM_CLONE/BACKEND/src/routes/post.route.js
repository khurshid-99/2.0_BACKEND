const express = require("express");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const identifyUser = require("../middlewares/auth.middleware");
const {
  createPostController,
  getAllPostsController,
  getPostDetails,
} = require("../controllers/post.controller");

const postRouter = express.Router();

postRouter.post("/", identifyUser, upload.single("post"), createPostController);
postRouter.get("/", identifyUser, getAllPostsController);
postRouter.get("/details/:postId", identifyUser, getPostDetails);

module.exports = postRouter;
