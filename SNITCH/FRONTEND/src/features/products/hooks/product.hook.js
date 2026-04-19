import { useDispatch } from "react-redux";
import {
  createProduct,
  getAllProducts,
  getProductDetils,
  getSellerProducts,
} from "../services/products.api";
import {
  setSellerProducts,
  setError,
  setLoading,
  setProducts,
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

  async function handleGetAllProducts() {
    try {
      dispatch(setLoading(true));
      const data = await getAllProducts();
      // console.log(data.products)
      dispatch(setProducts(data.products));
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetProductDetilsById({productId}) {
    // console.log(productId)
    try {
      const data = await getProductDetils({productId});

      return data.product;
    } catch (error) {
      return error;
    }
  }

  return {
    handleCreateProduct,
    handleGetSellerProducts,
    handleGetAllProducts,
    handleGetProductDetilsById,
  };
}
