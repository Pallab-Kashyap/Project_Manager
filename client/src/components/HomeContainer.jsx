import React from 'react'
import SearchBar from './SearchBar'
import Button from './Button'
import '../pages/home/Home.css'
import ProjectContainer from './projectContainer/ProjectContainer'

function HomeContainer() {
    return (
        <div className='flex flex-col'>
            <div>
            <div className='m-8 mx-12 px-16'>
                <SearchBar />
            </div>
            <div className='flex bg-gray-40 px-16 mx-16 justify-between'>
                <div>
                <Button classname='bg-gray-500 py-2 px-6' text='sort' />
                <Button classname='bg-gray-500 py-2 px-6 ml-5' text='filter' />
                </div>
                <Button classname='createPrjt text-white py-2 px-6 ml-96 text-xl font-semibold' text='Create Project' />
            </div>
        </div>
        <div className=' bg-[#26262A] flex-1 mx-16 mt-10 p-5 rounded-xl'>
            <ProjectContainer />
        </div>
    </div>
    )
}

export default HomeContainer
