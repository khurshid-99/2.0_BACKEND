import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export async function sendMessage({ message, chatId }) {
  const respons = await api.post("/chats/message", {
    message,
    chat: chatId,
  });

  return respons.data;
}

export async function getChats() {
  const respons = await api.get("/chats");
  return respons.data;
}

export async function getMessages(chatId) {
  const respons = await api.get(`/chats/${chatId}/messages`);

  return respons.data;
}

export async function deleteChat({ chatId }) {
  const respons = await api.delete(`/chats/delete/${chatId}`);

  return respons.data;
}
