import React, { useState } from "react";
import user from "../../assets/user.png";
import Button from "../Button";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { GiCrossMark } from "react-icons/gi";
import '../createProject/createProject.css'

function TopNav({info}) {

   let {topNavClick, isActive} = info

   const [isFeedback, setIsFeedback] = useState(true);
   const [feedbackText, setFeedbackText] = useState('');
   const [feedbackEmoji, setFeedbackEmoji] = useState(1)

   const feedbackClick = () => {
    setIsFeedback(true)
   }
   const handleEmojiClick = (e) => {
    setFeedbackEmoji(e.target.value)
   }

  return (
    <div className="bg-neutral-60 py-2 rounded-full border-2 border-gray-600 h-fit  flex sm:justify-between">
      
      {/* navBar for mabile */}
      <div className="mobileNave sm:hidden p-3 text-2xl flex justify-center items-center"
        onClick={topNavClick}
      >
        {isActive ? <GiCrossMark /> : <FaBarsStaggered />}
      </div>

      {/* nabBar for web */}
      <div className="LOGO  flex px-4 py-2 sm:ml-5">
        <div className="h-8 w-8">
          <img src={user} alt="" />
        </div>
        <p className="px-3 pt-px">project</p>
      </div>

      {/* nav actions */}
      <div className="pageNav hidden sm:block py-[10px]">
        <ul className="flex gap-10">
          <li className="group">
            <NavLink to="/">Home</NavLink>
            <div className="topNavLink rounded-full h-1 w-0 group-hover:w-full transition-all "></div>
          </li>
          <li className="group">
            <NavLink to="/">About</NavLink>
            <div className="topNavLink rounded-full h-1 w-0 group-hover:w-full transition-all "></div>
          </li>
          <li className="group">
            <NavLink to="/">Pricing</NavLink>
            <div className="topNavLink rounded-full h-1 w-0 group-hover:w-full transition-all "></div>
          </li>
          <li className="group">
            <NavLink to="/">Leaderboard</NavLink>
            <div className="topNavLink rounded-full h-1 w-0 group-hover:w-full transition-all "></div>
          </li>
        </ul>
      </div>

      {/* user support */}
      <div className="sm:flex hidden relative">
        <div className="feedback flex gap-3 mr-4 items-center ">
          <Button classname="bg-blue-500 hover:bg-blue-600 px-4 py-1" text="feedback" onClick={feedbackClick} />
          <Button classname="hover:border-gray-200 border-2 border-gray-500  px-6  py-1" text="help" />
          {isFeedback ? 
            <div className="h-44 z-50 w-72 bg-neutral-800 absolute p-2 top-12 -left-16 rounded-md">
              <textarea name="" id="" 
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.currentTarget.value)}
                className="h-3/4 w-full text-white p-2 bg-transparent outline-none none border-2 border-gray-500 rounded-md no-underline" 
              ></textarea>
              <div className="flex justify-between">
              <div
                className="flex text-2xl gap-1 px-1 cursor-pointer"
              >
                <option onClick={handleEmojiClick} value={1}
                  className={`${feedbackEmoji == 1 ? 'border-2 border-green-500 h-fit w-fit rounded-full' : ''}`}
                >😄</option>
                <option onClick={handleEmojiClick} value={2}
                  className={`${feedbackEmoji == 2 ? 'border-2 border-blue-500 h-fit w-fit rounded-full' : ''}`}
                >😊</option>
                <option onClick={handleEmojiClick} value={3}
                 className={`${feedbackEmoji == 3 ? 'border-2 border-yellow-500 h-fit w-fit rounded-full' : ''}`}
                >😗</option>
                <option onClick={handleEmojiClick} value={4}
                 className={`${feedbackEmoji == 4 ? 'border-2 border-orange-500 h-fit w-fit rounded-full' : ''}`}
                >😑</option>
                <option onClick={handleEmojiClick} value={5}
                 className={`${feedbackEmoji == 5 ? 'border-2 border-red-600 h-fit w-fit rounded-full' : ''}`}
                >😞</option>
              </div>
                <div>
                 <button
                  className="px-3 py-1 border-2 border-gray-500 rounded-lg"
                 >send</button>  
                </div>         
              </div>
            </div>
          : null}
        </div>
        <div className="userLogo  text-white h-9 w-9 mx-4 mt-1 mr-8 hidden sm:block">
          <img src={user} alt="" />
        </div>
      </div>

    </div>
  );
}

export default TopNav;

