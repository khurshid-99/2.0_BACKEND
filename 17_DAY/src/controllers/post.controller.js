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
  console.log(token);

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

module.exports = { createPostController };
