const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(403).json({
      message: "All filed are required!",
    });
  }

  const isExistedUser = await UserModel.findOne(email);

  if (isExistedUser) {
    res.status(409).json({
      message: "Unauthorize access User already existed",
    });
  }

  const hasPassword = await bcrypt.hash(password, 10);
  const newUser = await UserModel.create({
    name,
    email,
    password: hasPassword,
  });

  const accessToken = jwt.sign(
    { id: newUser._id },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" },
  );

  const refreshToken = jwt.sign(
    { id: newUser._id },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 10 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    message: "User register successfully",
    user: newUser,
    accessToken,
    refreshToken,
  });
}

async function loginController(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All filed are required!",
    });
  }

  const User = await UserModel.findOne({ email });

  if (!User) {
    res.status(404).json({
      message: "User not found ",
    });
  }

  const isPassword = await bcrypt.compare(User.password, password);

  if (!isPassword) {
    return res.status(401).json({
      message: "Invalide credentials",
    });
  }


}
