const mongoose = require("mongoose");
const { eventNames } = require("../app");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: [true, "User already exists with this email address"],
  },
  password: String,
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
