import React, { useEffect, useState } from "react";
import TopNav from "../../components/topNav/TopNav";
import SideNav from "../../components/sideNav/SideNav";
import "../../App.css";
import "./Home.css";
import HomeContainer from "../../components/HomeContainer";
import { useSelector } from "react-redux";
import { getUser } from "../../context/userSlice";
import { useNavigate } from "react-router-dom";

function Home() {
  console.log("home comp renderd");

  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [displaySize, setDisplaySize] = useState(window.innerWidth);

  const user = useSelector((state) => state.user.user);
  console.log(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setDisplaySize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    if (displaySize > 690) setIsActive(false);

    return () => window.removeEventListener("resize", handleResize);
  }, [displaySize]);

  const topNavClick = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className="md:flex relative">
      <div
        className={`sideNavTansition w-full  sm:w-[4.2rem] h-screen ${
          isActive ? "block  z-50 absolute bg-black " : "hidden "
        } sm:block border-r-2 border-gray-600 sm:hover:w-52`}
      >
        <SideNav setIsHovered={setIsHovered} isHovered={isHovered} isActive={isActive} />
      </div>

      <div className="sm:flex flex-col flex-1">
        <div className="text-white">
          <TopNav info={{ topNavClick, isActive }} />
        </div>

        <div className={`flex-1 `}>
          <HomeContainer />
        </div>
      </div>
    </div>
  );
}

export default Home;
// if i have context in store of redux tool kit and i refresh the page will the data be lost or it will still be there
