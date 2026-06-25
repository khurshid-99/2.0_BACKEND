import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    lodaing: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.lodaing = false;
    },
    removeUser: (state, action)=>{
      state.user = null;
      state.lodaing = false
    }
  },
});

export const { setUser , removeUser } = authSlice.actions;
