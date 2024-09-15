import React, { useEffect, useState } from "react";
import userIcon from "../../../assets/user.png";
import Button from "../../Button";
import AddMember from "../../createProject/AddMember";
import { Link } from "react-router-dom";
import { prepareAutoBatched } from "@reduxjs/toolkit";

function MemberBox({list}) {
  console.log(list);
  let position = -2;
  let count = 0;
  let state = "";

  const [email, setEmail] = useState([]);
  let [members, setMembers] = useState([]);
  const [force, setForce] = useState(false);

  const removeUser = (id) => {
    members = members.filter((user) => user.id != id);
    setMembers(members)
  };

  const addMember = () => {
    if(email.length === 0) return 
    setMembers(prev => [...email, ...prev])
    setEmail([])
  }

  useEffect(() => {
    console.log('useEffect');
    setMembers(list);
  }, []);

  return (
    <div onMouseEnter={() => setEmail([])} className="p-1 mt-1 w-fit group">
      <div className="flex gap group-hover:hidden">
        {members.map((user) => {
          {
            position += 2;
            count++;
            if (count > 3) state = "hidden";
          }
          return (
            <div
              className={` relative -left-${position} ${state} border-2  border-white h-fit w-fit rounded-full`}
              key={user.id}
            >
              <img src={userIcon} alt="" className="h-6 w-6" />
            </div>
          );
        })}
      </div>

      {/* MEMBER LIST  */}
      <div className="m-2 absolute z-10 bg-black p-3 text-white right-0 rounded-xl border-2 border-gray-500 hidden group-hover:block">
        {/* ADD MEMBERS */}
        <div className="flex gap-2 items-end max-w-[350px] mb-2">
          <AddMember
            info={{ members: email, setMembers: setEmail }}
            type="member"
          />
          <button 
          onClick={addMember}
          className={`border-2 border-gray-500 h-fit px-2 py-1 rounded-lg ${email.length === 0 ? 'cursor-not-allowed' : ''}`}>
            add
          </button>
        </div>

        <div className={`flex flex-col gap-3`}>
          {members.map((user) => {
            {
              /* DISPLAY MEMBERS LIST */
            }
            return (
              <div
                key={user.id}
                className="flex justify-between items-center border-2 border-gray-500 p-1 rounded-lg"
              >
                <Link to="/login" className="flex flex-1 gap-3 p-2 ">
                  <img src={userIcon} alt="" className="h-7 w-7" />
                  <p className="text-xl relative -top-1">{user.userName}</p>
                </Link>
                <button
                  onClick={() => removeUser(user.id)}
                  className="h-8 w-8 border-2 rounded-full border-red-400 mr-2"
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MemberBox;
