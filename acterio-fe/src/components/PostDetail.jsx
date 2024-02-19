import React, { useState, useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { getPost, updateReactions } from "../services/dataService";
import Header from "./Header";
import reactimg from "../images/react.png";
import unreactimg from "../images/reacted.png";

export async function loader({ params }) {
  const Post = await getPost(params.id);
  return { Post };
}

export default function Projects() {
  const { Post } = useLoaderData();
  const [reactions, setReactions] = useState(0);
  const [hasReacted, setHasReacted] = useState(false);

  useEffect(() => {
    // Load reactions count and reaction status from localStorage on component mount
    const savedReactions = localStorage.getItem(`reactions_${Post.id}`);
    const hasReacted = localStorage.getItem(`hasReacted_${Post.id}`);

    setReactions(savedReactions ? parseInt(savedReactions, 10) : 0);
    setHasReacted(hasReacted === "true");
  }, [Post.id]);

  const handleReactClick = async () => {
    if (!hasReacted) {
      // Assuming you have a function to update the reactions on the server
      // and get the updated post with the new reactions count
      const updatedPost = await updateReactions(Post.id, reactions + 1);

      // Save the updated reactions count and set hasReacted to true in localStorage
      localStorage.setItem(
        `reactions_${Post.id}`,
        updatedPost.reactions.toString()
      );
      localStorage.setItem(`hasReacted_${Post.id}`, "true");

      setReactions(updatedPost.reactions);
      setHasReacted(true);
    } else {
      // User has already reacted, unreact by decrementing the reactions count
      const updatedPost = await updateReactions(Post.id, reactions - 1);

      // Save the updated reactions count and set hasReacted to false in localStorage
      localStorage.setItem(
        `reactions_${Post.id}`,
        updatedPost.reactions.toString()
      );
      localStorage.setItem(`hasReacted_${Post.id}`, "false");

      setReactions(updatedPost.reactions);
      setHasReacted(false);
    }
  };

  return (
    <div className="post-flex">
      <div
        className="post-containter"
        elevation={3}
        style={{ borderRadius: "30px" }}
      >
        <h3 variant="h6">{Post.title}</h3>
        <p variant="body2">{Post.body}</p>
        {/* Display Tags */}
        <div style={{ marginTop: "10px" }}>
          {Post.tags.map((tag, index) => (
            <span
              key={index}
              style={{
                marginRight: "5px",
                padding: "5px",
                backgroundColor: "none",
                border: "1px solid white",
                borderRadius: "20px",
                color: "white",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          style={{
            cursor: "pointer",
            border: "none",
            background: "none",
            marginTop: "20px",
          }}
          onClick={handleReactClick}
        >
          {hasReacted ? (
            <img
              src={unreactimg}
              alt="Unreact"
              style={{
                width: "20px",
                height: "20px",
              }}
            />
          ) : (
            <img
              src={reactimg}
              alt="React"
              style={{ width: "20px", height: "20px" }}
            />
          )}
          <Typography variant="body2">{reactions} </Typography>
        </button>
      </div>
    </div>
  );
}
