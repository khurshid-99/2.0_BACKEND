import "../nav.scss";
import { useNavigate } from "react-router";

const Nav = () => {
  const naviget = useNavigate();
  return (
    <nav>
      <h1>Insta</h1>
      <button className="" onClick={() => naviget("/post_create")}>
        new post
      </button>
    </nav>
  );
};

export default Nav;
