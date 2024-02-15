import React from "react";
import { useParams } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { getPost } from "../services/dataService";

export async function loader({ params }) {
  const Post = await getPost(params.id);
  console.log(params.id);
  console.log(Post);

  return { Post };
}

export default function Projects() {
  const { Post } = useLoaderData();
  console.log(Post);

  return (
    <div>
      <h1>id</h1>
      <Paper elevation={3} style={{ padding: "20px", height: "100%" }}>
        <Typography variant="h6">{Post.title}</Typography>
        <Typography variant="body2">{Post.body}</Typography>
      </Paper>
    </div>
  );
}
