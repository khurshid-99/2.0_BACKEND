const userModel = require("../models/auth.modle");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registreController(req, res) {
  const { username, email, password, bio, profile } = req.body;

  const isUserExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
    return res.status(401).json({
      message: ` "User alrady exist whith this ${username ? ` UserName ${username} ` : `Email ${email}`} :  `,
    });
  }

  const hasPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hasPassword,
    bio,
    profile,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("tokne", token);

  return res.status(201).json({
    message: "User register successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profile: user.profile,
    },
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized user not found ",
    });
  }

  const passwordVerify = await bcrypt.compare(password, user.password);

  if (!passwordVerify) {
    return res.status(401).json({
      message: "Unauthorized Invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "User Logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profile: user.profile,
    },
  });
}

module.exports = { registreController, loginController };
