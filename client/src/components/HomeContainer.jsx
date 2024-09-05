import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Button from "./Button";
import "../pages/home/Home.css";
import ProjectContainer from "./projectContainer/ProjectContainer";
import { useSearchParams } from "react-router-dom";
import CreateProject from "./createProject/CreateProject";

function HomeContainer() {

    const [isCreateProject, setIsCreateProject] = useState(false)

  const createProjectClick = (task) => {
      isCreateProject ?
      createProjectClick()
      :
      setIsCreateProject(prev => !prev)
  };

  return (
    <div className=" flex flex-col">
        <CreateProject info={{isCreateProject,setIsCreateProject,createProjectClick}}/>
      <div className={``}>
        <div className=" m-2 sm:m-8 sm:mx-12 sm:px-16">
          <SearchBar />
        </div>
        <div className="flex reletive sm:px-16 sm:mx-16 justify-between">
          <div className="flex ml-8 sm:ml-0 font-medium">
            <Button classname="bg-gray-500 py-2 w-24  sm:px-6" text="sort" />
            <Button
              classname="bg-gray-500 py-2 w-24 sm:px-6 ml-2 sm:ml-5"
              text="filter"
            />
          </div>
          <Button
            classname={` z-40 absolute bottom-6 right-4 text-white py-2 px-6 sm:ml-96 text-xl font-semibold ${isCreateProject ? 'bottom-28 right-[716px] activeCreateProjectBtn border-2 border-gray-200 backdrop-blur-sm bg-white/5' : 'sm:bottom-auto sm:right-32 createProjectBtn'}`}
            text="Create Project"
            onClick={createProjectClick}
          />
        </div>
      </div>
      <div className="  flex-1 max-h-[600px] sm:mx-16 sm:mt-10 p-4 sm:max-h-[500px] rounded-xl  overflow-hidden overflow-y-scroll">
        <ProjectContainer />
      </div>
    </div>
  );
}

export default HomeContainer;
