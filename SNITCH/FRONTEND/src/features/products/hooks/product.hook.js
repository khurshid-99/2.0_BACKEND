import { useDispatch } from "react-redux";
import { createProduct } from "../services/products.api";
import {
  setSellerProducts,
  setError,
  setLoading,
} from "../states/product.slice";

export function useProduct() {
  const dispatch = useDispatch();

  async function handleCreateProduct(formdata) {
    try {
      dispatch(setLoading(true));
      const data = await createProduct(formdata);
      dispatch(data);
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return { handleCreateProduct };
}
