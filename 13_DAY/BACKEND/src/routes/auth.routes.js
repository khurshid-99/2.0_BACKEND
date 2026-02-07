const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const authRoute = express.Router();

// POST - create user in database
authRoute.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAllreadyExied = userModel.findOne({ email });

  if (!isUserAllreadyExied) {
    return res.status(409).json({
      message: "User allready exied with this email address",
    });
  }

  const hasPassword = await crypto
    .createHash("md5")
    .update(password)
    .digest("hex");

  const user = await userModel.create({
    name,
    email,
    password: hasPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User register successfully",
    user,
    token,
  });
});

authRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "This email is Invalide",
    });
  }

  const isPassword = crypto.createHash("md5").update(password).digest("hex");

  if (isPassword !== user.password) {
    return res.status(400).json({
      message: "Enter valide Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: email,
    },
    process.env.JWT_SECRET,
  );

  res.status(200).json({
    message: "User loggnd successfully",
    token,
    user,
  });
});

module.exports = authRoute;
