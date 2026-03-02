import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [loding, setLoding] = useState(false);
  const [userDetils, setUserDetils] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [following, setFollowing] = useState(null);

  return (
    <UserContext.Provider
      value={{
        loding,
        setLoding,
        userDetils,
        setUserDetils,
        followers,
        setFollowers,
        following,
        setFollowing,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
