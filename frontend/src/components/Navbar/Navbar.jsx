import React, { useState } from "react";
import ProfileButton from "../Buttons/ProfileButton";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { FiLogOut } from "react-icons/fi";

const Navbar = ({ user, getAllNotes, searchNotes }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // handles logout request
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // handles notes search request
  const handleSearch = () => {
    searchQuery === "" ? getAllNotes() : searchNotes(searchQuery);
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <div className="text-xl font-medium text-black py-2 mr-2">
        <Link to="/" className="cursor-default">
          <h2 className="cursor-pointer hover:drop-shadow-lg">Notes</h2>
        </Link>
      </div>

      {location.pathname === "/forgotPassword" && (
        <button className="btn-primary w-16">
          <Link to="/login">Log In</Link>
        </button>
      )}

      {location.pathname === "/profile" && (
        <button className="btn-primary w-min" onClick={logout}>
          <FiLogOut size={20} />
        </button>
      )}

      {user && (
        <>
          <SearchBar
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            handleSearch={handleSearch}
          />

          <div className="flex gap-x-2">
            <Link to="/profile">
              <ProfileButton user={user} />
            </Link>
            <button className="btn-primary" onClick={logout}>
              <FiLogOut size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
