export async function getPosts() {
  try {
    const storedPosts = localStorage.getItem('posts');
    
    if (storedPosts) {
      const posts = JSON.parse(storedPosts);
      console.log("Fetched posts from localStorage:", posts);
      return Promise.resolve(posts);
    } else {
      const response = await fetch("https://dummyjson.com/posts");
      if (!response.ok) {
        throw new Error("Failed to fetch Posts");
      }
      const data = await response.json();

      const posts = data.posts;
      console.log("Fetched posts from API:", posts);

      // Save the fetched posts to localStorage for future use
      localStorage.setItem('posts', JSON.stringify(posts));

      return Promise.resolve(posts);
    }
  } catch (error) {
    console.error("Error fetching Posts:", error.message);
    return Promise.reject(error);
  }
}



export async function getPost(id) {
  try {
    const Posts = await getPosts();
    const Post = Posts.find((Post) => Post.id === Number(id));

    if (!Post) {
      throw new Error("Post not found");
    }

    return Promise.resolve(Post);
  } catch (error) {
    console.error("Error fetching Post:", error.message);
    return Promise.reject(error);
  }
}

export async function getUsers() {
  try {
    const response = await fetch("https://dummyjson.com/users");
    if (!response.ok) {
      throw new Error("Failed to fetch Users");
    }
    const data = await response.json();
    return Promise.resolve(data.users);
  } catch (error) {
    console.error("Error fetching Users:", error.message);
    return Promise.reject(error);
  }
}

export async function deletePost(postId) {
  try {
    // Simulate the deletion on the client side
    const posts = await getPosts();
    const updatedPosts = posts.filter((post) => post.id !== postId);

    console.log("Updated posts after deletion:", updatedPosts);

    // Save the updated posts
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    // Return the updated posts
    return Promise.resolve(updatedPosts);
  } catch (error) {
    console.error("Error deleting Post:", error.message);
    return Promise.reject(error);
  }
}

export const updateReactions = async (postId, newReactionsCount) => {
  // Simulate the update on the client side
  const updatedPost = { id: postId, reactions: newReactionsCount };

  return updatedPost;
};
