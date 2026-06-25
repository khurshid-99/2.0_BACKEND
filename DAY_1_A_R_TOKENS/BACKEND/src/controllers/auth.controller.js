const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  generateAccessTokne,
  generateRefreshTokne,
} = require("../utils/generatTokens");
const {
  registerService,
  loginService,
  getAccessTokenService,
} = require("../services/auth.service");

async function registerController(req, res) {
  const { accessToken, refreshToken, newUser } = await registerService(
    req.body,
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
  const { accessToken, refreshToken, User } = await loginService(req.body, res);

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

  return res.status(200).json({
    message: "User loggedin successfully",
    user: User,
  });
}

async function getAccessTokenController(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Unauthorized request",
      });
    }

    console.log(refreshToken);
    const accessToken = await getAccessTokenService(refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 10 * 60 * 1000,
    });

    return res.status(200).json({
      message: "AccessTocken generated",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error!",
      error,
    });
  }
}

module.exports = {
  registerController,
  loginController,
  getAccessTokenController,
};
