import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../features/auth/auth.slice";

export const store = configureStore({
  reducer: {
    auth: authReducers,
  },
});
