import { Link, useNavigate } from "react-router";
import "./login.scss";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigat = useNavigate()

  const { loding, login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respons = await login(username, password);
      console.log(respons);
      // console.log(navigat)
      navigat("/")
    } catch (error) {
      console.log(error);
    }
  };

  if (loding) {
    return (
      <main>
        <h1>Loding...</h1>
      </main>
    );
  }

  return (
    <main className="login_page">
      <div className="from_container">
        <h1>Login</h1>
        <form action="" onSubmit={handleSubmit}>
          <input
            value={username}
            onInput={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter your username"
          />
          <input
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="Enter password"
          />
          <button type="submit">Login</button>
        </form>
        <p>
          You cannot have account{" "}
          <Link to={"/register"} className="toggole_link">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
