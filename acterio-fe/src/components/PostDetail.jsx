import React, { useState, useEffect } from "react";
import { Paper, Typography, Button } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { getPost, updateReactions } from "../services/dataService";

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
    }
  };

  return (
    <div>
      <h1>id</h1>
      <Paper elevation={3} style={{ padding: "20px", height: "100%" }}>
        <Typography variant="h6">{Post.title}</Typography>
        <Typography variant="body2">{Post.body}</Typography>
        <Typography variant="body2">{reactions} Reactions</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleReactClick}
          disabled={hasReacted}
        >
          React
        </Button>
      </Paper>
    </div>
  );
}
