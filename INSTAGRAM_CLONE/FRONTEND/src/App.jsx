import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./features/auth/Auth.context";
import "./style.scss";

const App = () => {
  return (
    <AuthProvider >
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
