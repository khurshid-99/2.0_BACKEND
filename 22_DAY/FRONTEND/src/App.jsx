import { RouterProvider } from "react-router";
import AppRoutes from "./routes/App.routes";
import { AuthProvider } from "./features/auth/auth.context";


const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={AppRoutes} />
    </AuthProvider>
  );
};

export default App;
