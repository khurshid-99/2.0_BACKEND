import axios from "axios";
import { useState } from "react";
import "../styles/form.scss";
import { Link } from "react-router";

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
          username: username,
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        },
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
          If you have account then go to{" "}
          <Link to={"/login"} className="toggleAuthForm">
            login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
