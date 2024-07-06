import React from "react";
import { CgProfile } from "react-icons/cg";

const ProfileInfo = ({ user }) => {
  return (
    <>
      <div className="flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-slate-100">
        <p>{user.username}</p>
        <CgProfile size={26} className="text-primary" />
      </div>
    </>
  );
};

export default ProfileInfo;
