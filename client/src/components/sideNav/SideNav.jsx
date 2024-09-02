import React from 'react'
import { BsChatLeftText } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { GrTask } from "react-icons/gr";
import { IoMdLogOut } from "react-icons/io";
import { RiContactsFill } from "react-icons/ri";
import './sideNav.css'
import { chatIcon, contactIcon, dashboardIcon, notifyIcon, taskIcon, logoutIcon } from '../../assets/icons/'

function SideNav() {
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
        <div className='h-fit w-fit py-8 px-2 fixed top-40 rounded-xl overflow-hidden'>
            <ul className='group px-6 py-3 flex flex-col gap-10'>
            <li>
                    <Link to='/'
                        className='flex gap-3 items-center'
                    >
                    
                        <div className='text-3xl '>
                            <img src={notifyIcon} alt="" className='h-[38px] w-[40px] self-end'/>
                        </div>                     
                        <span 
                        className='hidden group-hover:block text-xl ml-2 relative top-[-2px] '>
                            Notifications</span>
                    </Link>
                </li>
                { list && list.map((item, index) => (
                <li key={index}>
                    <Link to='/'
                        
                        className='flex gap-5 items-center'
                    >
                        <div className={`text-3xl ${item.name}`}>
                            <img src={item.icon} alt="" />
                        </div>                     
                        <span 
                        className='hidden group-hover:block text-xl ml-2 relative top-[-2px]'>
                            {item.name}</span>
                    </Link>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default SideNav
