import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import PostDetail from "./PostDetail";
import { getPosts } from "../services/dataService";
import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  const Posts = await getPosts();
  return { Posts };
}

const Posts = () => {
  const { Posts } = useLoaderData();
  console.log(Posts);

  return (
    <div>
      <h1>Posts</h1>
      <Grid container spacing={3}>
        {Posts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: "20px", height: "100%" }}>
              <Link
                to={`/posts/${post.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body2">{post.body}</Typography>
              </Link>
              {/* Additional post fields can be displayed here */}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Posts;
