import React from "react";
import user from "../../assets/user.png";
import Button from "../Button";
import { Link, NavLink } from "react-router-dom";

function TopNav() {
  return (
    <div className="bg-neutral-600 h-fit  flex justify-between">
      <div className="LOGO flex p-4 ml-5">
        <div className="h-10 w-10">
          <img src={user} alt="" />
        </div>
        <p className="px-4 pt-1">project</p>
      </div>
      <div className="pageNav p-5">
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
      <div className="flex">
        <div className="feedback flex gap-3 mr-4 items-center">
          <Button classname="bg-blue-500 hover:bg-blue-600" text="feedback" />
          <Button classname="bg-black px-6" text="help" />
        </div>
        <div className="userLogo text-white h-10 w-10 m-4 mr-8">
          <img src={user} alt="" />
        </div>
      </div>
    </div>
  );
}

export default TopNav;
