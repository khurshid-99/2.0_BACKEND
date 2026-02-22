import axios from "axios";
import { useState } from "react";
import "../styles/form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { user, loding, handleLogin } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    await handleLogin(username, password);

    navigate("/");

    // try {
    //   const respons = await axios.post(
    //     `http://localhost:3000/api/auth/login`,
    //     {
    //       username,
    //       password,
    //     },
    //     { withCredentials: true },
    //   );

    //   console.log(respons);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  if (loding) {
    return (
      <main>
        <h1>Loding...</h1>
      </main>
    );
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
          <button type="submit">Login</button>
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
