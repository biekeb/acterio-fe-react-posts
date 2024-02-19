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
import Header from "./Header";
import "../style/style.css";
import SearchBar from "./SearchBar";

export async function loader() {
  const [Posts, Users] = await Promise.all([getPosts(), getUsers()]);
  return { Posts, Users };
}

const Posts = () => {
  const { Posts: allPosts } = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  const [filteredPosts, setFilteredPosts] = useState(currentPosts);
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
    setFilteredPosts(filtered.slice(indexOfFirstPost, indexOfLastPost));
  }, [searchTerm, selectedTags, allPosts, currentPage]);

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
      await deletePost(postIdToDelete);

      console.log("Post deleted successfully.");

      // Update the list of posts after deletion using the state updater function
      const updatedPosts = allPosts.filter(
        (post) => post.id !== postIdToDelete
      );
      setFilteredPosts(updatedPosts.slice(indexOfFirstPost, indexOfLastPost));

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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="">
      <div className="posts">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="filter">
          <Chip
            label="All"
            clickable
            color={selectedTags.length === 0 ? "primary" : "default"}
            onClick={() => setSelectedTags([])}
            style={{
              margin: "5px 14px 0 14px",
              backgroundColor: "none",
              border: "1px solid white",
              borderRadius: "20px",
              color: "white",
            }}
          />

          {Array.from(new Set(allPosts.flatMap((post) => post.tags))).map(
            (tag) => (
              <Chip
                className="tag-chip"
                key={tag}
                label={tag}
                clickable
                color={selectedTags.includes(tag) ? "primary" : "default"}
                onClick={() => handleTagClick(tag)}
                style={{
                  margin: "5px 14px 0 14px",
                  backgroundColor: "none",
                  border: "1px solid white",
                  borderRadius: "20px",
                  backgroundColor: selectedTags.includes(tag)
                    ? "lightpurple"
                    : "none",
                  color: "white",
                }}
              />
            )
          )}
        </div>
        <h2>Posts</h2>
        <div
          style={{
            margin: "5% ",
          }}
        >
          <Grid container spacing={3}>
            {filteredPosts.map((post) => (
              <Grid item key={post.id} xs={12} sm={6} md={4} mb={3}>
                <div
                  className="posts-containter"
                  elevation={3}
                  style={{
                    padding: "20px",
                    borderRadius: "30px",
                  }}
                >
                  <Link
                    to={`/posts/${post.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <h3>{post.title}</h3>
                    <p variant="body2">{post.body}</p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginBottom: "8px",
                      }}
                    >
                      {post.tags.slice(0, 3).map((tag) => (
                        <div key={tag}>
                          <Chip
                            label={tag}
                            clickable
                            color={
                              selectedTags.includes(tag) ? "primary" : "default"
                            }
                            onClick={() => handleTagClick(tag)}
                            style={{
                              margin: "2px",
                              backgroundColor: "none",
                              border: "1px solid white",
                              borderRadius: "20px",
                              backgroundColor: selectedTags.includes(tag)
                                ? "lightpurple"
                                : "none",
                              color: "white",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <Typography variant="body2">{post.reactions}</Typography>
                  </Link>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteClick(post.id)}
                    style={{ color: "red", border: "1px solid red" }}
                  >
                    Delete
                  </Button>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>

        {/* Pagination */}
        <div className="pagination-container">
          {Array.from({
            length: Math.ceil(allPosts.length / postsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>

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
    </div>
  );
};

export default Posts;
