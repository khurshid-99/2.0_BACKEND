import { useDispatch } from "react-redux";
import { addToCart, getProductItems } from "../services/cart.api";
import { setCart } from "../states/cart.slice";

export function useCart() {
  const dispatch = useDispatch();

  async function handleAddItem({ productId, variantId }) {
    const data = await addToCart({ productId, variantId });
    return data;
  }

  async function handleGetItems() {
    const data = await getProductItems();

    dispatch(setCart(data.cartItems));
    return data;
  }

  return {handleAddItem, handleGetItems}
}
