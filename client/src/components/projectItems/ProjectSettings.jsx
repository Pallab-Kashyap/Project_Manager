import React from 'react'
import './projectItems.css'

function ProjectSettings({setIsProjectSetting}) {
    return (
        <div className='project-setting h-full w-96 absolute top-0 right-0 z-50  flex gap-3 transition-all'>
            <div 
            onClick={()=>{setIsProjectSetting(false)}}
            className='text-4xl text-white cursor-pointer'>X</div>
            <div className='bg-red-900 h-full flex-1'>feojoiwfje</div>
        </div>
    )
}

export default ProjectSettings
