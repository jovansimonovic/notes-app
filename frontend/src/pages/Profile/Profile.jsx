import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { formatDate } from "../../utils/helper";
import Modal from "react-modal";
import EditDeleteProfile from "./EditDeleteProfile";

const Profile = () => {
  const [openEditDeleteModal, setOpenEditDeleteModal] = useState({
    isShown: false,
    type: "edit",
    data: null,
  });

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleEdit = (userData) => {
    setOpenEditDeleteModal({ isShown: true, data: userData, type: "edit" });
  };

  const handleDelete = (userData) => {
    setOpenEditDeleteModal({ isShown: true, data: userData, type: "delete" });
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <h4 className="text-2xl mb-7">Your Profile</h4>
          <label className="input-label">Username:</label>
          <input
            type="text"
            className="input-box"
            readOnly
            value={user.username}
          />
          <label className="input-label">Email:</label>
          <input
            type="text"
            className="input-box"
            readOnly
            value={user.email}
          />
          <label className="input-label">Created At:</label>
          <input
            type="text"
            className="input-box"
            readOnly
            value={formatDate(user.createdAt)}
          />
          <div className="flex gap-x-4">
            <button className="btn-primary" onClick={() => handleEdit(user)}>
              Edit Account
            </button>
            <button className="btn-danger" onClick={() => handleDelete(user)}>
              Delete Account
            </button>
          </div>
        </div>
      </div>

      <Modal
        appElement={document.getElementById("root")}
        isOpen={openEditDeleteModal.isShown}
        onRequestClose={() =>
          setOpenEditDeleteModal({ ...openEditDeleteModal, isShown: false })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        className="w-[350px] sm:w-[500px] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
      >
        <EditDeleteProfile
          type={openEditDeleteModal.type}
          userData={openEditDeleteModal.data}
        />
      </Modal>
    </>
  );
};

export default Profile;
