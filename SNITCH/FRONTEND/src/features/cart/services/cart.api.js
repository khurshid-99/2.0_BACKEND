import axios from "axios";

const cartApi = axios.create({
  baseURL: "/api/cart",
  withCredentials: true,
});

export async function addToCart({ productId, variantId }) {
  const respons = await cartApi.post(`/add/${productId}/${variantId}`, {
    quantity: 1,
  });

  return respons.data;
}
export async function getProductItems() {
  const respons = await cartApi.post(`/`);

  return respons.data;
}
