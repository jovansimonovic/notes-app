import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="mt-36 flex flex-col justify-center items-center">
        <div className="text-6xl font-semibold">404</div>
        <div className="mt-2 text-3xl">Page not found</div>
        <Link to="/">
          <button className="btn-primary mt-8 w-60">Go back to Home</button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
