import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // handles login request
  const handleLogin = async (e) => {
    e.preventDefault();

    // checks if email field is empty
    if (!email) {
      setError("Email is required");
      return;
    }

    // validates email
    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }

    // checks if password field is empty
    if (!password) {
      setError("Password is required");
      return;
    }

    setError("");

    // login api call
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Log In</h4>
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              Log In
            </button>
            <p className="text-sm text-center mt-4">
              Don't have an account?{" "}
              <Link to="/signUp" className="font-medium text-primary underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
