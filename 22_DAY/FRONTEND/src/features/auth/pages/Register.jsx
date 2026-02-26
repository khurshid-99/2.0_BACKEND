import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Register = () => {
  const context = useAuth();
  const { user, loding, handleRegister } = context;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await handleRegister(username, email, password);
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  if (loding) {
    return (
      <main>
        <h1>Loding...</h1>
      </main>
    );
  }

  return (
    <main className="w-full h-screen bg-[#06070a] text-[white] flex items-center justify-center ">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl ">Register</h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 "
        >
          <input
            value={username}
            onInput={(e) => setUsername(e.target.value)}
            type="text"
            name=""
            id=""
            placeholder="Enter your username"
            className="bg-white text-black placeholder:text-gray-700 px-2 py-1 rounded-[8px] outline-none border-none text-2xl "
          />
          <input
            value={email}
            onInput={(e) => setEmail(e.target.value)}
            type="email"
            name=""
            id=""
            placeholder="Enter your email"
            className="bg-white text-black placeholder:text-gray-700 px-2 py-1 rounded-[8px] outline-none border-none text-2xl "
          />
          <input
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            type="text"
            name=""
            id=""
            placeholder="Enter your password"
            className="bg-white text-black placeholder:text-gray-700 px-2 py-1 rounded-[8px] outline-none border-none text-2xl "
          />

          <button
            type="submit"
            className="bg-[#fc350b] rounded-[5px] py-1 text-2xl active:scale-[.99] "
          >
            Register
          </button>
        </form>
        <p>
          Have you account{" "}
          <Link
            to={"/login"}
            className=" text-[#fc350b] font-semibold text-xl "
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
