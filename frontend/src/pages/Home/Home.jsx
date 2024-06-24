import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";

const Home = () => {
  // handles notes pin
  const handlePin = () => {
    console.log("Pin");
  };

  // handles notes edit
  const handleEdit = () => {
    console.log("Edit");
  };

  // handles notes delete
  const handleDelete = () => {
    console.log("Delete");
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title="Pick Marjan up at 16:30"
            date="June 24th 2024"
            content="Pick Marjan up at 16:30"
            tags="#Shopping"
            isPinned={true}
            onPin={handlePin}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <button
        className="bg-primary w-16 h-16 flex items-center justify-center rounded-full hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {}}
      >
        <MdAdd className=" text-[32px] text-white" />
      </button>
    </>
  );
};

export default Home;
