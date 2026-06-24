const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

async function authMiddleware(req, res, next) {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        message: "Unauthorized request",
      });
    }

    const decode = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);

    if (!decode) {
      return res.status(401).json({
        message: "Unauthorized requiest",
      });
    }

    const User = await UserModel.findById(decode.id);

    if (!User) {
      return res.status(401).json({
        message: "Unauthorized requiest",
      });
    }

    req.user = User;
    next();
  } catch (error) {
    return res.status(404).json({
      message: "Unauthorized",
    });
  }
}

module.exports = authMiddleware;
