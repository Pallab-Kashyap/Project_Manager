import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

function SearchBar({ type, classname = "" }) {
  const [text, setText] = useState("");

  return (
    <div className={`p-4 rounded-3xl bg-gray-800 flex ${classname}`}>
        <button className="text-2xl p-1 px-2 text-white">
          <FiSearch />
        </button>
      <input
        type={type}
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        className={` bg-transparent flex-1 outline-none px-3 text-gray-400 text-xl `}
      />
    </div>
  );
}

export default SearchBar;
