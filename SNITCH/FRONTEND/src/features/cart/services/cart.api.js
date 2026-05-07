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
export async function getCart() {
  const respons = await cartApi.get(`/`);
  // console.log(respons)
  return respons.data;
}

export async function updateCartItem({ productId, variantId }) {
  const data = await cartApi.patch(
    `/quantity/increment/${productId}/${variantId}`,
  );

  return data;
}
