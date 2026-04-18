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

  // console.log(user);

  return res.status(201).json({
    message,
    success: true,
    user: {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      contact: user.contact,
      role: user.role,
    },
  });
}

export async function registerController(req, res) {
  const { email, contact, password, fullname, isSeller } = req.body;

  console.log(email, contact, password, fullname, isSeller);

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
      role: isSeller ? "seller" : "buyer",
    });

    sendTokenRespons(User, res, "User Register Successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

export async function loginController(req, res) {
  const { email, contact, password } = req.body;

  // console.log(email, password)
  try {
    const user = await UserModel.findOne({
      $or: [{ email }],
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials email or password",
      });
    }

    // console.log(user);

    sendTokenRespons(user, res, "User logged in successfully.");
  } catch (error) {
    console.log(error + "login controller!");
    return res.status(500).json({
      message: "Server error. Login controller",
    });
  }
}

export async function googleCallback(req, res) {
  // console.log(req.user);

  const { id, displayName, emails, photos } = req.user;
  const email = emails[0].value;
  const profilePhoto = photos[0].value;

  try {
    let user = await UserModel.findOne({ email });

    if (!user) {
      user = await UserModel.create({
        email: email,
        fullname: displayName,
        googleId: id,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("token", token);

    res.redirect(
      config.NODE_ENV === "development" ? "http://localhost:5173/" : "/",
    );
  } catch (error) {
    console.log(`Server error googleCallback : ${error}`);
  }
}

export async function getMeController(req, res) {
  const { _id } = req.user;

  const user = await UserModel.findById(_id);

  if (!user) {
    return res.status(404).json({
      message: "Unauthorized access",
    });
  }

  sendTokenRespons(user, res, "User logged in successfully");
}
