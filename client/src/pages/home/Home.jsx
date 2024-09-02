import React, { useState } from "react";
import TopNav from "../../components/topNav/TopNav";
import SideNav from "../../components/sideNav/SideNav";
import "../../App.css";
import "./Home.css"
import HomeContainer from "../../components/HomeContainer";

function Home() {

  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="h-screen  flex flex-col relative">
      <div className=" text-white">
        <TopNav />
      </div>
      <div className="w-full flex-1 flex">
        <div className={`sideNavContainer w-28    absolute ${isHovered ? 'hovered' : ''}`}>
          <SideNav setIsHovered={setIsHovered}/>
        </div>
        <div className="homeContainer  border-l-2 border-gray-600 flex-1 ml-32">
            <HomeContainer />
        </div>
      </div>
    </div>
  );
}

export default Home;
