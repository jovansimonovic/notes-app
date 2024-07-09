import React, { useState } from "react";
import Axios from "../../utils/axios";
import { toast } from "react-toastify";

const AddEditNotes = ({ type, noteData, getAllNotes, onClose }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [error, setError] = useState(null);

  // add note API call
  const addNote = async () => {
    try {
      const response = await Axios.post("/note/create", { title, content });

      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
        toast.success(response.data.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        toast.error("Failed to create note")
      }
    }
  };

  // edit note API call
  const editNote = async () => {
    try {
      const response = await Axios.put(`/note/update/${noteData._id}`, {
        title,
        content,
      });

      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
        toast.success(response.data.message)
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        toast.error("Failed to update note");
      }
    }
  };

  // checks if title and content are filled
  // and handles add/edit note button click
  const handleClick = () => {
    if (!title) {
      setError("Title is required");
      return;
    }

    if (!content) {
      setError("Content is required");
      return;
    }

    setError("");

    return type === "add" ? addNote() : editNote();
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Notes title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Content</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Notes content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          className="btn-primary font-medium mt-5 p-3"
          onClick={handleClick}
        >
          {type === "add" ? "Create" : "Update"}
        </button>
      </div>
    </div>
  );
};

export default AddEditNotes;
