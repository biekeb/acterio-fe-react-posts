export async function getPosts() {
  try {
    const response = await fetch("https://dummyjson.com/posts");
    if (!response.ok) {
      throw new Error("Failed to fetch Posts");
    }
    const data = await response.json();
    return Promise.resolve(data.posts);
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
