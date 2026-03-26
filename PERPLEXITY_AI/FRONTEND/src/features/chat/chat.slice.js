import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: {},
    currentChatId: null,
    error: null,
    loading: false,
  },
  reducers: {
    createNewChat: (state, action) => {
      const { title, chatId } = action.payload;
      state.chats[(title, chatId)] = {
        id: chatId,
        title,
        message: [],
        lastUpdate: new Date().toISOString(),
      };
    },
    addNewMessage: (state, action) => {
      const { chatId, content, role } = action.payload;
      state.chats[chatId].message.push({ content, role });
    },
    addMessage: (state, action) => {
      const { chatId, content, role } = action.payload;
      state.chats[chatId].message.push({ content, role });
    },

    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setChats,
  setCurrentChatId,
  setError,
  setLoading,
  createNewChat,
  addNewMessage,
  addMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
