const userModel = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { username, email, password, bio, profile } = req.body;

  const isUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUser) {
    return res.status(401).json({
      message: `Unauthorized user already exists with this ${username ? `username ${username}` : `email ${email}`}`,
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
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "User register successfully.",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profile: user.profile,
    },
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  const isUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!isUser) {
    return res.status(401).json({
      message: "Unauthorized user not found.",
    });
  }

  const hasPassword = await bcrypt.compare(password, user.password);

  if (!hasPassword) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const token = await jwt.sign(
    {
      id: isUser._id,
      username: isUser.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);
  return res.status(200).json({
    message: "User logged in successfully.",
    user: {
      id: isUser._id,
      username: isUser.username,
      email: isUser.email,
      bio: isUser.email,
      profile: isUser.profile,
    },
  });
}

module.exports = { registerController, loginController };
