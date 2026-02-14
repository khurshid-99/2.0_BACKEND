const postModel = require("../models/post.modle");
const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const { caption } = req.body;
  console.log(caption);
  const file = req.file;
  // console.log(file);

  if (!file) {
    return res.status(400).json({
      message: "Image is required",
    });
  }

  const respons = await client.files.upload({
    file: await toFile(Buffer.from(file.buffer), "file"),
    fileName: `post_${Date.now()}`,
    folder: "posts",
  });

  // console.log(respons);

  const { token } = req.cookies;
  // console.log(token);

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decode.id);

    const newPost = await postModel.create({
      caption,
      uri: respons.url,
      user: decode.id,
    });

    res.status(201).json({
      message: "Post create successfully",
      newPost,
    });
  } catch (error) {
    return res.status(401).json({
      message: "forbitend ",
    });
  }
}

module.exports = { createPostController };
