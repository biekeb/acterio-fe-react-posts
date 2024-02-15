import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Posts from "./components/Posts";
import { loader as topicLoader } from "./components/Posts";
import Error from "./pages/Error";
import PostDetail, { loader as topicLoaderId } from "./components/PostDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Posts />,
    errorElement: <Error />,
    loader: topicLoader,
  },
  {
    path: "/posts/:id",
    element: <PostDetail />,
    errorElement: <Error />,
    loader: (params) => topicLoaderId(params),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
