import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import AddButton from "../../components/Buttons/AddButton";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Axios from "../../utils/axios";
import { formatDate } from "../../utils/helper";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  // get user API call
  const getUser = async () => {
    try {
      const response = await Axios.get("/user/get");

      if (response.data && response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  // get all notes API call
  const getAllNotes = async () => {
    try {
      const response = await Axios.get("/note/get-all");

      if (response.data && response.data.notes) {
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An error occurred. Please try again");
    }
  };

  useEffect(() => {
    getUser();
    getAllNotes();
  }, []);

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
      <Navbar user={user} />

      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 mx-4 gap-4 mt-8">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              title={note.title}
              date={formatDate(note.createdAt)}
              content={note.content}
              isPinned={note.isPinned}
              onPin={handlePin}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      <AddButton setOpenAddEditModal={setOpenAddEditModal} />

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ ...openAddEditModal, isShown: false })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        contentLabel=""
        className="w-[400px] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
      >
        <AddEditNotes />
      </Modal>
    </>
  );
};

export default Home;
