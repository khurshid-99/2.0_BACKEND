const { profile } = require("console");
const userModel = require("../models/auth.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function authRegister(req, res) {
  const { username, email, password, bio, profile } = req.body;

  try {
    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isUserAlreadyExist) {
      return res.status(401).json({
        message: "User already exists",
      });
    }

    const hasPassword = await crypto
      .createHash("sha256")
      .update(password)
      .digest("base64");

    const user = await userModel.create({
      username,
      email,
      password: hasPassword,
      bio,
      profile,
    });

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token);

    return res.status(201).json({
      message: "User register successfuly",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.log(`AuthRegister Error : ${error}`);
    return res.status(401).json({
      message: "authRegister error",
    });
  }
}

async function authLogin(req, res) {
  const { username, email, password } = req.body;

  try {
    const user = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized ",
      });
    }

    const hasPassword = await crypto
      .createHash("sha256")
      .update(password)
      .digest("base64");

    if (hasPassword !== user.password) {
      return res.status(401).json({
        message: "Invalide password",
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
      message: "User logged In successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.log(`Auth Login Error : ${error} `);
  }
}

module.exports = { authRegister, authLogin };
