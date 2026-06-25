const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const {
  generateAccessTokne,
  generateRefreshTokne,
} = require("../utils/generatTokens");

const jwt = require("jsonwebtoken");

async function registerService(data) {
  try {
    const { name, email, password } = data;

    if (!name || !email || !password) throw new Error("all filed are required");

    const isExistedUser = await UserModel.findOne({ email });

    if (isExistedUser) {
      throw new Error("Unauthorize access User already existed");
    }

    const hasPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      name,
      email,
      password: hasPassword,
    });

    const accessToken = generateAccessTokne(newUser._id);
    const refreshToken = generateRefreshTokne(newUser._id);

    newUser.refreshtoken = refreshToken;
    newUser.save();

    return {
      accessToken,
      refreshToken,
      newUser,
    };
  } catch (error) {
    throw new Error(error);
  }
}

async function loginService(data, res) {
  try {
    const { email, password } = data;

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

    const hasPassword = await bcrypt.compare(password, User.password);

    if (!hasPassword) {
      return res.status(401).json({
        message: "Invalide credentials",
      });
    }

    const accessToken = generateAccessTokne(User._id);
    const refreshToken = generateRefreshTokne(User._id);

    User.refreshtoken = refreshToken;
    await User.save();

    return {
      accessToken,
      refreshToken,
      User,
    };
  } catch (error) {
    throw new Error(error);
  }
}
async function getAccessTokenService(refreshToken) {
  try {
    const decode = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET,
    );

    if (!decode) {
      throw new Error("Unauthorized");
    }

    const User = await UserModel.findById(decode.id);

    if (!User) {
      throw new Error("User not found");
    }

    if (refreshToken !== User.refreshtoken) {
      throw new Error("Refresh token mismatch");
    }

    const accessToken = generateAccessTokne(User._id);
    return accessToken;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  registerService,
  loginService,
  getAccessTokenService,
};

// async function getAccessTokenService(refreshToken) {
//   const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
//   console.log(refreshTokenrs);
//   if (!decode) throw new Error("Unauthorized");
//   const User = await UserModel.findById(decode.id);
//   console.log(User);
//   if (refreshToken !== User.refreshtoken) {
//     throw new Error("Unauthorized");
//   }
//   const accessToken = generateAccessTokne(User._id);
//   return accessToken;
// }
