import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Feed from "../features/posts/pages/Feed";
import CreatePost from "../features/posts/pages/CreatePost";
import UserDetails from "../features/user/pages/UserDetails";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
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
    path: "/user_details",
    element: <UserDetails />,
  },
]);
