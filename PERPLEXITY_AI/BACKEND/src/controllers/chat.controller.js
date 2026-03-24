import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { generatRespons, generatTitle } from "../services/ai.service.js";

export async function sendMessage(req, res) {
  const { message, chat: chatId } = req.body;
  const user = req.user;

  // console.log(message, user.id);

  let chatTitle = null;
  let chat = null;

  if (!chatId) {
    chatTitle = await generatTitle(message);

    chat = await chatModel.create({
      user: user.id,
      title: chatTitle,
    });
  }

  const userMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: message,
    role: "user",
  });

  const messages = await messageModel.find({ chat: chatId });

  console.log(messages);

  const chatResopns = await generatRespons(messages);

  const aiMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: chatResopns,
    role: "ai",
  });

  res.status(201).json({
    aiTitle: chatTitle,
    aiMessage: chatResopns,
    chat,
    aiMessage,
    userMessage,
  });
}

export async function getChats(req, res) {
  const user = req.user;

  const chats = await chatModel.find({ user: user.id });

  return res.status(200).json({
    message: "Chats retrieved successfully",
    chats,
  });
}

export async function getMessages(req, res) {
  const { chatId } = req.params;
  const { id } = req.user;

  const chat = await chatModel.findOne({
    user: id,
    _id: chatId,
  });

  if (!chat) {
    return res.status(404).json({
      message: "Chat not found.",
    });
  }

  const messages = await messageModel.find({
    chat: chatId,
  });

  return res.status(200).json({
    message: "Messages retrieved successfully.",
    messages,
  });
}
