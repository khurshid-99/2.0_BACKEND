import React, { useState } from "react";
import { useAuth } from "../hooks/auth.hook";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister } = useAuth();

  const { loading, errors, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contact: "",
    password: "",
    role: false, // checkbox (e.g. admin/user)
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    await handleRegister({
      email: formData.email,
      contact: formData.contact,
      fullname: formData.fullname,
      password: formData.password,
      isSeller: formData.role,
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
          Register Form
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-1 text-[1.2rem] "
        >
          {/* Fullname */}
          <div className="flex flex-col ">
            <label className="cursor-pointer" htmlFor="fullname">
              Full Name:
            </label>
            <input
              id="fullname"
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="bg-white text-black outline-none rounded px-2 py-1 "
            />
          </div>

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

          {/* Contact */}
          <div className="flex flex-col ">
            <label className="cursor-pointer" htmlFor="contact">
              Contact:
            </label>
            <input
              id="contact"
              type="tel"
              name="contact"
              value={formData.contact}
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

          {/* Role Checkbox */}
          <div>
            <label className="cursor-pointer" htmlFor="role">
              <input
                id="role"
                type="checkbox"
                name="role"
                checked={formData.role}
                onChange={handleChange}
              />
              Seller Role
            </label>
          </div>

          {/* Submit */}
          <button type="submit" className="bg-amber-500 rounded py-1 ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
