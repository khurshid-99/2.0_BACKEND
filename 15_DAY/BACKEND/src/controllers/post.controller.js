const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  try {
    const { caption } = req.body;
    const file = req.file;

    const respons = await client.files.upload({
      file: await toFile(Buffer.from(file.buffer), "file"),
      fileName: file.url,
    });

    console.log(respons);

    res.status(201).json({
      message: "ok",
      respons
    });
  } catch (error) {
    console.log(`postController Error ${error} `);
    return res.status(500).json({
      message: "Internal server error ",
      error,
    });
  }
}

module.exports = createPostController;
