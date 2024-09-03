import React, { useState } from "react";
import TopNav from "../../components/topNav/TopNav";
import SideNav from "../../components/sideNav/SideNav";
import "../../App.css";
import "./Home.css"
import HomeContainer from "../../components/HomeContainer";

function Home() {

  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const topNavClick = () => {
    setIsActive(prev => !prev)
    console.log('davaya');
  }

  return (
    <div className="h-screen overflow-y-hidden md:flex md:flex-col relative">
      <div className=" text-white">
        <TopNav info={{topNavClick, isActive}}/>
      </div>
      <div className="w-full h-full md:flex">
        <div className={`sideNavContainer w-28 h-full hidden sm:block border-r-2 border-gray-600 absolute ${isHovered ? 'hovered' : ''}`}>
          <SideNav setIsHovered={setIsHovered} isActive={isActive}/>
        </div>
        <div className="homeContainer flex-1 sm:ml-32">
            <HomeContainer />
        </div>
      </div>
    </div>
  );
}

export default Home;
