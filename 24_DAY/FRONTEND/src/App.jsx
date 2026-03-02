import { RouterProvider } from "react-router";
import { AuthProvider } from "./features/auth/Auth.Context";
import { routes } from "./routes/AppRoutes";
import "./app.scss";
import { PostContextProvider } from "./features/posts/Post.Context";
import { UserContextProvider } from "./features/user/User.context";

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <UserContextProvider>
          <RouterProvider router={routes} />
        </UserContextProvider>
      </PostContextProvider>
    </AuthProvider>
  );
};

export default App;
