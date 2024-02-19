import React from "react";
import Header from "../components/Header";
import Projects from "../components/PostDetail";
import { Link } from "react-router-dom";

const Post = () => {
  return (
    <div>
      <main className="main-post">
        <Link to="/posts" className="back-btn">
          back
        </Link>

        <Projects />
      </main>
    </div>
  );
};

export default Post;
