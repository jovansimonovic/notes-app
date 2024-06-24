import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import AddButton from "../../components/Buttons/AddButton";

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

      <AddButton />
    </>
  );
};

export default Home;
