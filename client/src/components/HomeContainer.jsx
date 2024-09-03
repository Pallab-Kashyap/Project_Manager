import React from 'react'
import SearchBar from './SearchBar'
import Button from './Button'
import '../pages/home/Home.css'
import ProjectContainer from './projectContainer/ProjectContainer'

function HomeContainer() {
    return (
        <div className=' flex flex-col'>
            <div>
            <div className=' m-2 sm:m-8 sm:mx-12 sm:px-16'>
                <SearchBar />
            </div>
            <div className='flex bg-gray-40 sm:px-16 sm:mx-16 justify-between'>
                <div className='flex ml-8 sm:ml-0 font-medium'>
                <Button classname='bg-gray-500 py-2 w-24  sm:px-6' text='sort' />
                <Button classname='bg-gray-500 py-2 w-24 sm:px-6 ml-2 sm:ml-5' text='filter' />
                </div>
                <Button classname='createPrjt absolute sm:relative bottom-6 right-4 sm:bottom-auto sm:right-auto text-white py-2 px-6 sm:ml-96 text-xl font-semibold' text='Create Project' />
            </div>
        </div>
        <div className='  flex-1 sm:mx-16 sm:mt-10 p-4 rounded-xl overflow-y-scroll'>
            <ProjectContainer />
        </div>
    </div>
    )
}

export default HomeContainer
