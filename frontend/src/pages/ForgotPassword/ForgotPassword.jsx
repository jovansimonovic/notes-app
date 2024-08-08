import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { validateEmail } from "../../utils/helper";
import Axios from "../../utils/axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isRequestSent, setIsRequestSent] = useState(false);

  const handleSubmit = async (e) => {
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

    setError("");

    // forgot password API call
    try {
      const response = await Axios.post("/user/forgot-password", {
        email: email,
      });

      if (response.data && response.data.message) {
        toast.success(response.data.message);
        setIsRequestSent(true);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          {!isRequestSent ? (
            <form onSubmit={handleSubmit}>
              <h4 className="text-2xl mb-7">Forgot Password</h4>
              <label className="text-sm">Enter your email:</label>
              <input
                type="text"
                placeholder="Email"
                className="input-box"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm pb-1">{error}</p>}
              <button type="submit" className="btn-primary">
                Send
              </button>
            </form>
          ) : (
            <>
              <h4 className="text-2xl mb-7">Request sent</h4>
              <p className="text-justify">
                An email with a password reset link has been sent to your email
                address.
                <br />
                <br />
                Please check your email to continue.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
