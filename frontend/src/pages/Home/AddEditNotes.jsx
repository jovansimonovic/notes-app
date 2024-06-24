import React from "react";

const AddEditNotes = () => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Notes title"
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Content</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Notes content"
          rows={10}
        ></textarea>

        <div className="mt-3">
          <label className="input-label">Tags</label>
        </div>

        <button className="btn-primary font-medium mt-5 p-3" onClick={() => {}}>
          Create
        </button>
      </div>
    </div>
  );
};

export default AddEditNotes;
