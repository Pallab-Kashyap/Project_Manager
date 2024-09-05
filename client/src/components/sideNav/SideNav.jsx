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
        {
        name: 'Logout',
        icon: logoutIcon
    },
]
    return (
        <div className={`sidenav h-fit w-fit py-6 px- fixed sm:top-40 rounded-xl overflow-hidden text-white ${isActive ? '' : ''}`}>
            <ul className='group ml-20 sm:ml-0 px-4 py-1 flex flex-col items-center gap-6'
                onMouseEnter={()=>setIsHovered(true)}
                onMouseLeave={()=>setIsHovered(false)}
            >
            <li className='hover:bg-gray-400 hover:bg-opacity-25 p-2 pl-3 pr-16 rounded-full'>
                    <Link to='/'
                        className='flex gap-4 items-center'
                    >
                    
                        <div className='text-3xl '>
                            <img src={notifyIcon} alt="" className='h-[38px] w-[40px] self-end'/>
                        </div>                     
                        <span 
                        className='sm:hidden group-hover:block text-xl ml-2 relative top-[-2px] '>
                            Notifications</span>
                    </Link>
                </li>
                { list && list.map((item, index) => (
                <li key={index} className='hover:bg-gray-400 hover:bg-opacity-25 p-2 pl-3 pr-16 rounded-full'>
                    <Link to='/'
                        
                        className='flex gap-6 items-center'
                    >
                        <div className={`text-3xl ${item.name}`}>
                            <img src={item.icon} alt="" />
                        </div>                     
                        <span 
                        className={`sm:hidden group-hover:block text-xl ml-2 relative top-[-2px]`}>
                            {item.name}</span>
                    </Link>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default SideNav
