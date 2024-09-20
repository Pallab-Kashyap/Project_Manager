import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

function SearchBar({ props }) {
  
  let { searchQuery, setSearchQuery } = props
  
  const handleChange = (e) => {
    setSearchQuery(e.currentTarget.value)
  }
  console.log(searchQuery)

  return (
    <div className={`p-1 py-px rounded-lg border-2 border-gray-500 bg-transparent flex w-full mr-4 sm:mr-0 sm:w-auto`}>
        <button className="text-xl p-1 px-2 text-white">
          <FiSearch />
        </button>
      <input
        type='search'
        value={searchQuery}
        placeholder="Search"
        onChange={handleChange}
        className={` bg-transparent flex-1 outline-none px-1 text-gray-200 text-md `}
      />
    </div>
  );
}

export default SearchBar;
