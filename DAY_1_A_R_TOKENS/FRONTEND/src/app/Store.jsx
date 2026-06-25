import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../state/auth.reducer";

export const store = configureStore({
  reducer: {
    user: authSlice.reducer,
  },
});
