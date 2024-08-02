import React, { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import { toast } from "react-toastify";
import Axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const EditDeleteProfile = ({ type, userData }) => {
  const [username, setUsername] = useState(userData.username);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // handles profile edit
  const handleEdit = async (e) => {
    e.preventDefault();

    // checks if username field is empty
    if (!username) {
      setError("Username is required");
      return;
    }

    // checks if either newPassword or
    // confirmPassword have values
    if (newPassword || confirmPassword) {
      // checks if newPassword and
      // confirmPassword fields match
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }

    setError("");

    try {
      const response = await Axios.put(`/user/update/${userData._id}`, {
        username: username,
        ...(newPassword && { newPassword }),
        ...(confirmPassword && { confirmPassword }),
        // adds newPassword and confirmPassword to
        // the request body only if they have values
      });

      console.log(response.data); // delete after development

      if (response.data && response.data.message) {
        toast.success(response.data.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        toast.error("Failed to update user");
      }
    }
  };

  const onDelete = async () => {
    try {
      const response = await Axios.delete(`/user/delete/${userData._id}`);

      if (response.data && response.data.message) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        toast.error("Failed to delete user");
      }
    }
  };

  return (
    <div>
      {type === "edit" ? (
        <>
          <h4 className="text-2xl mb-7">Edit Profile</h4>
          <form onSubmit={handleEdit}>
            <label className="input-label">Username:</label>
            <input
              type="text"
              className="input-box mb-3"
              value={username}
              placeholder="New Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="input-label">New Password:</label>
            <PasswordInput
              value={newPassword}
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label className="input-label">Confirm Password:</label>
            <PasswordInput
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm pb-1">{error}</p>}
            <button className="btn-primary">Update</button>
          </form>
        </>
      ) : (
        <>
          <h4 className="text-2xl mb-7">Delete Profile</h4>
          <p className="text-center">
            Are you sure you want to delete your profile?
          </p>
          <p className="text-xl font-semibold text-center my-4">
            This action is irreversible!
          </p>
          <button className="btn-danger" onClick={onDelete}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default EditDeleteProfile;
