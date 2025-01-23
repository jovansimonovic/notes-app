import React from "react";
import { MdAdd } from "react-icons/md";

const AddButton = ({ setOpenAddEditModal }) => {
  return (
    <button
      className="bg-primary w-14 h-14 flex items-center justify-center rounded-full hover:bg-blue-600 fixed right-8 bottom-8"
      onClick={() => {
        setOpenAddEditModal({ isShown: true, type: "add", data: null });
      }}
    >
      <MdAdd className="text-[32px] text-white" />
    </button>
  );
};

export default AddButton;
