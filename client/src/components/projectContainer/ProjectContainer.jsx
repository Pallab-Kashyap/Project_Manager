import React from 'react'
import logo from '../../assets/user.png'
import ProgressBar from './progressBar/ProgressBar'
import TimeBar from './progressBar/TimeBar'
import { Link } from 'react-router-dom'
import Status from './Status'

function ProjectContainer() {

    const projectList = [{
        id: 1,
        projectName: 'Project One',
        creatorName: 'creator one',
        creatorId: 1,
        startDate: new Date(2024, 8, 1),
        endDate: new Date('Thur Sep 04 2024 16:48:04 GMT+0530'),
        status: 'In Progress',
        totalTask: 10,
        completedTask: 10,
    },
    {
        id: 2,
        projectName: 'Project One',
        creatorName: 'creator one',
        creatorId: 1,
        startDate: new Date(),
        endDate: new Date('Thur Sep 04 2024 16:48:04 GMT+0530'),
        status: 'In Progress',
        totalTask: 10,
        completedTask: 4,
    }
]

    return (
        <Link to='/' 
        className='h-full '>
            {
                projectList.map((project) => (
                    <div className='bg-[#26262A] p-5 mb-3 rounded-3xl sm:grid grid-cols-5' key={project.id}>
                        <div className='text-white '>
                            <h1 className=' text-xl sm:text-4xl'>{project.projectName}</h1>
                            <div className='flex sm:mt-4 gap-3'>
                                <img src={logo} alt="" className='h-8 w-8 hidden sm:block'/>
                                <p className='text-slate-400'>{project.creatorName}</p>
                            </div>
                        </div>
                        <ProgressBar info={{total: project.totalTask, completed: project.completedTask}}/>
                        <TimeBar info={{startDate: project.startDate, endDate: project.endDate}}/>
                        <Status info={{status: project.status}}/>
                    </div>
                ))
            }
        </Link>
    )
}

export default ProjectContainer
