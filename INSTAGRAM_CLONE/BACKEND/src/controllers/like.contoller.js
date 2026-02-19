const likeModel = require("../models/like.model");
const postModel = require("../models/post.model");

async function likePostController(req, res) {
  const userId = req.user.id;
  const { postId } = req.params;

  //   console.log(userId, "user id");
  //   console.log(postId, "post id");

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found.",
    });
  }

  const isAlreadyLiked = await likeModel.findOne({
    user: userId,
    post: postId,
  });

  if (isAlreadyLiked) {
    return res.status(409).json({
      message: "You already liked this post.",
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: userId,
  });

  return res.status(201).json({
    message: "Post liked successfully.",
    like: like,
  });
}

async function removePostLikeController(req, res) {
  const userId = req.user.id;
  const { postId } = req.params;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post not found.",
    });
  }

  const isPostLiked = await likeModel.findOne({
    user: userId,
    post: postId,
  });

  if (!isPostLiked) {
    return res.status(409).json({
      message: "You are not liked this post.",
    });
  }

  await likeModel.findOneAndDelete({
    user: userId,
    post: postId,
  });

  return res.status(200).json({
    message: "Remove like from the post",
  });
}

module.exports = { likePostController, removePostLikeController };
