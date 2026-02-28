const likeModel = require("../models/like.model");
const postModel = require("../models/post.model");

async function likePostController(req, res) {
  const username = req.user.username;
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
    user: username,
    post: postId,
  });

  if (isAlreadyLiked) {
    return res.status(409).json({
      message: "You already liked this post.",
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: username,
  });

  return res.status(201).json({
    message: "Post liked successfully.",
    like: like,
  });
}

async function removePostLikeController(req, res) {
  const username = req.user.username;
  const { postId } = req.params;

  // console.log(username, postId);

  // console.log(postId);
  

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post not found.",
    });
  }

  // console.log(post);
  
  const isPostLiked = await likeModel.findOne({
    post: postId,
    user: username,
  });

  console.log(isPostLiked)

  if (!isPostLiked) {
    return res.status(409).json({
      message: "You are not liked this post.",
    });
  }

  await likeModel.findOneAndDelete({
    _id: isPostLiked._id,
  });

  return res.status(200).json({
    message: "Remove like from the post",
  });
}

module.exports = { likePostController, removePostLikeController };
