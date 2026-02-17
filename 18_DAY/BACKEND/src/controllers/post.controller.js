const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function creaPostController(req, res) {
  const { caption } = req.body;
  // const { token } = req.cookies;

  const file = req.file;
  console.log(file);

  // if (!token) {
  //   return res.status(401).json({
  //     message: "Unauthorized token",
  //   });
  // }

  // let decoded = null;
  // try {
  //   decoded = await jwt.verify(token, process.env.JWT_SECRET);
  // } catch (error) {
  //   return res.status(403).json({
  //     message: `Forbidden ${error}`,
  //   });
  // }

  const respons = await client.files.upload({
    file: await toFile(Buffer.from(file.buffer), "file"),
    fileName: "test",
    folderName: "cohort_2.0/",
  });

  console.log(respons);

  const post = await postModel.create({
    caption,
    uri: respons.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

async function getAllPostsController(req, res) {
  // const { token } = req.cookies;

  // // console.log(token);

  // if (!token) {
  //   return res.status(401).json({
  //     message: "Unauthorized token not found",
  //   });
  // }

  // let decoded = null;
  // try {
  //   decoded = await jwt.verify(token, process.env.JWT_SECRET);
  // } catch (error) {
  //   res.status(401).json({
  //     message: "Unouthrized tokne",
  //   });
  // }

  // const userId = decoded.id;

  // console.log("userId ", userId);

  const posts = await postModel.find({
    user: req.user.id,
  });

  if (!posts) {
    return res.status(401).json({
      message: "Unauthorized posts not found",
    });
  }

  return res.status(200).json({
    message: "Featched all posts successfully.",
    posts,
  });
}

async function getPostDetailsController(req, res) {
  // const { token } = req.cookies;
  const { postId } = req.params;

  // if (!token) {
  //   return res.status(401).json({
  //     message: "Unauthorized Access.",
  //   });
  // }

  // let decoded = null;
  // try {
  //   decoded = await jwt.verify(token, process.env.JWT_SECRET);
  // } catch (error) {
  //   return res.status(403).json({
  //     message: `Frobidden your not authorized to access this post details `,
  //   });
  // }

  const userId = req.user.id;

  const post = await postModel.findById(postId);

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "Frobidden you are not valid for access this post.",
    });
  }

  return res.status(200).json({
    message: "Post fetched successfully.",
    post,
  });
}

module.exports = {
  creaPostController,
  getAllPostsController,
  getPostDetailsController,
};
