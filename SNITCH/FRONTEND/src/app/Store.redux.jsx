import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/states/auth.slice";
import productReducer from "../features/products/states/product.slice";
import cartReducer from "../features/cart/states/cart.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
  },
});
