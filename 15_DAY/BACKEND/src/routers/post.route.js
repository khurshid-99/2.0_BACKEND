const express = require("express");
const createPostController = require("../controllers/post.controller");
const multer = require("multer");

const postRoute = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

postRoute.post("/", upload.single("post"), createPostController);

module.exports = postRoute;
