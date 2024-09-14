import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

function SearchBar({ props }) {
  
  let { searchQuery, setSearchQuery } = props
  
  const handleChange = (e) => {
    setSearchQuery(e.currentTarget.value)
  }
  console.log(searchQuery)

  return (
    <div className={`p-4 rounded-3xl bg-gray-800 flex`}>
        <button className="text-2xl p-1 px-2 text-white">
          <FiSearch />
        </button>
      <input
        type='search'
        value={searchQuery}
        placeholder="Search"
        onChange={handleChange}
        className={` bg-transparent flex-1 outline-none px-3 text-gray-200 text-xl `}
      />
    </div>
  );
}

export default SearchBar;
