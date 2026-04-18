import { RouterProvider } from "react-router";
import "./App.css";
import { routes } from "../routes/Routes";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useAuth } from "../features/auth/hooks/auth.hook";
import { Navigate } from "react-router";

function App() {
  const { handleGetMe } = useAuth();

  const user = useSelector((state) => state.auth.user);
  console.log(user)

  useEffect(() => {
    handleGetMe();
  }, []);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
