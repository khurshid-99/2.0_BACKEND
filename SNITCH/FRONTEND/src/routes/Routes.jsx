import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import CreateProduct from "../features/products/pages/CrateProduct";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <h1>
        Hello <br /> This is Home page!
      </h1>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/product",
    element: <CreateProduct />,
  },
]);
