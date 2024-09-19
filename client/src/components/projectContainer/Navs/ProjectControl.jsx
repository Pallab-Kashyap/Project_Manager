import React, { useEffect, useState } from "react";
import Button from "../../Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { GiCrossMark } from "react-icons/gi";
import '../../createProject/createProject.css'
import CmpLogo from "../../CmpLogo";

function ProjectControl({projectDtls}) {


   const navigate = useNavigate()
   const [isFeedback, setIsFeedback] = useState(false);


   window.addEventListener('click', (e) => {
    if(e.target.classList.contains('feedback-btn')) return
    if(!e.target.classList.contains('feedback-box')) setIsFeedback(false)
   })

   const feedbackClick = () => {
    setIsFeedback(prev => !prev)
   }
   const helpClick = () => {
    navigate('/')
   }

  return (
    <div className="bg-neutral-60  p-5 border-b-2 border-gray-600 h-fit  flex sm:justify-between">
      
      {/* navBar for mabile */}
      <div className="mobileNave sm:hidden p-3 text-2xl flex justify-center items-center"
        // onClick={topNavClick}
      >
        {/* {isActive ? <GiCrossMark /> : <FaBarsStaggered />} */}
      </div>

      {/* nabBar for web */}
      <div className="LOGO  flex px-4 py-2 sm:ml-5 align-middle gap-1 items-cente">
        <div className="">
          <CmpLogo />
        </div>
        <p className="px-3 pt-px text-2xl">{projectDtls.projectName}</p>
      </div>


      {/* user support */}
      <div className="sm:flex hidden relative">
        <div className=" flex gap-3 mr-4 items-center ">
          <Button classname=" bg-transparent text-neutral-300 hover:text-gray-100 hover:bg-neutral-800 border-2 border-neutral-700 px-4 py-1" text="Chat" onClick={feedbackClick} />
          <Button classname=" bg-transparent text-neutral-300 hover:text-gray-100 hover:bg-neutral-800 border-2 border-neutral-700 px-4 py-1" text="settings" onClick={feedbackClick} />
          <Button classname="createProjectBtn text-white py-2 px-6 text-xl font-semibold" text="Add Task" onClick={feedbackClick} />

        </div>
      </div>

    </div>
  );
}

export default ProjectControl;

