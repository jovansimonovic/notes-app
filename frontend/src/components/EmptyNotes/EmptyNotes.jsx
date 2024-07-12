import React from "react";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { LuSearchSlash } from "react-icons/lu";

const EmptyNotes = ({ isSearching }) => {
  return (
    <div className="flex flex-col justify-center items-center mt-36">
      {isSearching ? (
        <>
          <LuSearchSlash size={200} className="text-primary" />
          <p className="mt-4 text-center w-[80%] text-xl font-medium">
            No notes found matching your search.
          </p>
          <p className="w-[80%] mt-2 text-center text-slate-600">
            Check your spelling and try again.
          </p>
        </>
      ) : (
        <>
          <RiStickyNoteAddLine size={200} className="text-primary" />
          <p className="mt-4 text-center w-[80%] text-xl font-medium">
            Add your first note to start organizing your thoughts, tasks, and
            ideas.
          </p>
          <p className="w-[80%] mt-2 text-center text-slate-600">
            Keeping notes makes it easier to stay on top of things and boosts
            your productivity!
          </p>
        </>
      )}
    </div>
  );
};

export default EmptyNotes;
