import React, { useEffect, useState } from "react";
import user from "../../../assets/user.png";
import Button from "../../Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { GiCrossMark } from "react-icons/gi";
import "../../createProject/createProject.css";
import SearchBar from "../../SearchBar";

function ProjectNav({search}) {
  const navigate = useNavigate();
  const [isFeedback, setIsFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackEmoji, setFeedbackEmoji] = useState(null);
  const {searchQuery, setSearchQuery} = search;

  useEffect(() => {
    setFeedbackEmoji(null);
    setFeedbackText("");
  }, [isFeedback]);

  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("feedback-btn")) return;
    if (!e.target.classList.contains("feedback-box")) setIsFeedback(false);
  });

  const feedbackClick = () => {
    setIsFeedback((prev) => !prev);
  };
  const handleEmojiClick = (e) => {
    setFeedbackEmoji(e.target.value);
  };
  const sendFeedback = () => {
    setIsFeedback(false);
  };
  const helpClick = () => {
    navigate("/");
  };

  let options = [
    {
      option: "Tasks",
      to: "/",
    },
    {
      option: "Documents",
      to: "/",
    },
    {
      option: "Kanban",
      to: "/",
    },
    {
      option: "Analytics",
      to: "/",
    },
    {
      option: "Leaderboard",
      to: "/",
    },
    {
      option: "Overview",
      to: "/",
    },
    {
      option: "Members",
      to: "/",
    },
  ];

  return (
    <div className="bg-neutral-60 py-2 px-16 text-white border-b-2 border-gray-600 flex justify-between ">
      {/* nav actions */}
      <div className=" hidden sm:block py-[10px] ">
        <ul className="flex gap-8 text-lg text-gray-30 ">
          {options.map((opt) => (
            <li className="group " key={opt.option}>
              <NavLink to={opt.to} className="text-gray-300 group-hover:text-white">
                {opt.option}
              </NavLink>
              <div className="topNavLink rounded-full h-1 w-0 group-hover:w-full transition-all"></div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex ml-8 sm:ml-0 font-medium sm:gap-3 gap-4 items-center">
            <Button classname="py-px px-5 border-2 border-gray-500 text-neutral-300 " text="sort" />
            <Button
              classname="py-px px-5 border-2 border-gray-500 text-neutral-300"
              text="filter"
            />
            <SearchBar props={{ searchQuery, setSearchQuery }} />
          </div>

      {/* user support */}
      {/* <div className="sm:flex hidden relative">
        <div className="feedback flex gap-3 mr-4 items-center ">
          <Button classname="feedback-btn bg-transparent text-neutral-300 hover:text-gray-100 hover:bg-neutral-800 border-2 border-neutral-700 px-4 py-1" text="Feedback" onClick={feedbackClick} />
          <Button classname="bg-transparent text-neutral-300 hover:text-neutral-100  border-neutral-700  px-4  py-1" text="Help" onClick={helpClick}/>

        </div>
      </div> */}
    </div>
  );
}

export default ProjectNav;
