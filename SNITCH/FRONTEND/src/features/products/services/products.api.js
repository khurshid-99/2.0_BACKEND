import axios from "axios";

const productApi = axios.create({
  baseURL: "/api/products",
  withCredentials: true,
});

export async function createProduct(formdata) {
  const respons = await productApi.post("/", formdata);
  return respons.data;
}
export async function getSellerProducts() {
  const respons = await productApi.get("/seller-products");
  // console.log(respons)
  return respons.data;
}

export async function getAllProducts() {
  const respons = await productApi.get("/");

  return respons.data;
}

export async function getProductDetils({ productId }) {
  // console.log(productId);
  const respons = await productApi.get(`/detils/${productId}`);

  return respons.data;
}
