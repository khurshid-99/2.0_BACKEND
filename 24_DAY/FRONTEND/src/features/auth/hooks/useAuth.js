import { useContext } from "react";
import { handleLogin, handleRegister, handleGetMe } from "../services/auth.api.jsx";
import { AuthContext } from "../Auth.Context.jsx";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loding, setLoding } = context;

  const login = async (username, password) => {
    setLoding(true);
    try {
      const respons = await handleLogin(username, password);
      console.log(respons);
      
      setUser(respons.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  };

  const register = async (username, email, password) => {
    setLoding(true);
    try {
      const respons = await handleRegister(username, email, password);
      return setUser(respons.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  };

  return { user, loding, login, register };
};
