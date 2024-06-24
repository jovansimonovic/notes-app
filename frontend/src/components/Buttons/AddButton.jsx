import React from "react";
import { MdAdd } from "react-icons/md";

const AddButton = () => {
  return (
    <button
      className="bg-primary w-16 h-16 flex items-center justify-center rounded-full hover:bg-blue-600 absolute right-10 bottom-10"
      onClick={() => {}}
    >
      <MdAdd className=" text-[32px] text-white" />
    </button>
  );
};

export default AddButton;
