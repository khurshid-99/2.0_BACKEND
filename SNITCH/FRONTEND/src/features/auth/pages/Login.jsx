import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/auth.hook";
import { useSelector } from "react-redux";
import ContinueWithGoogle from "../components/ContinueWithGoogle";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    console.log(name, value, type);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const loginUser = await handleLogin({
        email: formData.email,
        password: formData.password,
      });

      if (loginUser.role === "buyer") {
        return navigate("/");
      } else if (loginUser.role === "seller") {
        return navigate("/seller/products");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return (
      <main className="w-full h-screen flex items-center justify-center ">
        <h1 className="text-[2rem] text-[red]  ">Loading...</h1>
      </main>
    );
  }

  // if (!loading && user && user.role === "buyer") {
  //   return navigate("/");
  // } else if (!loading && user.role === "seller") {
  //   return navigate("/seller/products");
  // } else {
  //   console.log(error);
  // }

  return (
    <div className="w-full h-screen bg-black text-white flex items-center justify-center ">
      <div className="border p-4 rounded-xl select-none ">
        <h2 className="bg-blue-600 px-5 py-1 text-center text-[1.4rem] rounded mb-2 ">
          Login Form
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-1 text-[1.2rem] "
        >
          {/* Email */}
          <div className="flex flex-col ">
            <label className="cursor-pointer" htmlFor="email">
              Email:
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-white text-black outline-none rounded px-2 py-1 "
            />
          </div>

          {/* Password */}
          <div className="flex flex-col ">
            <label className="cursor-pointer" htmlFor="password">
              Password:
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-white text-black outline-none rounded px-2 py-1 "
            />
          </div>

          {/* Submit */}
          <button type="submit" className="bg-amber-500 rounded py-1 mt-4 ">
            Submit
          </button>
        </form>
        <ContinueWithGoogle />
      </div>
    </div>
  );
};

export default Login;
