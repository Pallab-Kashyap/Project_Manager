import React, { useEffect, useState } from "react";
import ProjectControl from "./Navs/ProjectControl";
import STATUS, { PRIORITIES } from "../../utils/enum";
import ProjectNav from "./Navs/ProjectNav";
import ProjectItems from "../projectItems/ProjectItems";

function ProjectContainer() {

    const [searchQuery, setSearchQuery] = useState('')
    const [projectSetting, setIsProjectSetting] = useState(false)

    const projectDtls = {
        projectName: 'project-1',
        taskList: [
            { 
                name: 'task-1',
                id: 1,
                startDate: new Date(),
                endDate: new Date(),
                status: STATUS.IN_PROGRESS,
                priority: PRIORITIES.HIGH,
                members: []
            },
            { 
                name: 'task-1',
                id: 2,
                startDate: new Date(),
                endDate: new Date(),
                status: STATUS.IN_PROGRESS,
                priority: PRIORITIES.HIGH,
                members: []
            },
        ]
    }

    return (
        <div className='bg-green'>

            {/* PRJECT DETAILS AND CONTORL */}
            <div className="text-white">
                <ProjectControl projectDtls={projectDtls}/>
            </div>


            {/* PROJECT NAV */}
            <div>
                <ProjectNav search={{searchQuery, setSearchQuery}}/>
            </div>


            {/* PROJECT ITEMS */}
            <div className="px-16 py-10">
                <ProjectItems searchQuery={searchQuery} projectSetting={{projectSetting, setIsProjectSetting}}/>
            </div>
        </div>
    )
}

export default ProjectContainer
