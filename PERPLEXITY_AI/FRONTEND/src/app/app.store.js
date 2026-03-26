import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../features/auth/auth.slice";
import chatReducers from "../features/chat/chat.slice";

export const store = configureStore({
  reducer: {
    auth: authReducers,
    chat: chatReducers,
  },
});
