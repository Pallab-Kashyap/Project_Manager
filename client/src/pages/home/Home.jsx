import React from 'react'
import TopNav from '../../components/topNav/TopNav'
import SideNav from '../../components/sideNav/SideNav'

function Home() {
    return (
        <div className='h-screen w-screen'> 
            <div className='h-fit w-screen text-white'>
                <TopNav />
                <div>
                    <SideNav />
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default Home
