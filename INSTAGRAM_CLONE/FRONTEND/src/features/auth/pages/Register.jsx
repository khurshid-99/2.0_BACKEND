import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import "../styles/form.scss";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const respons = await axios.post(
        `http://localhost:3000/api/auth/register`,
        {
          username,
          email,
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
        <h1>Register</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            value={username}
            onInput={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter your username"
          />
          <input
            value={email}
            onInput={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter your email"
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
          You have account to{" "}
          <Link to={"/login"} className="toggle_auth_form">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
