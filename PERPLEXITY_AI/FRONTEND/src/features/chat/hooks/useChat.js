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
      console.log(chatId);
      const { chat, aiMessage } = data;
      console.log(data);
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
          content: aiMessage.content,
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
          chats.reduce((acc, chat) => {
            acc[chat._id] = {
              id: chat._id,
              title: chat.title,
              messages: [],
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

  async function handleGetMessages(chatId, chats) {
    // console.log(chats[chatId]?.messages.length);
    try {
      dispatch(setLoading(true));
      if (chats[chatId]?.messages.length === 0) {
        const data = await getMessages(chatId);

        const { messages } = data;
        // console.log(messages);

        const formattedMessages = messages.map((msg) => ({
          content: msg.content,
          role: msg.role,
        }));

        dispatch(
          addMessage({
            chatId,
            messages: formattedMessages,
          }),
        );
      }

      dispatch(setCurrentChatId(chatId));
    } catch (error) {
      dispatch(error);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    initializeSocketConnection,
    handleSendMessage,
    handleGetChat,
    handleGetMessages,
  };
}
