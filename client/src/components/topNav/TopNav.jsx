import React, { useEffect, useState } from "react";
import user from "../../assets/user.png";
import Button from "../Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { GiCrossMark } from "react-icons/gi";
import '../createProject/createProject.css'

function TopNav({info}) {

   let {topNavClick, isActive} = info

   const navigate = useNavigate()
   const [isFeedback, setIsFeedback] = useState(false);
   const [feedbackText, setFeedbackText] = useState('');
   const [feedbackEmoji, setFeedbackEmoji] = useState(null)

   useEffect(() => {
    setFeedbackEmoji(null)
    setFeedbackText('')
   },[isFeedback])

   window.addEventListener('click', (e) => {
    if(e.target.classList.contains('feedback-btn')) return
    if(!e.target.classList.contains('feedback-box')) setIsFeedback(false)
   })

   const feedbackClick = () => {
    setIsFeedback(prev => !prev)
   }
   const handleEmojiClick = (e) => {
    setFeedbackEmoji(e.target.value)
   }
   const sendFeedback = () => {
    setIsFeedback(false)
   }
   const helpClick = () => {
    navigate('/')
   }

  return (
    <div className="bg-neutral-60 py-3 px-10  border-b-2 border-gray-600  flex sm:justify-between">
      
      {/* navBar for mabile */}
      <div className="mobileNave sm:hidden p-3 text-2xl flex justify-center items-center"
        onClick={topNavClick}
      >
        {isActive ? <GiCrossMark /> : <FaBarsStaggered />}
      </div>

      {/* nabBar for web */}

      <div className="sm:">
        <p className="text-2xl">project</p>
      </div>

      {/* nav actions */}
      <div className="pageNav hidden sm:block ">
        <ul className="flex gap-8 pt-2 text-sm text-gray-300 ">
          <li className="group hover:text-white">
            <NavLink to="/">Home</NavLink>
            <div className="topNavLink rounded-full h-1 w-0 group-hover:w-full transition-all relative"></div>
          </li>
          <li className="group hover:text-white">
            <NavLink to="/">About</NavLink>
            <div className="topNavLink rounded-full h-1 w-0 group-hover:w-full transition-all "></div>
          </li>
          <li className="group hover:text-white">
            <NavLink to="/">Pricing</NavLink>
            <div className="topNavLink rounded-full h-1 w-0 group-hover:w-full transition-all "></div>
          </li>
          <li className="group hover:text-white">
            <NavLink to="/">Leaderboard</NavLink>
            <div className="topNavLink rounded-full h-1 w-0 group-hover:w-full transition-all "></div>
          </li>
        </ul>
      </div>

      {/* user support */}
      <div className="sm:flex hidden relative">
        <div className="feedback flex gap-4 mr-7 items-center ">
          <Button classname="feedback-btn bg-transparent text-neutral-300 hover:text-gray-100 hover:bg-neutral-800 border-2 border-neutral-700 px-3 py-1 align-middle" text="Feedback" onClick={feedbackClick} />
          <Button classname="bg-transparent text-neutral-300 hover:text-neutral-100  border-neutral-700 " text="Help" onClick={helpClick}/>

          {/* FEEDBACK */}
          {isFeedback ? 
            <div className="feedback-box h-fit z-50 w-72 bg-black absolute p-2 top-12 -left-20 rounded-md border-2 border-gray-500">
              <textarea name="" id="" 
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.currentTarget.value)}
                placeholder="Your feedback..."
                className="feedback-box h-28 w-full text-white p-2 bg-transparent outline-none none border-2 border-gray-200 rounded-md no-underline" 
              ></textarea>
              <div className="feedback-box flex justify-between pt-3">
              <div
                className="feedback-box flex text-2xl gap-1 px-1 cursor-pointer items-center"
              >
                <option onClick={handleEmojiClick} value={1}
                  className={`feedback-box ${feedbackEmoji == 1 ? 'border-2 border-green-500 h-fit w-fit rounded-full' : ''}`}
                >😄</option>
                <option onClick={handleEmojiClick} value={2}
                  className={`feedback-box ${feedbackEmoji == 2 ? 'border-2 border-blue-500 h-fit w-fit rounded-full' : ''}`}
                >😊</option>
                <option onClick={handleEmojiClick} value={3}
                 className={`feedback-box ${feedbackEmoji == 3 ? 'border-2 border-yellow-500 h-fit w-fit rounded-full' : ''}`}
                >😗</option>
                <option onClick={handleEmojiClick} value={4}
                 className={`feedback-box ${feedbackEmoji == 4 ? 'border-2 border-orange-500 h-fit w-fit rounded-full' : ''}`}
                >😑</option>
                <option onClick={handleEmojiClick} value={5}
                 className={`feedback-box ${feedbackEmoji == 5 ? 'border-2 border-red-600 h-fit w-fit rounded-full' : ''}`}
                >😞</option>
              </div>
                
                 <button
                  onClick={sendFeedback}
                  className="px-4 py-[6px] align-middle hover:border-gray-200 border-2 border-gray-500 rounded-lg"
                 >send</button>  
                     
              </div>
            </div>
          : null}

        </div>
        <div className="userLogo text-white h-9 w-9 ml-3 hidden sm:block">
          <img src={user} alt="" className="" />
        </div>
      </div>

    </div>
  );
}

export default TopNav;

