import React, { useEffect, useState } from "react";
import userIcon from "../../assets/user.png";
import ProgressBar from "./progressBar/ProgressBar";
import TimeBar from "./progressBar/TimeBar";
import { Link } from "react-router-dom";
import Status from "./Status";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../APIs/project";
import { addProject, fetchProject } from "../../context/projectSlice";
import MemberBox from "./memberBox/MemberBox";
import { BsThreeDots } from "react-icons/bs";
import ProjectSettings from "./ProjectSettings";

function ProjectItems({ searchQuery, projectSetting }) {

  const dispatch = useDispatch();

  const { isProjectSetting, setIsProjectSetting } = projectSetting
  let [projectList, setProjectList] = useState([]);

  let list = useSelector((state) => state.project.projectList);
  if(list.length > 0){
  console.log('have prject');
  console.log(list);}

  useEffect(() => {
    (async () => {
      if (list.length === 0) {
        list = await getAllProjects();
        console.log('got project');
        console.log(list);
        dispatch(fetchProject(list));
        let filteredList = list.filter((project) =>
          project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProjectList(filteredList);
      } else {
        let filteredList = list.filter((project) =>
          project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProjectList(filteredList);
      }
    })();
  }, [list, searchQuery]);


  const handleProjectClick = (e) => {
    if(e.target.classList.contains('no-click-action')) return;
    //NAVIGATE TO TASK
  }

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

  let memberList = [
    {
      id: 1,
      icon: userIcon,
      userName: "username",
    },
    {
      id: 2,
      icon: userIcon,
      userName: "username",
    },
    {
      id: 3,
      icon: userIcon,
      userName: "username",
    },
    {
      id: 4,
      icon: userIcon,
      userName: "username",
    },
    {
      id: 6,
      icon: userIcon,
      userName: "username",
    },
  ];

  return (
    <>
      {isProjectSetting && (
        <ProjectSettings setIsProjectSetting={setIsProjectSetting}/>
      )}
      {projectList.map((project) => (
        <div className="relative mb-3 px-5 sm:px-0 bg-[#2a2a3454] border-2 border-neutral-800 rounded-2xl" key={project.id}>

          <Link to={`/project/${project.id}`}
            key={project.id}
            className=" p-2 px-5 sm:grid grid-cols-5 relative"
            onClick={handleProjectClick}
          >

            <div className="text-white">
              <h2 className="truncate text-2xl overflow-hidden text-ellipsis whitespace-nowrap ">
                {project.projectName}
              </h2>

              <div className="flex mt-3 sm:mt-3 gap-4">
                <img src={userIcon} alt="" className="h-6 w-6 sm:h-6 sm:w-6" />
                <p className="text-slate-400 text-xl truncate overflow-hidden text-ellipsis whitespace-nowrap sm:text-xl relative -top-1">
                  {project.creator.userName}
                </p>
              </div>
            </div>

            <ProgressBar
              info={{
                total: project.TaskCount?.totalTask || 0,
                completed: project.TaskCount?.completedTask || 0,
              }}
            />
            <TimeBar
              info={{ startDate: project.startDate, endDate: project.endDate }}
            />
            <Status info={{ status: project.status }} />
            <div className="pt-5 sm:flex hidden">
              <MemberBox list={memberList} />
            </div>

            {/* LINK */}
          </Link>

            <div
              onClick={() => setIsProjectSetting(true)}
              className="text-white mt-1 p-2 text-2xl absolute top-7 cursor-pointer right-5 hidden sm:block"
            >
              <BsThreeDots />
            </div>
        </div>
      ))}
    </>
  );
}
// bg-[#26262A]

export default ProjectItems ;
