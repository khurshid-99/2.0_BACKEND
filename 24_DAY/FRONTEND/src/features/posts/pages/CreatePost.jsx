import { useRef, useState } from "react";
import "./createpost.scss";
import { usePost } from "../hooks/usePost";
import { useNavigate, Link } from "react-router";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const postImageInputFild = useRef(null);

  const navigate = useNavigate();

  const { loding, handleCreatePost } = usePost();

  const handleSubmit = async (en) => {
    en.preventDefault();
    const file = postImageInputFild.current.files[0];

    await handleCreatePost(file, caption);

    setCaption("");
    
    navigate("/feed");
  };

  if (loding) {
    return (
      <main>
        <h1>Loding...</h1>
      </main>
    );
  }

  return (
    <main className="create_post_page">
      <div className="form_container">
        <h1>Create Post</h1>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="select_file">Select file</label>
          <input
            ref={postImageInputFild}
            hidden
            type="file"
            name=""
            id="select_file"
          />
          <input
            value={caption}
            onInput={(e) => setCaption(e.target.value)}
            type="text"
            placeholder="Enter Caption"
          />
          <button type="submit">Post</button>
        </form>
        <p>Back to <Link to={"/feed"} className="toggle">Feed</Link> </p>
      </div>
    </main>
  );
};

export default CreatePost;
