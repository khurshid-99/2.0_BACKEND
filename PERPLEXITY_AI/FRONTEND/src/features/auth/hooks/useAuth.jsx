import { useDispatch } from "react-redux";
import { setUser, setLoading, setError } from "../auth.slice";
import { register, login, getMe } from "../service/auth.api";

export const useAuth = () => {
  
  const dispatch = useDispatch();

  async function handleRegister({ username, email, password }) {
    try {
      dispatch(setLoading(true));
      const data = await register({ username, email, password });
    } catch (error) {
      dispatch(setError(error.respons?.data?.message || "Registration faild"));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));
      const data = await login({ email, password });
      dispatch(setUser(data.user));
    } catch (error) {
      dispatch(setError(error.respons?.data?.message || "Loggend in faild"));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetMe() {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch (error) {
      dispatch(setError(error.respons?.message?.data));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return { handleRegister, handleLogin, handleGetMe };
};
