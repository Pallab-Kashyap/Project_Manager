import React, { useEffect, useState } from 'react'
import logo from '../../assets/user.png'
import ProgressBar from './progressBar/ProgressBar'
import TimeBar from './progressBar/TimeBar'
import { Link } from 'react-router-dom'
import Status from './Status'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjects } from '../../APIs/project'
import { addProject, fetchProject } from '../../context/projectSlice'

function ProjectContainer() {

    const dispatch = useDispatch()

    let [projectList, setProjectList] = useState([])

    let list = useSelector(state => state.project.projectList);
    
useEffect(() => {
    ( async () => {
        if(list.length === 0){
           list = await getAllProjects()
           dispatch(fetchProject(list))
           setProjectList(list)
        }
        else{
            setProjectList(list)
        }
})();
},[list])

// console.log(projectList);



// return
//     const projectList = [{
//         id: 1,
//         projectName: 'Project One',
//         creatorName: 'creator one',
//         creatorId: 1,
//         startDate: new Date(2024, 8, 1),
//         endDate: new Date('Thur Sep 04 2024 16:48:04 GMT+0530'),
//         status: 'In Progress',
//         totalTask: 10,
//         completedTask: 10,
//     },
//     {
//         id: 2,
//         projectName: 'Project One',
//         creatorName: 'creator one',
//         creatorId: 1,
//         startDate: new Date(2024, 7, 21),
//         endDate: new Date(2024, 9, 15),
//         status: 'On Hold',
//         totalTask: 10,
//         completedTask: 4,
//     },
//     {
//         id: 3,
//         projectName: 'Project One',
//         creatorName: 'creator one',
//         creatorId: 1,
//         startDate: new Date(2024, 7, 21),
//         endDate: new Date(2024, 11, 13),
//         status: 'Not Started',
//         totalTask: 10,
//         completedTask: 4,
//     },
//     {
//         id: 4,
//         projectName: 'Project One',
//         creatorName: 'creator one',
//         creatorId: 1,
//         startDate: new Date(2024, 7, 21),
//         endDate: new Date('Thur Sep 04 2024 16:48:04 GMT+0530'),
//         status: 'In Progress',
//         totalTask: 10,
//         completedTask: 4,
//     },
//     {
//         id: 5,
//         projectName: 'Project One',
//         creatorName: 'creator one',
//         creatorId: 1,
//         startDate: new Date(2024, 7, 21),
//         endDate: new Date(2024, 9, 5),
//         status: 'In Progress',
//         totalTask: 10,
//         completedTask: 4,
//     },
//     {
//         id: 6,
//         projectName: 'Project One',
//         creatorName: 'creator one',
//         creatorId: 1,
//         startDate: new Date(2024, 7, 21),
//         endDate: new Date(2024, 11, 1),
//         status: 'In Progress',
//         totalTask: 10,
//         completedTask: 4,
//     },
//     {
//         id: 7,
//         projectName: 'Project One',
//         creatorName: 'creator one',
//         creatorId: 1,
//         startDate: new Date(2024, 7, 21),
//         endDate: new Date('Thur Sep 04 2024 16:48:04 GMT+0530'),
//         status: 'In Progress',
//         totalTask: 10,
//         completedTask: 4,
//     },
//     {
//         id: 8,
//         projectName: 'Project One',
//         creatorName: 'creator one',
//         creatorId: 1,
//         startDate: new Date(2024, 7, 21),
//         endDate: new Date('Thur Sep 04 2024 16:48:04 GMT+0530'),
//         status: 'In Progress',
//         totalTask: 10,
//         completedTask: 4,
//     },
// ]

    return (
        <>
        {
           projectList.map((project) => (
        <Link to='/' key={project.id}
        className='h-full'>
                    <div className='bg-[#2a2a349a] border-2 border-gray-700 shadow-md shadow-white/15 p-5 mb-3 rounded-3xl sm:grid grid-cols-5' key={project.id}>
                        <div className='text-white col-span-2 '>
                            <h1 className=' text-xl sm:text-4xl'>{project.projectName}</h1>
                            <div className='flex sm:mt-4 gap-3'>
                                <img src={logo} alt="" className='h-8 w-8 hidden sm:block'/>
                                <p className='text-slate-400 text-2xl'>{project.creator.userName}</p>
                            </div>
                        </div>
                        <ProgressBar info={{total: project.TaskCount?.totalTask || 0, completed: project.TaskCount?.completedTask || 0}}/>
                        <TimeBar info={{startDate: project.startDate, endDate: project.endDate}}/>
                        <Status info={{status: project.status}}/>
                    </div>
        </Link>
                ))
            }
            </>
    )
}
// bg-[#26262A]

export default ProjectContainer
