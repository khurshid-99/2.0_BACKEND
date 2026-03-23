import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "Username or email already exists",
      success: false,
      err: "User already exists",
    });
  }

  const newUser = await userModel.create({
    username,
    email,
    password,
  });

  const emailVerificationToken = jwt.sign(
    { email: newUser.email, id: newUser._id },
    process.env.JWT_SECRET,
  );

  await sendEmail({
    to: email,
    subject: "Welcome to Perplexity AI",
    // text: `Hi ${username},\n\nThank you for registering at Perplexity AI! We're excited to have you on board.\n\nBest regards,\nThe Perplexity AI Team`, // THIS IS OPTIONAL
    html: `
           <p>Hi ${username},</p>
           <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
           <p>Please verify your email address by clicking the link below:</p>
           <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
           <p>If you did not create an account, please ignore this email.</p>
           <p>Best regards,<br>The Perplexity Team</p>
    `,
  });

  return res.status(201).json({
    message: "User registered successfully",
    success: true,
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
  });
};

/**
 * @desc Verify user's email address
 * @route GET /api/auth/verify-email
 * @access Public
 * @query { token }
 */

export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
        err: "User not found",
      });
    }

    user.verified = true;
    await user.save();

    const html = `
        <h1>Email Verified Successfully!</h1>
        <p>Your email has been verified. You can now log in to your account.</p>
        <a href="http://localhost:5173/login">Go to Login</a>
    `;

    return res.send(html);
  } catch (error) {
    return res.status(400).json({
      message: "Invalid or expired token",
      success: false,
      err: "Invalid or expired token",
    });
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
      success: false,
      err: "User not found",
    });
  }

  if (!user.verified) {
    return res.status(400).json({
      message: "Please verify your email address before logging in",
      success: false,
      err: "Email not verified",
    });
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid credentials",
      success: false,
      err: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "Login successful",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

export const getMe = async (req, res) => {
  const userId = req.user.id;

  const user = await userModel.findById(userId).select("-password");

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false,
      err: "User not found",
    });
  }

  return res.status(200).json({
    message: "User retrieved successfully",
    success: true,
    user,
  });
};
