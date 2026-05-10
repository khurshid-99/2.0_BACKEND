import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const Protected = ({ children, role = "buyer" }) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  // console.log(user)

  if (loading) {
    // console.log(loading)
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  if (!user) {
    console.log(user)
    return <Navigate to={"/login"} />;
  }

  if (user.role !== role) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default Protected;
