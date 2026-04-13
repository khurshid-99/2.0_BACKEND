import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function register({ email, contact, fullname, password, isSeller }) {

  const respons = await authApi.post("/register", {
    email,
    contact,
    fullname,
    password,
    isSeller,
  });

  return respons.data;
}
