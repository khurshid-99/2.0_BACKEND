import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    errors: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export const { setUser, setLoading, setErrors } = authSlice.actions;

export default authSlice.reducer;
