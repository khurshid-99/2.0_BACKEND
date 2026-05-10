import { useDispatch } from "react-redux";
import { addToCart, getCart, updateCartItem } from "../services/cart.api";
import { incrementCartItem, setCart } from "../states/cart.slice";

export function useCart() {
  const dispatch = useDispatch();

  async function handleAddItem({ productId, variantId }) {
    const data = await addToCart({ productId, variantId });
    return data;
  }

  async function handleGetCart() {
    const data = await getCart();
    console.log(data.cart);
    dispatch(setCart(data.cart));
    // return data;
  }

  async function handleIncrementCartItem({ productId, variantId }) {
    const data = await updateCartItem({ productId, variantId });
    dispatch(incrementCartItem({ productId, variantId }));
  }

  return { handleAddItem, handleGetCart, handleIncrementCartItem };
}
