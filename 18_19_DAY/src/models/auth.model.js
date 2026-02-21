const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  username: {
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
  profile: {
    type: String,
    default:
      "https://imagekit.io/dashboard/media-library/detail/698b72f85c7cd75eb8a96dcf",
  },
});


const userModel = mongoose.model("users", authSchema);

module.exports = userModel;