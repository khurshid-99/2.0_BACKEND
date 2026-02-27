const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  filetype: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
