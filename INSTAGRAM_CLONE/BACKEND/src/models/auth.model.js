const mongoose = require("mongoose");

const auhtSchema = new mongoose.Schema({
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
      "https://ik.imagekit.io/1ahncttke/651c6da502353948bdc929f02da2b8e0.jpg?updatedAt=1770746616862",
  },
});

const userModel = mongoose.model("users", auhtSchema);

module.exports = userModel;
