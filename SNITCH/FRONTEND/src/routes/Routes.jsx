import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import CreateProduct from "../features/products/pages/CrateProduct";
import Dashbord from "../features/products/pages/Dashbord";
import Protected from "../features/auth/components/Protected";

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
    path: "/seller",
    children: [
      {
        path: "/seller/create-product",
        element: (
          <Protected role="seller">
            <CreateProduct />
          </Protected>
        ),
      },
      {
        path: "/seller/products",
        element: (
          <Protected role="seller">
            <Dashbord />,
          </Protected>
        ),
      },
    ],
  },
]);
