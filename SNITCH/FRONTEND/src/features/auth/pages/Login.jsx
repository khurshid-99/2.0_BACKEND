import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/auth.hook";
import { useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const { loading, errors, user } = useSelector((state) => state.auth);

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

    await handleLogin({
      email: formData.email,
      password: formData.password,
    });
  };
  if (loading) {
    return (
      <main className="w-full h-screen flex items-center justify-center ">
        <h1 className="text-[2rem] text-[red]  ">Loading...</h1>
      </main>
    );
  }

  if (!loading && user) {
    return navigate("/");
  }

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
      </div>
    </div>
  );
};

export default Login;
