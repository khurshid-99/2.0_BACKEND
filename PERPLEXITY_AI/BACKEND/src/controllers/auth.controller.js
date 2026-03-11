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

  await sendEmail({
    to: email,
    subject: "Welcome to Perplexity AI",
    // text: `Hi ${username},\n\nThank you for registering at Perplexity AI! We're excited to have you on board.\n\nBest regards,\nThe Perplexity AI Team`, // THIS IS OPTIONAL
    html: `
        <p>Hi ${username},</p>
        <p>
            Thank you for registering at Perplexity AI! We're excited to have you on board.
        </p>
        <p>Best regards,<br>The Perplexity AI Team</p>
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
