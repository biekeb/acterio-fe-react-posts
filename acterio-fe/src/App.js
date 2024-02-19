import React from "react";
import Posts from "./components/Posts";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="app">
      <header>
        <Header />
      </header>
      <main>
        <Posts />
      </main>
    </div>
  );
};

export default App;
