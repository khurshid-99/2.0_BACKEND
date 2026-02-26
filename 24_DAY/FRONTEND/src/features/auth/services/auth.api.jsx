import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const handleLogin = async (username, password) => {
  const respons = await api.post("/login", {
    username,
    password,
  });

  return respons.user;
};

export const handleRegister = async (username, email, password) => {
  const respons = await api.post("/register", {
    username,
    email,
    password,
  });
  return respons.user;
};

export const handleGetMe = async () => {
  const respons = await api.get("/get_me");
  return respons.user;
};
