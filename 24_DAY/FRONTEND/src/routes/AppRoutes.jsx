import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Feed from "../features/posts/pages/Feed";
import CreatePost from "../features/posts/pages/CreatePost";

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/feed",
    element: <Feed />,
  },
  {
    path: "/post_create",
    element: <CreatePost />,
  },
  {
    path: "/",
    element: <h1>Home...</h1>,
  },
]);
