import React, { useEffect, useState } from "react";
import "./createProject.css";
import { GiCrossMark } from "react-icons/gi";
import DropDown from "../DropDown";

function CreateProject({ info }) {
  const { isCreateProject, setIsCreateProject, createProjectClick } = info;

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisbility] = useState(true);

  useEffect(() => {
    setVisbility(true)
  },[info])

  const clearState = () => {
    setProjectName("");
    setDescription("");
    setIsCreateProject(false);
  };

  return (
    <div
      className={`createProjectContainer  ${
        isCreateProject ? "block" : "hidden"
      } flex place-content-center items-center`}
    >
      <button
        onClick={() => clearState()}
        className=" absolute top-8 right-32 z-30 p-6 bg-gray-500 opacity-95 rounded-full"
      >
        <GiCrossMark />
      </button>
      <div className={`createProject grid grid-cols-2 `}>
        <div className="h-full w-full border-r-2 border-gray-500 p-12">
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-transparent border-2 p-3 outline-gray-400 text-gray-200 border-gray-400 rounded-xl w-5/6"
          />
          <textarea
            name="project description"
            id="description"
            maxLength={200}
            placeholder="Project Description..."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              console.log(description);
            }}
            className="bg-transparent border-2 p-4 outline-gray-400 text-gray-200 border-gray-500 rounded-2xl w-5/6 mt-10 h-36 "
          ></textarea>
        </div>

        <div className="h-full w-full  p-12">


          <div className="grid grid-cols-3">
            <DropDown info={[]} />

            {/* VISIBILITY  */}

            <div
              className={`text-gray-200 border-2 ${
                visibility ? "border-gray-200" : "border-gray-500"
              } h-fit  p-3 max-w-36 text-center rounded-2xl`}
              onClick={() => setVisbility((prev) => !prev)}
            >
              {`${visibility ? "VISIBLE" : "HIDDEN"}`}
            </div>
          </div>

          <div>
            
          </div>

        </div>

      </div>
    </div>
  );
}

export default CreateProject;
