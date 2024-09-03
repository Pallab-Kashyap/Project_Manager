import React, { useEffect, useState } from "react";
import TopNav from "../../components/topNav/TopNav";
import SideNav from "../../components/sideNav/SideNav";
import "../../App.css";
import "./Home.css"
import HomeContainer from "../../components/HomeContainer";

function Home() {

  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [displaySize, setDisplaySize] = useState(window.innerWidth)

  useEffect(()=>{
    const handleResize = () => setDisplaySize(window.innerWidth);

    window.addEventListener('resize', handleResize);
    console.log(displaySize);
    if(displaySize > 690) setIsActive(false)
 
    return () => window.removeEventListener('resize', handleResize);

  },[displaySize])

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
        <div className={` w-full h-3/4 sm:w-28 sm:h-full ${isActive ? 'block  z-10' : 'hidden sideNavContainer'} sm:block border-r-2 border-gray-600 absolute ${isHovered ? 'hovered' : ''}`}>
          <SideNav setIsHovered={setIsHovered} isActive={isActive}/>
        </div>
        <div className={`homeContainer flex-1 sm:ml-32 ${isActive ? 'opacity-10' : ''}`}>
            <HomeContainer />
        </div>
      </div>
    </div>
  );
}

export default Home;
