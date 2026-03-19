import React from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { router } from "./AppRoutes";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useEffect } from "react";

const App = () => {
  const { handleGetMe } = useAuth();

  useEffect(() => {
    handleGetMe();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
