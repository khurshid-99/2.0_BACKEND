import UserModel from "../models/user.model.js";
import config from "../configs/config.js";
import jwt from "jsonwebtoken";

export async function authenticateSeller(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Authentication required, Token required",
    });
  }

  try {
    const decoded = await jwt.verify(token, config.JWT_SECRET);

    const User = await UserModel.findById(decoded.id);

    if (!User) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (User.role !== "seller") {
      return res.status(403).json({
        message: "Access denied. Seller only.",
      });
    }

    req.user = User;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}
