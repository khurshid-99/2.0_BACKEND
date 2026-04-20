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

export async function addProductVariant(productId, variantToSave) {
  console.log(variantToSave);
  const formData = new FormData();

  variantToSave.images.forEach((image) => {
    formData.append("images", image.file);
  });

  formData.append("stock", variantToSave.stock);
  formData.append("price", variantToSave.price);
  formData.append("attributes", JSON.stringify(variantToSave.attributes));

  console.log(formData)
  const respons = await productApi.post(`/${productId}/variants`, formData);
  return respons.data;
}
