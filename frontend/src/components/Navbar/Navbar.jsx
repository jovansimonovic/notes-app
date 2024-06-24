import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // handles logout request
  const logout = () => {
    navigate("/login");
  };

  // handles notes search request
  const handleSearch = () => {
    console.log(searchQuery);
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2 pr-2">Notes</h2>

      <SearchBar
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        handleSearch={handleSearch}
      />

      <div className="flex gap-2">
        <ProfileInfo />
        <button className="btn-primary" onClick={logout}>
          <FiLogOut size={20} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
