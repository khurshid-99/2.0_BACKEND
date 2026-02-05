const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");


const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isEmail = await userModel.findOne(email);

  if (isEmail) {
    return res.status(409).json({
      message: "User is already exists with this email",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password,
  });

  const jwtToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_toke", jwtToken);

  res.status(201).json({
    message: "user registered ",
    user,
    jwtToken,
  });
});

module.exports = authRouter;
