import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const Protected = () => {
  const { user, loading } = useSelector((store) => store.user);

  if (loading) return <h1>Loading...</h1>;
  if (!user) return <Navigate to={"/"} />;

  return <Outlet />;
};

export default Protected;
