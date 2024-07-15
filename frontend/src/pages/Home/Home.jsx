import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import AddButton from "../../components/Buttons/AddButton";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Axios from "../../utils/axios";
import { formatDate } from "../../utils/helper";
import { toast } from "react-toastify";
import EmptyNotes from "../../components/EmptyNotes/EmptyNotes";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
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
    } catch (error) {}
  };

  // delete note API call
  const deleteNote = async (noteData) => {
    try {
      const response = await Axios.delete(`/note/delete/${noteData._id}`);

      if (response.data && response.data.message) {
        toast.success(response.data.message);
        getAllNotes();
      }
    } catch (error) {}
  };

  // search note API call
  const searchNotes = async (query) => {
    try {
      const response = await Axios.get("/note/search", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearching(true);
        setNotes(response.data.notes);
      }
    } catch (error) {}
  };

  // calls provided functions
  // when the component mounts
  useEffect(() => {
    getUser();
    getAllNotes();
  }, []);

  // handles notes pin
  const handlePin = async (noteData) => {
    try {
      const response = await Axios.put(`/note/toggle-pin/${noteData._id}`, {
        isPinned: !noteData.isPinned,
      });

      if (response.data) {
        getAllNotes();
      }
    } catch (error) {}
  };

  // handles notes edit
  const handleEdit = (noteData) => {
    setOpenAddEditModal({ isShown: true, data: noteData, type: "edit" });
  };

  return (
    <>
      <Navbar user={user} getAllNotes={getAllNotes} searchNotes={searchNotes} />

      <div className="container mx-auto">
        {notes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 mx-4 gap-4 mt-8">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={formatDate(note.createdAt)}
                content={note.content}
                isPinned={note.isPinned}
                onPin={() => handlePin(note)}
                onEdit={() => handleEdit(note)}
                onDelete={() => deleteNote(note)}
              />
            ))}
          </div>
        ) : (
          <EmptyNotes isSearching={isSearching} />
        )}
      </div>

      <AddButton setOpenAddEditModal={setOpenAddEditModal} />

      <Modal
        appElement={document.getElementById("root")}
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ ...openAddEditModal, isShown: false })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        className="w-[350px] sm:w-[500px] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          getAllNotes={getAllNotes}
          onClose={() =>
            setOpenAddEditModal({
              isShown: false,
              type: "add",
              data: null,
            })
          }
        />
      </Modal>
    </>
  );
};

export default Home;
