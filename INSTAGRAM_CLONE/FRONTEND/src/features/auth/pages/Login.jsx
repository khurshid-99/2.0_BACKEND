import axios from "axios";
import { useState } from "react";
import "../styles/form.scss";
import { Link } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const respons = await axios.post(
        `http://localhost:3000/api/auth/login`,
        {
          username,
          password,
        },
        { withCredentials: true },
      );

      console.log(respons);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <div className="form_container">
        <h1>Login</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
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
            placeholder="Enter your password"
          />
          <button type="submit">Register</button>
        </form>
        <p>
          You don't have account to{" "}
          <Link to={"/register"} className="toggle_auth_form">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
