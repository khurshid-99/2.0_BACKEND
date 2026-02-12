const userModel = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function authRegister(req, res) {
  const { username, email, password, bio, profile } = req.body;

  const isUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUser) {
    return res.status(401).json({
      message: `User already have with this ${username ? "username" : "email"} `,
    });
  }

  const hasPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hasPassword,
    bio,
    profile,
  });

  const token = await jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "User Register successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profile: user.profile,
    },
  });
}

async function authLogin(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  

}

module.exports = { authRegister };
