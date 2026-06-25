import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const Public = () => {
  const { user, loading } = useSelector((store) => store.user);

  if (loading) return <h1>Loading...</h1>
  if (user) return <Navigate to={"/home"} />;

  return <Outlet />;
};

export default Public;
