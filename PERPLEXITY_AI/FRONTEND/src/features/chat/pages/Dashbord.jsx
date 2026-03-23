import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { useChat } from "../hooks/useChat";
import { useEffect } from "react";

const Dashbord = () => {
  const chat = useChat();

  const { user, loading } = useSelector((state) => state.auth);

  console.log(user);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  useEffect(() => {
    chat.initializeSocketConnection();
  }, []);

  return (
    <div>
      {/* <h1>{user.email}</h1> */}
      <h1>{user.username}</h1>
    </div>
  );
};

export default Dashbord;
