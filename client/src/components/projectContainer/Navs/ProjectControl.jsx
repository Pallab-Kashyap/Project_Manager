import React, { useEffect, useState } from "react";
import Button from "../../Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { GiCrossMark } from "react-icons/gi";
import '../../createProject/createProject.css'
import CmpLogo from "../../CmpLogo";

function ProjectControl({projectDtls}) {


   const navigate = useNavigate()

   const helpClick = () => {
    navigate('/')
   }

  return (
    <div className="bg-neutral-60 p-2 px-10 border-b-2 border-gray-600 sm:flex justify-between">
      
      {/* navBar for mabile */}
      {/* <div className="mobileNave sm:hidden p-3 text-2xl flex justify-center items-center"
        // onClick={topNavClick}
      >
        {/* {isActive ? <GiCrossMark /> : <FaBarsStaggered />} */}
      {/* </div> */}

      {/* nabBar for web */}
      <div className="LOGO  flex py-2 align-middle items-cente">
        <p className="text-xl">{projectDtls.projectName}</p>
      </div>


      {/* user support */}
      <div className="sm:flex hidden relative">
        <div className=" flex gap-3 items-center ">
          <Button classname=" bg-transparent text-neutral-300 hover:text-gray-100 hover:bg-neutral-800 border-2 border-neutral-700 px-4 py-1" text="Chat"/>
          <Button classname=" bg-transparent text-neutral-300 hover:text-gray-100 hover:bg-neutral-800 border-2 border-neutral-700 mr-4 px-4 py-1" text="settings" />
          <Button classname="createProjectBtn text-white py-0.5 px-4 text-xl font-semibold" text="Add Task"  />

        </div>
      </div>

    </div>
  );
}

export default ProjectControl;

