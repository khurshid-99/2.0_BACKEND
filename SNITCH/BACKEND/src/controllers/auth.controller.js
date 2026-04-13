import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../configs/config.js";

async function sendTokenRespons(user, res, message) {
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", token);

  return res.status(201).json({
    message,
    success: true,
    user: {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      contact: user.contact,
    },
  });
}

export async function registerController(req, res) {
  const { email, contact, password, fullname, role } = req.body;

  try {
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { contact }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exist.",
      });
    }

    const User = await UserModel.create({
      email,
      contact,
      password,
      fullname,
      role,
    });

    sendTokenRespons(User, res, "User Register Successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}
