const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const { caption } = req.body;
  const file = req.file;

  const uploadFile = await client.files.upload({
    file: await toFile(Buffer.from(file.buffer), "file"),
    fileNamd: "post_test",
    folderName: "cohort_2.0/",
  });

  /**
   * @DATABASE : Creating New Entry in postModel with req.body and req.file and req.user.id
   */
  const post = await postModel.create({
    caption,
    imgUri: uploadFile.uri,
    user: req.user.id,
  });

  /**
   * @RESPONSE : Success! New Post created and returned with 201 Status
   */
  return res.status(201).json({
    message: "Post create successfully.",
    post,
  });
}

async function getAllPostController(req, res) {
  const { id } = req.user;

  // Ferch posts by user ID
  const posts = await postModel.find({
    user: id,
  });
  // Check post have or not
  if (!posts) {
    return res.status(404).json({
      message: "You haven't created any posts yet.",
    });
  }

  /**
   * @RESPONSE : Success! [posts : id, caption, imgUri, user] retrieved and returned with 200 Status
   */
  return res.status(200).json({
    message: "Posts fetched successfully.",
    posts,
  });
}

async function getDetailController(req, res) {
  /**
   * @USER : Extracting id from authenticated req.user (Middleware)
   * @PARAMS : Extract {postID} from URL parameters
   */
  const { id } = req.user;
  const { postId } = req.params;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }
  /**
   * @VERIFY : Check if User ID is the Owner of this Post
   * @RESPONSE : Unauthorized! No valid token or login failed
   */
  const isVerifyUser = post.user.toString() === id;

  if (!isVerifyUser) {
    return res.status(401).json({
      message: "Unauthorized you have no access.",
    });
  }

  /**
   * @RESPONSE : Success! Data retrieved and returned with 200 Status
   */
  return res.status(200).json({
    message: "Post fetched successfuly.",
    post,
  });
}

async function likeController(req, res) {
  /**
   * @USER : Extracting id from authenticated req.user (Middleware)
   * @PARAMS : Extract {postID} from URL parameters
   */

  const { username } = req.user;
  const { id } = req.params;

  const post = await postModel.findById(id);

  if (!post) {
    return res.status(401).json({
      message: "Post not found",
    });
  }

  const like = await likeModel.create({
    post: id,
    user: username,
  });

  return res.status(201).json({
    message: "Post liked successfully.",
    like,
  });
}

module.exports = {
  createPostController,
  getAllPostController,
  getDetailController,
  likeController,
};
