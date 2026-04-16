import axios from "axios";

const productApi = axios.create({
  baseURL: "/api/products",
  withCredentials: true,
});

export async function createProduct(formdata) {
    const respons = await productApi.post("/", formdata);
    return respons.data
}
