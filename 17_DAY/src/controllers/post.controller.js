const postModel = require("../models/post.model");
const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const { token } = req.cookies;
  const file = req.file;
  const { caption } = req.body;
  //   console.log(token);

  // console.log(file);

  if (!token) {
    return res.status(401).json({
      message: "Token not provided, Unauthorized acces",
    });
  }

  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(403).json({
      message: `Forbidden ${error} `,
    });
  }

  console.log(decoded);

  const upload = await client.files.upload({
    file: await toFile(Buffer.from(file.buffer), "file"),
    fileName: "Test",
    folderName: "cohort_2.0/",
  });

  const post = await postModel.create({
    caption: caption,
    uri: upload.uri,
    user: decoded.id,
  });

  res.status(201).json({
    message: "Post create successfully",
    post,
  });
}

async function getPostController(req, res) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized Access. ",
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Token Invalid",
    });
  }

  const userId = decoded.id;

  const posts = await postModel.find({
    user: userId,
  });

  return res.status(200).json({
    message: "Posts featch successfully",
    posts,
  });
}

async function getPostDetailsController(req, res) {
  const { token } = req.cookies;
  const { postId } = req.params;

  // console.log(postId, "postid");

  if (!token) {
    return res.status(401).json({
      message: "UnAuthorized Access",
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized access!.",
    });
  }

  const userId = decoded.id;
  // const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(401).json({
      message: "Post not found",
    });
  }

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "Frobidden Contend",
    });
  }

  return res.status(200).json({
    message: "Post fetched successfully ",
    post,
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
};
