import React from "react";
import { BsChatLeftText } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { GrTask } from "react-icons/gr";
import { IoMdLogOut } from "react-icons/io";
import { RiContactsFill } from "react-icons/ri";
import "./sideNav.css";
import "../../App.css";
import {
  chatIcon,
  contactIcon,
  dashboardIcon,
  notifyIcon,
  taskIcon,
  logoutIcon,
  projectIcon,
} from "../../assets/icons/";
import CmpLogo from "../CmpLogo";

function SideNav({ setIsHovered, isHovered , isActive }) {
  const sideNavItems = [];
  const list = [
    {
      name: "Dashboard",
      icon: dashboardIcon,
    },
    {
      name: "Messagess",
      icon: chatIcon,
    },
    {
      name: "My Tasks",
      icon: taskIcon,
    },
    {
      name: "My Projects",
      icon: projectIcon,
    },
    {
      name: "Contect Us",
      icon: contactIcon,
    },
  ];
  return (
    <div
      className={`no-transition-class group py-4 rounded-xl flex flex-col justify-between transition-none h-full text-white`}
      onMouseEnter={(e) => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <div className="">
          <CmpLogo isHovered={isHovered}/>
      </div>


      <ul
        className=" ml-20 sm:ml-0 mb-8 flex flex-col gap-4 px-2"
      >

        <li className="hover:bg-gray-400 hover:bg-opacity-25 p-1 px-2 rounded-full">
          <Link to="/project/1" className="flex gap- transition-none">
            <div className="text-3xl ">
              <img
                src={notifyIcon}
                alt=""
                className="h-[1.75rem] w-[1.75rem]"
              />
            </div>
            <span className="sideNavEle sm:opacity-0 sm:absolute group-hover:opacity-100 left-12 text-md ml-2  pointer-events-none">
              Notifications
            </span>
          </Link>
        </li>


        {list &&
          list.map((item, index) => (
            <li
              key={index}
              className="hover:bg-gray-400 hover:bg-opacity-25 px-3 p-2 rounded-full"
            >
              <Link to="/" className="flex items-center">
                <div className={`text-3xl ${item.name}`}>
                  <img src={item.icon} alt="" className="h-6 w-6" />
                </div>
                <span
                  className={`sideNavEle sm:opacity-0 sm:absolute group-hover:opacity-100 left-12  text-md ml-2 pointer-events-none`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}

      </ul>


        <div className="hover:bg-gray-400 hover:bg-opacity-25 px-3 p-2 rounded-full">
          <Link to="/" className="flex transition-none">
            <div className=" ">
              <img src={logoutIcon} alt="" className="h-6 w-6" />
            </div>
            <span className="sideNavEle sm:opacity-0 sm:absolute group-hover:opacity-100 left-12 text-md ml-2 pointer-events-none">
              Logout
            </span>
          </Link>
        </div>
    </div>
  );
}

export default SideNav;
