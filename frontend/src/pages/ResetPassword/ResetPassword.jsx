import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // checks if email field is empty
    if (!newPassword) {
      setError("Password is required");
      return;
    }

    if (!confirmPassword) {
      setError("Confirm password is required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    console.log("New password set");
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSubmit}>
            <h4 className="text-2xl mb-7">Reset Password</h4>
            <PasswordInput
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <PasswordInput
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
