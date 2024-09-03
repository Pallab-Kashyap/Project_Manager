import React, { useState } from "react";
import user from "../../assets/user.png";
import Button from "../Button";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { GiCrossMark } from "react-icons/gi";

function TopNav({info}) {

   let {topNavClick, isActive} = info

  return (
    <div className="bg-neutral-600 h-fit  flex sm:justify-between">
      
      <div className="mobileNave sm:hidden p-3 text-2xl flex justify-center items-center"
        onClick={topNavClick}
      >
        {isActive ? <GiCrossMark /> : <FaBarsStaggered />}
      </div>
      <div className="LOGO flex p-4 sm:ml-5">
        <div className="h-10 w-10">
          <img src={user} alt="" />
        </div>
        <p className="px-4 pt-1">project</p>
      </div>
      <div className="pageNav hidden sm:block p-5">
        <ul className="flex gap-10">
          <li className="group">
            <NavLink to="/">Home</NavLink>
            <div className=" bg-green-500 h-1 w-0 group-hover:w-full transition-all "></div>
          </li>
          <li className="group">
            <NavLink to="/">About</NavLink>
            <div className=" bg-green-500 h-1 w-0 group-hover:w-full transition-all "></div>
          </li>
          <li className="group">
            <NavLink to="/">Pricing</NavLink>
            <div className=" bg-green-500 h-1 w-0 group-hover:w-full transition-all "></div>
          </li>
          <li className="group">
            <NavLink to="/">Leaderboard</NavLink>
            <div className=" bg-green-500 h-1 w-0 group-hover:w-full transition-all "></div>
          </li>
        </ul>
      </div>
      <div className="sm:flex hidden">
        <div className="feedback flex gap-3 mr-4 items-center ">
          <Button classname="bg-blue-500 hover:bg-blue-600" text="feedback" />
          <Button classname="bg-black px-6" text="help" />
        </div>
        <div className="userLogo text-white h-10 w-10 m-4 mr-8 hidden sm:block">
          <img src={user} alt="" />
        </div>
      </div>
    </div>
  );
}

export default TopNav;

