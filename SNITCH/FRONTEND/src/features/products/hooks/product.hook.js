import { useDispatch } from "react-redux";
import { createProduct, getSellerProducts } from "../services/products.api";
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

  async function handleGetSellerProducts() {
    try {
      dispatch(setLoading(true));
      const data = await getSellerProducts();
      // console.log(data.products)
      dispatch(setSellerProducts(data.products));
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return { handleCreateProduct, handleGetSellerProducts };
}
