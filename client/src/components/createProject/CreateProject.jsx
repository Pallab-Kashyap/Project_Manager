import React, { useEffect, useState } from "react";
import "./createProject.css";
import { GiCrossMark } from "react-icons/gi";
import DropDown from "../DropDown";
import SelectDate from "./SelectDate";
import STATUS from "../../utils/enum";
import AddMember from "./AddMember";
import Button from "../Button";
import { createProject } from '../../APIs/project'
import { useDispatch } from "react-redux";
import { addProject, fetchProject } from "../../context/projectSlice";

function CreateProject({ info }) {
  const { isCreateProject, setIsCreateProject } = info;

  const dispatch = useDispatch();

  //PROJECT DATA
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("STATUS");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();
  let [members, setMembers] = useState([]);
  const [admins, setAdmins] = useState([]);

  const [force, setForce] = useState(false);

  const [visibility, setVisbility] = useState(true);
  useEffect(() => {
    setVisbility(true);
    setStatus("STATUS");
    setStartDate(new Date());
    setEndDate(new Date(new Date().setDate(new Date().getDate() + 2)));
    setMembers([]);
    setAdmins([])
    setForce((prev) => !prev);
  }, [info]);

  const clearState = () => {
    setProjectName("");
    setDescription("");
    setIsCreateProject(false);
  };

  //CREATING PROJECT
  const createProjectClick = async () => {
    if (!isCreateProject) return setIsCreateProject((prev) => !prev);
    let newStatus = status
    if(newStatus === 'STATUS'){
      if(startDate > new Date()) newStatus = STATUS.NOT_STARTED
      else newStatus = STATUS.IN_PROGRESS
    }

    console.log(startDate);
    console.log(endDate);
    console.log(new Date());
    
    const data = {
      projectName,
      startDate,
      endDate,
      status : newStatus,
      description,
    };

    try {
      const response = await createProject(data);

      if (response) {
        response
        dispatch(addProject(response.result));
        setIsCreateProject(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`createProjectContainer  ${
        isCreateProject ? "block" : "hidden"
      } flex place-content-center items-center`}
    >
      <div className="border-gray-500 border-2 h-fit w-fit ">
        <button
          onClick={() => clearState()}
          className="closeCreateProjectBtn absolute top-32 text-4xl right-32 z-30 p-3 text-white rounded-full"
        >
          <GiCrossMark />
        </button>
      </div>

      {/* CONTENT */}
      <div className={`createProject grid grid-cols-2 `}>

        {/* BOX-1*/}
        <div className="h-full w-full border-r-2 border-gray-500 p-12">
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-transparent border-2 p-3 outline-gray-400 text-gray-200 border-gray-400 rounded-xl w-5/6"
          />
          <textarea
            name="project description"
            id="description"
            maxLength={200}
            placeholder="Project Description..."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              console.log(description);
            }}
            className="bg-transparent border-2 p-4 outline-gray-400 text-gray-200 border-gray-500 rounded-2xl w-5/6 mt-10 h-36 "
          ></textarea>

          {/* ADD MEMBER/ADMIN */}
          <div className="py-10 grid grid-cols-2 gap-4">
            <AddMember info={{ members, setMembers }} type="member" />
            <AddMember
              info={{ members: admins, setMembers: setAdmins }}
              type="admin"
            />
          </div>
        </div>

        {/* BOX-2 */}
        <div className="h-full w-full  p-12 flex flex-col">
          <div className="grid grid-cols-3">
            <DropDown info={[]} Status={{ status, setStatus }} force={force} />

            {/* VISIBILITY  */}

            <div
              className={`text-gray-200 border-2 ml-5 ${
                visibility ? "border-gray-200" : "border-gray-500"
              } h-fit  p-3 max-w-36 text-center rounded-2xl`}
              onClick={() => setVisbility((prev) => !prev)}
            >
              {`${visibility ? "VISIBLE" : "HIDDEN"}`}
            </div>
          </div>

          <div className="selectDate flex gap-4 py-12 bg-transparent text-white">
            <SelectDate info={{ date: startDate, setDate: setStartDate }} />
            <SelectDate info={{ date: endDate, setDate: setEndDate }} />
            {/* <SelectDate /> */}
          </div>
          <div className="flex-1"></div>
      <Button
        classname={`createProjectBtn  text-white py-2 w-fit self-center px-6 text-xl font-semibold ${
          isCreateProject
            ? "activeCreateProjectBtn border-2 "
            : "sm:bottom-auto sm:right-32 createProjectBtn"
        }`}
        text="Create Project"
        onClick={createProjectClick}
      />
        </div>
      </div>
      
    </div>
  );
}

export default CreateProject;
