import React from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { router } from "./AppRoutes";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
