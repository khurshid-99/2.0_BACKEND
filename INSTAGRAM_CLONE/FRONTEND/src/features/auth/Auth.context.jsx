import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loding, setLoding] = useState(false);

  return (
    <AuthContext.Provider value={{ user, setUser, loding, setLoding }}>
      {children}
    </AuthContext.Provider>
  );
};
