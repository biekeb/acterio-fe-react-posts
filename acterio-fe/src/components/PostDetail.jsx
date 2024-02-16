import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Paper, Typography, Button } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { getPost, updateReactions } from "../services/dataService";

export async function loader({ params }) {
  const Post = await getPost(params.id);
  console.log("Retrieved Post:", Post);
  return { Post };
}

export default function Projects() {
  const { Post } = useLoaderData();
  const storedReactions = parseInt(
    localStorage.getItem(`reactions_${Post.id}`),
    10
  );
  const [reactions, setReactions] = useState(
    storedReactions || Post.reactions || 0
  );

  useEffect(() => {
    console.log("Initial reactions:", reactions);
  }, [reactions]);

  const handleReactClick = async () => {
    const updatedPost = await updateReactions(Post.id, reactions + 1);
    console.log("Updated Post:", updatedPost);

    // Save the updated reactions count to localStorage
    localStorage.setItem(
      `reactions_${Post.id}`,
      updatedPost.reactions.toString()
    );

    setReactions(updatedPost.reactions);
  };

  return (
    <div>
      <h1>id</h1>
      <Paper elevation={3} style={{ padding: "20px", height: "100%" }}>
        <Typography variant="h6">{Post.title}</Typography>
        <Typography variant="body2">{Post.body}</Typography>
        <Typography variant="body2">{reactions} Reactions</Typography>
        <Button variant="contained" color="primary" onClick={handleReactClick}>
          React
        </Button>
      </Paper>
    </div>
  );
}
