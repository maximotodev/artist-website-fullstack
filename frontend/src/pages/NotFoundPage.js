import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div style={{ paddingTop: "200px", textAlign: "center" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={{ color: "#03a9f4" }}>
        Go to Homepage
      </Link>
    </div>
  );
};
export default NotFoundPage;
