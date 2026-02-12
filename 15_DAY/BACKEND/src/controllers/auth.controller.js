const userModel = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function authRegister(req, res) {
  try {
    const { name, email, password, bio, profileImage } = req.body;
    const isUser = await userModel.findOne({
      $or: [{ name }, { email }],
    });

    if (isUser) {
      return res.status(401).json({
        message: `User alredy have with this ${isUser.email ? email : name} `,
      });
    }

    const hasPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hasPassword,
      bio,
      profileImage,
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
        name: user.name,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log(`AuthRegister error ${error} `);

    res.status(401).json({
      message: "Unauthorize Register ",
      error: error,
    });
  }
}

async function authLogin(req, res) {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({
      $or: [{ email }, { name }],
    });

    if (!user) {
      return res.status(401).json({
        message: `User not found with this ${email ? email : name} `,
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(401).json({
        message: "Invalide password",
      });
    }

    const token = await jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);

    return res.status(200).json({
      message: "User Logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log(`Auth Login error ${error} `);

    return res.status(401).json({
      message: "Unauthorized Login",
      error: error,
    });
  }
}

module.exports = { authRegister, authLogin };
