import { useEffect } from "react";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import "./feed.scss";
import Nav from "../shared/components/Nav";

const Feed = () => {
  const {
    loding,
    feed,
    handleGetFeed,
    handleLiked,
    handleUnliked,
    handleFollow,
    handleUnfollow,
  } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loding || !feed) {
    return (
      <main>
        <h1>Loding...</h1>
      </main>
    );
  }

  console.log(feed);

  return (
    <main className="feed_page">
      <Nav />
      {feed.map((post) => (
        // console.log(post)
        <Post
          key={post._id}
          user={post.user}
          post={post}
          liked={handleLiked}
          unLiked={handleUnliked}
          follow={handleFollow}
          unfollow={handleUnfollow}
        />
      ))}
    </main>
  );
};

export default Feed;
