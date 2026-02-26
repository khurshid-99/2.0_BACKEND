import { useState } from "react";
import { createContext } from "react";
import { login, register, getMe } from "./services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loding, setLoding] = useState(false);

  const handleLogin = async (username, password) => {
    setLoding(true);
    try {
      const respons = await login(username, password);
      setUser(respons.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setLoding(true);
    try {
      const response = await register(username, email, password);
      setUser(response.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  };

  const handleGetMe = async () => {
    setLoding(true);
    try {
      const respons = await getMe();
      console.log(respons.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loding, handleLogin, handleRegister, handleGetMe }}
    >
      {children}
    </AuthContext.Provider>
  );
}
