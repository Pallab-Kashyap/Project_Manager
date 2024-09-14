import React from 'react'
import { BsChatLeftText } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { GrTask } from "react-icons/gr";
import { IoMdLogOut } from "react-icons/io";
import { RiContactsFill } from "react-icons/ri";
import './sideNav.css'
import '../../App.css'
import { chatIcon, contactIcon, dashboardIcon, notifyIcon, taskIcon, logoutIcon } from '../../assets/icons/'

function SideNav({setIsHovered, isActive}) {
    const sideNavItems =[]
    const list = [
        {
        name: 'Dashboard',
        icon: dashboardIcon
    },
        {
        name: 'Messagess',
        icon: chatIcon
    },
        {
        name: 'My Tasks',
        icon: taskIcon
    },
        {
        name: 'Contect Us',
        icon: contactIcon
    },
    //     {
    //     name: 'Logout',
    //     icon: logoutIcon
    // },
]
    return (
        <div className={`no-transition-class group h-full py-6 rounded-xl transition-none px-2 text-white `}>
            <ul className=' ml-20 sm:ml-0 px-1 py-1 mt-5 flex flex-col gap-6 h-full'
                onMouseEnter={()=>setIsHovered(true)}
                onMouseLeave={()=>setIsHovered(false)}
            >
            <li className='hover:bg-gray-400 hover:bg-opacity-25 p-2 rounded-full'>
                    <Link to='/'
                        className='flex gap-4 transition-none'
                    >
                    
                        <div className='text-3xl '>
                            <img src={notifyIcon} alt="" className='h-[38px] w-[40px]'/>
                        </div>                     
                        <span 
                        className='sm:hidden group-hover:block text-xl ml-2 mt-1  '>
                            Notifications</span>
                    </Link>
                </li>
                { list && list.map((item, index) => (
                <li key={index} className='hover:bg-gray-400 hover:bg-opacity-25 px-3 p-2 rounded-full'>
                    <Link to='/'
                        
                        className='flex gap-6 items-center'
                    >
                        <div className={`text-3xl ${item.name}`}>
                            <img src={item.icon} alt=""  />
                        </div>                     
                        <span 
                        className={`sm:hidden group-hover:block  text-xl ml-2 relative top-[-2px]`}>
                            {item.name}</span>
                    </Link>
                </li>
                ))}
                    <li className='hover:bg-gray-400 hover:bg-opacity-25 mt-auto mb-5 px-3 p-2 rounded-full'>
                    <Link to='/'
                        className='flex gap-4 transition-none'
                    >
                    
                        <div className='text-3xl '>
                            <img src={logoutIcon} alt="" />
                        </div>                     
                        <span 
                        className='sm:hidden group-hover:block text-xl ml-2 mt-1  '>
                            Logout</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default SideNav
