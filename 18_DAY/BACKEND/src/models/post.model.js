const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    require: true,
  },
  uri: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
