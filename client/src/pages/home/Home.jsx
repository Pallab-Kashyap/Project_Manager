import React, { useEffect, useState } from "react";
import TopNav from "../../components/topNav/TopNav";
import SideNav from "../../components/sideNav/SideNav";
import "../../App.css";
import "./Home.css"
import HomeContainer from "../../components/HomeContainer";
import { useSelector } from "react-redux";
import { getUser } from "../../context/userSlice";
import { useNavigate } from "react-router-dom";

function Home() {

  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [displaySize, setDisplaySize] = useState(window.innerWidth)

  const user = useSelector(state => state.user.user)
  const navigate = useNavigate()
  
  useEffect(() => {
    
    if(!user){
      navigate('/login')
    }
  },[])
  


  useEffect(()=>{
    const handleResize = () => setDisplaySize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    if(displaySize > 690) setIsActive(false)
 
    return () => window.removeEventListener('resize', handleResize);

  },[displaySize])

  const topNavClick = () => {
    setIsActive(prev => !prev)

  }

  return (
    <div className="h-screen md:flex md:flex-col relative">
      <div className=" pt-2 px-2 text-white">
        <TopNav info={{topNavClick, isActive}}/>
      </div>
      <div className="sm:flex flex-1">
        <div className={`sideNavTansition w-full  sm:w-20  ${isActive ? 'block  z-50 absolute bg-black ' : 'hidden '} sm:block border-r-2 border-gray-600 sm:hover:w-64`}>
          <SideNav setIsHovered={setIsHovered} isActive={isActive}/>
        </div>
        <div className={`flex-1 `}>
            <HomeContainer />
        </div>
      </div>
    </div>
  );
}

export default Home;
