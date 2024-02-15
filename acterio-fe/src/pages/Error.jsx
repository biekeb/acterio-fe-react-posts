import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div>
      <h1> {error.status}</h1>
      <h2> {error.statusText}</h2>
      <p>{error.message}</p>

      <a href="/">go home</a>
    </div>
  );
};

export default ErrorPage;
