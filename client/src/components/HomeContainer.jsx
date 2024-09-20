import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Button from "./Button";
import "../pages/home/Home.css";
import { useSearchParams } from "react-router-dom";
import CreateProject from "./createProject/CreateProject";
import ProjectItems from "./projectItems/ProjectItems";

function HomeContainer() {

  console.log('homeContianer renderd');
  const [isCreateProject, setIsCreateProject] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProjectSetting, setIsProjectSetting] = useState(false);

  const createProjectClick = (task) => {
    // isCreateProject ?
    // createProjectClick()
    // :
    setIsCreateProject((prev) => !prev);
  };

  return (
    <div className="flex flex-col ">
      <CreateProject
        info={{ isCreateProject, setIsCreateProject, createProjectClick }}
      />


        <div className=" pt-8 pl-10">
          <div className="flex ml-6 sm:ml-0 font-medium sm:gap-4 gap-4 flex-wrap-reverse">
            <Button classname="py-0.5 px-4 text-center border-2 border-gray-500 text-neutral-300" text="sort" />
            <Button
              classname="py-1 px-4 border-2 border-gray-500 text-neutral-300"
              text="filter"
            />
            <SearchBar props={{ searchQuery, setSearchQuery }} />
          </div>
          <Button
            classname={`z-40 absolute top-[5.2rem] text-white py-2 px-5 sm:ml-96 text-xl font-semibold ${
              isCreateProject
                // ? " hidden bottom-[111px] right-[710px] activeCreateProjectBtn border-2 border-gray-500 backdrop-blur-sm bg-white/5"
                ? " hidden"
                : "sm:bottom-auto sm:right-12 createProjectBtn"
            }`}
            text="Create Project"
            onClick={createProjectClick}
          />
        </div>

      <div className="flex-1 max-h-[30rem] px-10 mt-5 sm:mt-8  rounded-xl overflow-hidden overflow-y-scroll">
        <ProjectItems searchQuery={searchQuery} projectSetting={{isProjectSetting, setIsProjectSetting}} />
      </div>
    </div>
  );
}

export default HomeContainer;
