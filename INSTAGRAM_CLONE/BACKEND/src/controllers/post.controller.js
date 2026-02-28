const postModle = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require("../models/like.model");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const { caption } = req.body;
  const file = req.file;
  // console.log(file);

  const uploadFile = await client.files.upload({
    file: await toFile(Buffer.from(file.buffer), file.originalname),
    fileName: file.originalname,
    folderName: "instagram_2.0/",
  });
  // console.log(uploadFile);

  const post = await postModle.create({
    caption,
    url: uploadFile.url,
    user: req.user.id,
    filetype: file.mimetype,
  });

  return res.status(201).json({
    message: "Post createded successfull",
    post,
  });
}

async function getAllPostsController(req, res) {
  const posts = await postModle.find({
    user: req.user.id,
  });

  if (!posts) {
    return res.status(401).json({
      message: "Posts not found",
    });
  }

  return res.status(200).json({
    message: "Fetched all posts successfully.",
    posts: posts,
  });
}

async function getPostDetails(req, res) {
  const { postId } = req.params;
  const userId = req.user.id;

  const post = await postModle.findById(postId);

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "Frobidden you are not authorized to access this post detils",
    });
  }

  return res.status(200).json({
    message: "Post fetched successfully.",
    post,
  });
}

async function getFeedController(req, res) {
  const username = req.user.username;

  const posts = await Promise.all(
    (await postModle.find({}).sort({_id: -1}).populate("user").lean()).map(async (post) => {
      const isLiked = await likeModel.findOne({
        user: username,
        post: post._id,
      });

      post.isLiked = Boolean(isLiked);

      return post;
    }),
  );

  // console.log(posts);

  if (!posts) {
    return res.status(404).json({
      message: "Posts not found",
    });
  }

  res.status(200).json({
    message: "Posts feathed successfully",
    posts,
  });
}

module.exports = {
  createPostController,
  getAllPostsController,
  getPostDetails,
  getFeedController,
};
