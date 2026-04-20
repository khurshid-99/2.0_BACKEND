import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import CreateProduct from "../features/products/pages/CrateProduct";
import Dashbord from "../features/products/pages/Dashbord";
import Protected from "../features/auth/components/Protected";
import Home from "../features/products/pages/Home";
import ProductDetils from "../features/products/pages/ProductDetils";
import SellerProductDetils from "../features/products/pages/SellerProductDetils";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    path: "/product/detils/:id",
    element: <ProductDetils />,
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
            <Dashbord />
          </Protected>
        ),
      },
      {
        path: "/seller/product/:productId",
        element: (
          <Protected role="seller">
            <SellerProductDetils />
          </Protected>
        ),
      },
    ],
  },
]);
