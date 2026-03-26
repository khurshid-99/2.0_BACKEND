import { initializeSocketConnection } from "../services/chat.socket";
import {
  setChats,
  setError,
  setLoading,
  createNewChat,
  addNewMessage,
  addMessage,
  setCurrentChatId,
} from "../chat.slice";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
} from "../services/chat.api";
import { useDispatch } from "react-redux";

export function useChat() {
  const dispatch = useDispatch();

  async function handleSendMessage({ message, chatId }) {
    try {
      dispatch(setLoading(true));

      const data = await sendMessage({ message, chatId });
      const { chat, aiMessage } = data;
      if (!chatId) {
        dispatch(
          createNewChat({
            chatId: chat._id,
            title: chat.title,
          }),
        );
      }

      dispatch(
        addNewMessage({
          chatId: chatId || chat._id,
          content: message,
          role: "user",
        }),
      );

      dispatch(
        addNewMessage({
          chatId: chatId || chat._id,
          content: message,
          role: aiMessage.role,
        }),
      );

      dispatch(setCurrentChatId(chat._id));
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetChat() {
    try {
      dispatch(setLoading(true));
      const data = await getChats();
      const { chats } = data;
      dispatch(
        setChats(
          chats.reducer((acc, chat) => {
            acc[chat._id] = {
              id: chat._id,
              title: chat.title,
              message: [],
              updatedAt: chat.updatedAt,
            };
            return acc;
          }, {}),
        ),
      );
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    initializeSocketConnection,
  };
}
