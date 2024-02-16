import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Link, useLoaderData } from "react-router-dom";
import { getPosts, deletePost } from "../services/dataService";
import { getUsers } from "../services/dataService";

export async function loader() {
  const [Posts, Users] = await Promise.all([getPosts(), getUsers()]);
  return { Posts, Users };
}

const Posts = () => {
  const { Posts: allPosts } = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  useEffect(() => {
    // Filter posts based on the search term and selected tags
    const filtered = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedTags.length === 0 ||
          selectedTags.some((tag) => post.tags.includes(tag)))
    );
    setFilteredPosts(filtered);
  }, [searchTerm, selectedTags, allPosts]);

  const handleTagClick = (tag) => {
    // Toggle selected tags
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  const handleDeleteClick = (postId) => {
    // Open the delete confirmation modal
    setDeleteConfirmationOpen(true);
    setPostIdToDelete(postId);
  };

  const handleConfirmDelete = async () => {
    // Close the delete confirmation modal
    setDeleteConfirmationOpen(false);

    try {
      // Delete the post
      const updatedPosts = await deletePost(postIdToDelete);

      console.log("Post deleted successfully.");

      // Update the list of posts after deletion using the state updater function
      setFilteredPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== postIdToDelete)
      );

      console.log("Filtered posts updated");
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  const handleCancelDelete = () => {
    // Close the delete confirmation modal without deleting
    setDeleteConfirmationOpen(false);
    setPostIdToDelete(null);
  };

  return (
    <div>
      <h1>Posts</h1>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div style={{ margin: "10px 0" }}>
        <Typography variant="subtitle2" gutterBottom>
          Filter by Tags:
        </Typography>
        <Chip
          label="All"
          clickable
          color={selectedTags.length === 0 ? "primary" : "default"}
          onClick={() => setSelectedTags([])}
          style={{ marginRight: "8px" }}
        />

        {Array.from(new Set(allPosts.flatMap((post) => post.tags))).map(
          (tag) => (
            <Chip
              key={tag}
              label={tag}
              clickable
              color={selectedTags.includes(tag) ? "primary" : "default"}
              onClick={() => handleTagClick(tag)}
              style={{ marginRight: "8px" }}
            />
          )
        )}
      </div>

      <Grid container spacing={3}>
        {filteredPosts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4} mb={3}>
            <Paper elevation={3} style={{ padding: "20px", height: "100%" }}>
              <Link
                to={`/posts/${post.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography variant="h6">{post.title}</Typography>
                {/* <Typography variant="body2">{post.body}</Typography> */}
              </Link>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDeleteClick(post.id)}
              >
                Delete
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {/* Delete Confirmation Modal */}
      <Dialog open={deleteConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this post?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Posts;
