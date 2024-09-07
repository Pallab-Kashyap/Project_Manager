import React, { useEffect, useState } from "react";
import "./createProject.css";
import { GiCrossMark } from "react-icons/gi";
import DropDown from "../DropDown";
import SelectDate from "./SelectDate";
import STATUS from "../../utils/enum";
import CreateProjectContextProvider from "./createProjectContext";
import AddMember from "./AddMember";

function CreateProject({ info }) {
  const { isCreateProject, setIsCreateProject, createProjectClick } = info;

  //PROJECT DATA
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState('STATUS')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState()
  let [members, setMembers] = useState([])
  const [admins, setAdmins] = useState([])
  
  const [force, setForce] = useState(false)

  const [visibility, setVisbility] = useState(true);
  useEffect(() => {
    setVisbility(true);
    setStatus('STATUS')
    setStartDate(new Date())
    setEndDate(null)
    setMembers([])
    setForce( prev => !prev)
  }, [info]);

  const clearState = () => {
    setProjectName("");
    setDescription("");
    setIsCreateProject(false);
  };


  console.log(startDate);

  return (
    // <CreateProjectContextProvider value={{startDate, setStartDatec, endDate, setEndDatec,member, setMember,admin, setAdmin}}>
      <div
        className={`createProjectContainer  ${
          isCreateProject ? "block" : "hidden"
        } flex place-content-center items-center`}
      >
        <div className="border-gray-500 border-2 h-fit w-fit bg-red-400">
          <button
            onClick={() => clearState()}
            className="closeCreateProjectBtn absolute top-8 right-32 z-30 p-6  rounded-full"
          >
            <GiCrossMark />
          </button>
        </div>
        <div className={`createProject grid grid-cols-2 `}>
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
            <div className="py-10 grid grid-cols-2 gap-2">
              <AddMember info={{ members, setMembers}} type='member'/>
              <AddMember info={{ members : admins, setMembers : setAdmins}} type='admin'/>
            </div>
          </div>

            {/* RIGHT BOX */}
          <div className="h-full w-full  p-12">
            <div className="grid grid-cols-3">
              <DropDown info={[]} Status={{status, setStatus}} force={force}/>

              {/* VISIBILITY  */}

              <div
                className={`text-gray-200 border-2 ${
                  visibility ? "border-gray-200" : "border-gray-500"
                } h-fit  p-3 max-w-36 text-center rounded-2xl`}
                onClick={() => setVisbility((prev) => !prev)}
              >
                {`${visibility ? "VISIBLE" : "HIDDEN"}`}
              </div>
            </div>

            <div className="selectDate grid grid-cols-2 py-12 bg-transparent text-white">
              <SelectDate info={{date : startDate, setDate : setStartDate}}/>
              <SelectDate info={{date : endDate, setDate : setEndDate}}/>
              {/* <SelectDate /> */}
            </div>
          </div>
        </div>
      </div>
    // </CreateProjectContextProvider>
  );
}

export default CreateProject;
