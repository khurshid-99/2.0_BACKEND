import { Link } from "react-router";
import "./register.scss";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loding, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respons = await register(username, email, password);
      console.log(respons);
    } catch (error) {
      console.log(error);
    }
  };

  if (loding) {
    return <main>
      <h1>Loding...</h1>
    </main>
  }

  return (
    <main className="register_page">
      <div className="from_container">
        <h1>Register</h1>
        <form action="" onSubmit={handleSubmit}>
          <input
            value={username}
            onInput={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter your username"
          />
          <input
            value={email}
            onInput={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
          />
          <input
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="Enter password"
          />
          <button type="submit">Register</button>
        </form>
        <p>
          You have account{" "}
          <Link to={"/login"} className="toggole_link">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
