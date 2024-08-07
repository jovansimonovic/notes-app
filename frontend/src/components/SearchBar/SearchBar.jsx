import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = ({ value, onChange, handleSearch }) => {
  // checks if pressed button is Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="Find notes"
        className="w-full bg-transparent py-2 outline-none"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
