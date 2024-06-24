import React from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // handles logout request
  const logout = async (e) => {
    navigate("/login");
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>
      <div className="flex gap-2">
        <ProfileInfo />
        <button className="btn-primary" onClick={logout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
