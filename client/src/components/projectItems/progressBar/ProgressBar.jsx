import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
//progress icons
import { RiProgress1Line } from "react-icons/ri";
import { RiProgress3Line } from "react-icons/ri";
import { RiProgress4Line } from "react-icons/ri";
import { RiProgress6Line } from "react-icons/ri";
import { RiProgress8Line } from "react-icons/ri";
//
import "./Progress.css";

function ProgressBar({ info }) {
  const percentage = (info.completed / info.total) * 100;
  let width = `${percentage}%`;

  let color = "text-green-500";
  let bg = "bg-green-500";
  let icon = <TiTick />;

  if (percentage < 25) {
    color = "text-red-500";
    bg = "bg-red-500";
    icon = <RiProgress1Line />;
  } else if (percentage < 50) {
    color = "text-orange-500";
    bg = "bg-orange-500";
    icon = <RiProgress3Line />;
  } else if (percentage < 75) {
    color = "text-yellow-500";
    bg = "bg-yellow-500";
    icon = <RiProgress4Line />;
  } else if (percentage < 100) {
    color = "text-green-500";
    bg = "bg-green-500";
    icon = <RiProgress6Line />;
  }

  if (info.total === 0) {
    color = "text-gray-500";
    icon = <RiProgress1Line />;
    width = "0%";
  }

  width = '100%'

  return (
    <div className="progressBar hidden sm:block px-2 mt-3 group ">
      <div className="flex gap-3 mt-4">
        <div className={`${color} text-xl `}>{icon}</div>
        <div className="w-full  p-1 border-2 border-gray-500 rounded-full ">
          <div
            className={`${bg} h-2 sm:mt-[0.2px]  rounded-full ${
              percentage === 100 ? "completed" : ""
            }`}
            style={{ width }}
          ></div>
        </div>
      </div>
      <div className="flex justify-center">
      <button   
      onClick={(e) => {
        console.log('btn')}}
      className="mt-1 hidden group-hover:block text-slate-400 hover:text-gray-200 text-sm">
        {info.total === 0
          ? "Add Task"
          : percentage === 100
          ? "completed 🎉"
          : `Task: ${info.completed}/${info.total}`}
      </button>
    </div>
    </div>
  );
}

export default ProgressBar;
