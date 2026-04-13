import { register } from "../services/auth.api";
import { setUser, setErrors, setLoading } from "../states/auth.slice";
import { useDispatch } from "react-redux";
export function useAuth() {
  const dispatch = useDispatch();
  async function handleRegister({ email, contact, fullname, password, isSeller }) {
    try {
      dispatch(setLoading(true));
      const data = await register({ email, contact, fullname, password, isSeller });
      dispatch(setUser(data));
    } catch (error) {
      dispatch(setErrors(error));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return { handleRegister };
}
