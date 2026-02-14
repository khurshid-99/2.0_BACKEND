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

  console.log(username, email);

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(401).json({
      message: `User not found whith this ${email ? email : username}`,
    });
  }

  const isPassword = await bcrypt.compare(password, user.password);

  if (!isPassword) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profile: user.profile,
    },
  });
}

module.exports = { authRegister, authLogin };
