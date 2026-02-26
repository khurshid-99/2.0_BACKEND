import { useContext } from "react";
import { PostContext } from "../Post.Context";
import { getFeed } from "../services/post.api";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loding, setLoding, post, setPost, feed, setFeed } = context;

  const handleGetFeed = async () => {
    setLoding(true);
    try {
      const respons = await getFeed();
      setFeed(respons.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  };

  return { loding, feed, post, handleGetFeed };
};
