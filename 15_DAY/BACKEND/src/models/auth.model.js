const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  bio: {
    type: String,
  },
  profileImage: {
    type: String,
    default:
      "https://imagekit.io/dashboard/media-library/detail/698b72f85c7cd75eb8a96dcf",
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
