import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  // shows/hides password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-3">
      <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded outline-none">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Password"}
          className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
        />
        {showPassword ? (
          <FaRegEye
            size={22}
            className="text-primary cursor-pointer"
            onClick={() => toggleShowPassword()}
          />
        ) : (
          <FaRegEyeSlash
            size={22}
            className="text-slate-400 cursor-pointer"
            onClick={() => toggleShowPassword()}
          />
        )}
      </div>
      {location.pathname !== "/login" && placeholder !== "Confirm Password" && (
        <p className="text-xs text-slate-600 font-semibold">
          Must be at least 8 characters long
          <br />
          Must contain at least 1 uppercase letter and 1 number
        </p>
      )}
      {location.pathname === "/login" && (
        <Link
          to="/forgotPassword"
          className="text-sm text-primary font-medium underline"
        >
          Forgot Password?
        </Link>
      )}
    </div>
  );
};

export default PasswordInput;
