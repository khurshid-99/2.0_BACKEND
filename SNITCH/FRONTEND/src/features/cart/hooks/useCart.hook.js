import { useDispatch } from "react-redux";
import {
  addToCart,
  createOrder,
  getCart,
  updateCartItem,
  verifyCartOrder,
} from "../services/cart.api";
import { incrementCartItem, setCart } from "../states/cart.slice";

export function useCart() {
  const dispatch = useDispatch();

  async function handleAddItem({ productId, variantId }) {
    const data = await addToCart({ productId, variantId });
    return data;
  }

  async function handleGetCart() {
    const data = await getCart();
    // console.log(data.cart);
    dispatch(setCart(data.cart));
    // return data;
  }

  async function handleIncrementCartItem({ productId, variantId }) {
    const data = await updateCartItem({ productId, variantId });
    dispatch(incrementCartItem({ productId, variantId }));
  }

  async function handleCreateOrder() {
    const data = await createOrder();
    // console.log(data);
    return data.order;
  }

  async function handleVerifyCartOrder({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  }) {
    const data = await verifyCartOrder({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    console.log(data)
    return data.success;
  }

  return {
    handleAddItem,
    handleGetCart,
    handleIncrementCartItem,
    handleCreateOrder,
    handleVerifyCartOrder,
  };
}
