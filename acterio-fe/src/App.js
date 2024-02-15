import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Posts from "./components/Posts";
import PostDetail from "./components/PostDetail";
import Error from "./pages/Error";
import { loader as topicLoader } from "./components/Posts";

const App = () => {
  return <div className="container mx-auto p-4"></div>;
};

export default App;
