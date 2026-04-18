import axios from "axios";

const authApi = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

export async function register({
  email,
  contact,
  fullname,
  password,
  isSeller,
}) {
  const respons = await authApi.post("/register", {
    email,
    contact,
    fullname,
    password,
    isSeller,
  });

  return respons.data;
}

export async function login({ email, password }) {
  const respons = await authApi.post("/login", { email, password });

  return respons.data;
}

export async function getMe() {
  const respons = await authApi.get("/me");
  console.log(respons);
  return respons.data;
}
