import React from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/users").then((resposn) => {
      setUsers(resposn.data.user);
    });
  }, []);

  // console.log(users);

  return (
    <div>
      <h1>Users</h1>
      <div>{users && users.map((user) => <ul key={user.id}>{user.name}</ul>)}</div>
      <h1>HI</h1>
    </div>
  );
};

export default App;
