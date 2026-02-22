import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function login(username, password) {
  const respons = await api.post(`/login`, {
    username,
    password,
  });

  return respons;
}

export async function register(username, email, password) {
  const respons = await api.post(`/register`, {
    username,
    email,
    password,
  });

  return respons;
}

export async function getMe() {
  const respons = await api.get("/get_me");

  return respons.data;
}
