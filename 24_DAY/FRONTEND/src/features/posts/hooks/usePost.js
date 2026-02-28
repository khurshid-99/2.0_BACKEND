import { useContext, useEffect } from "react";
import { PostContext } from "../Post.Context";
import { getFeed, createPost, liked, unLiked } from "../services/post.api";

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

  const handleCreatePost = async (file, caption) => {
    setLoding(true);
    try {
      const respons = await createPost(file, caption);
      setFeed([respons.post, ...feed]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  };

  const handleLiked = async (postId) => {
    setLoding(true);
    try {
      const data = await liked(postId);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      handleGetFeed();
      setLoding(false);
    }
  };
  const handleUnliked = async (postId) => {
    setLoding(true);
    try {
      const data = await unLiked(postId);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      handleGetFeed();
      setLoding(false);
    }
  };

  useEffect(() => {
    handleGetFeed();
  }, []);

  return {
    loding,
    feed,
    post,
    handleGetFeed,
    handleCreatePost,
    handleLiked,
    handleUnliked,
  };
};
