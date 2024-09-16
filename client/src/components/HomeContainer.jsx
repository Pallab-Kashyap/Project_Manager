import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Button from "./Button";
import "../pages/home/Home.css";
import ProjectContainer from "./projectContainer/ProjectContainer";
import { useSearchParams } from "react-router-dom";
import CreateProject from "./createProject/CreateProject";

function HomeContainer() {
  const [isCreateProject, setIsCreateProject] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const createProjectClick = (task) => {
    // isCreateProject ?
    // createProjectClick()
    // :
    setIsCreateProject((prev) => !prev);
  };

  return (
    <div className="h-full flex flex-col ">
      <CreateProject
        info={{ isCreateProject, setIsCreateProject, createProjectClick }}
      />
      <div className={``}>
        <div className="flex reletive sm:px-8 sm:mx-16 justify-between  mt-7">
          <div className="flex ml-8 sm:ml-0 font-medium gap-3">
            <Button classname="py-1 px-5 border-2 border-gray-500 text-neutral-300" text="sort" />
            <Button
              classname="py-1 px-5 border-2 border-gray-500 text-neutral-300"
              text="filter"
            />
            <SearchBar props={{ searchQuery, setSearchQuery }} />
          </div>
          <Button
            classname={` z-40 absolute bottom-6 right-4 text-white py-2 px-6 sm:ml-96 text-xl font-semibold ${
              isCreateProject
                ? " hidden bottom-[111px] right-[710px] activeCreateProjectBtn border-2 border-gray-500 backdrop-blur-sm bg-white/5"
                : "sm:bottom-auto sm:right-32 createProjectBtn"
            }`}
            text="Create Project"
            onClick={createProjectClick}
          />
        </div>
      </div>
      <div className=" flex-1 max-h-[600px] sm:mx-16 sm:mt-10 p-4 rounded-xl overflow-hidden overflow-y-scroll ">
        <ProjectContainer searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export default HomeContainer;
