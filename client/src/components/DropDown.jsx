import React, { useEffect, useState } from "react";
import { DROP_DOWN_TYPES } from "../utils/enum";
import { useCreateProjectContext } from "./createProject/createProjectContext";

function DropDown({ info, Status, force }) {
  let exp = ["STARTED", "NOT STARTED", "ON HOLD", "IN PROGRESS"];


  const [isActive, setIsActive] = useState(false);
  const [isSelected, setIsSelected] = useState(false)
  const { status, setStatus } = Status
  

  useEffect(()=>{
    setIsActive(false)
    setIsSelected(false)
  },[force])

  const displayOptions = () => {
    setIsActive((prev) => !prev);
  };

  const selecOption = (e) => {
    setStatus(e)
  }

  return (
    <div
      className={`text-gray-200 border-2 ${isSelected ? 'border-gray-200' : 'border-gray-500'} h-fit  p-3 max-w-36 text-center rounded-2xl`}
      onClick={displayOptions}
    >
      <ul className={`bg-transparent outline-none`}>
        {isActive ? (
          <>
            {exp.map((status, index) => (
              <li
                key={status}
                className={`mb-1 cursor-pointer hover:border-2 hover:rounded-xl hover:border-gray-300  border-gray-500 text-gray-500 hover:text-gray-400 p-1 ${
                  index === 0 ? "" : "border-t-2"
                }`}
                onClick={(e)=> {
                  selecOption(e.target.innerHTML)
                  setIsSelected(true)
                }}
              >
               {status}
              </li>
            ))}
          </>
        ) : (
          <li className="opacity-95">{status}</li>
        )}
      </ul>
    </div>
  );
}

export default DropDown;
