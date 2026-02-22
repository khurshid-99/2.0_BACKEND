import { useContext } from "react";
import { AuthContext } from "../Auth.context";
import { login, register, getMe } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loding, setLoding } = context;

  const handleLogin = async (username, password) => {
    setLoding(true);

    const respons = await login(username, password);

    setUser(respons.user);
    setLoding(false);
  };

  const handleRegister = async (username, email, password) => {
    setLoding(true);
    const respons = await register(username, email, password);

    setUser(respons.user);
    setLoding(false);
  };

  return { user, loding, handleLogin, handleRegister };
};
