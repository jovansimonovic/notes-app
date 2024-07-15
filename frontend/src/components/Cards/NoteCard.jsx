import React from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  isPinned,
  onEdit,
  onDelete,
  onPin,
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-md duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-md font-medium">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300"}`}
          onClick={onPin}
        />
      </div>

      <p className="text-sm text-slate-600 mt-2">{content}</p>

      <div className="flex items-center justify-between mt-2">
        <MdCreate className="icon-btn hover:text-primary" onClick={onEdit} />
        <MdDelete className="icon-btn hover:text-red-500" onClick={onDelete} />
      </div>
    </div>
  );
};

export default NoteCard;
