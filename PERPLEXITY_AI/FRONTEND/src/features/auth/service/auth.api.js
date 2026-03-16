import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export async function register({ username, email, password }) {
  const respons = await api.post("/auth/register", {
    username,
    email,
    password,
  });

  return respons.data;
}

export async function login({ email, password }) {
  const respons = await api.post("/auth/login", { email, password });
  return respons.data;
}

export async function getMe() {
  const respons = await api.get("/auth/get-me");

  return respons.data;
}
