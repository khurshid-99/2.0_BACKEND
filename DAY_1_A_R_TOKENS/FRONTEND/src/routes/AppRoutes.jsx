import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Protected from "./protected/Protected";
import Public from "./protected/Public";
import { axiosInstance } from "../configs/AxiosInstance";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../state/auth.reducer";

const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        console.log(res);
        dispatch(setUser(res.data.user));
      } catch (error) {
        dispatch(removeUser());
        console.log(`error in me api ${error}`);
      }
    })();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Public />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Login />,
            },
            {
              path: "/register",
              element: <Register />,
            },
          ],
        },
      ],
    },
    {
      path: "/home",
      element: <Protected />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              path: "",
              element: <Home />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
