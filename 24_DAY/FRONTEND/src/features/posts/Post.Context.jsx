import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [loding, setLoding] = useState(false);
  const [post, setPost] = useState(null);
  const [feed, setFeed] = useState(null);
  const [follow, setFollow] = useState(null);
  const [unFollow, setUnFollow] = useState(null);

  return (
    <PostContext.Provider
      value={{
        loding,
        setLoding,
        post,
        setPost,
        feed,
        setFeed,
        follow,
        setFollow,
        unFollow,
        setUnFollow,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
