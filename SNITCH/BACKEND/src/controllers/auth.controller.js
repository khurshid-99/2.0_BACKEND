import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../configs/config.js";

async function sendToken(user, res) {
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
  );

  return token
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

    const token = jwt.sign(
      {
        id: User._id,
      },
      config.JWT_SECRET,
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}
