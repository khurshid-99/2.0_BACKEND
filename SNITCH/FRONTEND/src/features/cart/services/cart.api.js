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
  // console.log(respons);
  return respons.data;
}

export async function updateCartItem({ productId, variantId }) {
  const respons = await cartApi.patch(
    `/quantity/increment/${productId}/${variantId}`,
  );

  console.log(respons.data);
  return respons.data;
}

export async function createOrder() {
  const respons = await cartApi.post("/paymen/create/order");
  console.log(respons.data);
  return respons.data;
}

export async function verifyCartOrder({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) {
  const respons =await cartApi.post("/payment/verify/order", {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  return respons.data;
}
