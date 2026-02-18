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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
