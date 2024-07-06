import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import AddButton from "../../components/Buttons/AddButton";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Axios from "../../utils/axios";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    getUser();
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
          <NoteCard
            title="Pick Marjan up at 16:30"
            date="June 24th 2024"
            content="Pick Marjan up at 16:30"
            isPinned={true}
            onPin={handlePin}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <NoteCard
            title="Pick Marjan up at 16:30"
            date="June 24th 2024"
            content="Pick Marjan up at 16:30"
            isPinned={true}
            onPin={handlePin}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <NoteCard
            title="Pick Marjan up at 16:30"
            date="June 24th 2024"
            content="Pick Marjan up at 16:30"
            isPinned={true}
            onPin={handlePin}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
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
