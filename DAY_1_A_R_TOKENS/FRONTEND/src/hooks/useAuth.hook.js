import { useForm } from "react-hook-form";
import { axiosInstance } from "../configs/AxiosInstance";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../state/auth.reducer";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onRegister = async (data) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const onLogin = async (data) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      console.log(res);
      dispatch(setUser(res.data.user));
    } catch (error) {
      console.log(error);
    }
  };

  return { register, handleSubmit, errors, onRegister, onLogin, navigate };
};
