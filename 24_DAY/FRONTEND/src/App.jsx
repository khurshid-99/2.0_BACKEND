import { RouterProvider } from "react-router";
import { AuthProvider } from "./features/auth/Auth.Context";
import { routes } from "./routes/AppRoutes";
import "./app.scss";
import { PostContextProvider } from "./features/posts/Post.Context";

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={routes} />
      </PostContextProvider>
    </AuthProvider>
  );
};

export default App;
