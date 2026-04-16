import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    sellerProducts: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSellerProducts: (state, action) => {
      state.setSellerProducts = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSellerProducts, setError, setLoading } = productSlice.actions;

export default productSlice.reducer;
