const express = require("express");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const {
  creaPostController,
  getAllPostsController,
  getPostDetailsController,
} = require("../controllers/post.controller");
const identifyUser = require("../middlewares/auth.middleware");

const postRouter = express.Router();

postRouter.post("/", identifyUser, upload.single("post"), creaPostController);
postRouter.get("/", identifyUser, getAllPostsController);
postRouter.get("/details/:postId", identifyUser, getPostDetailsController);

module.exports = postRouter;
