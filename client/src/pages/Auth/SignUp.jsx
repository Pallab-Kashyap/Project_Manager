import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import registerUser from "../../APIs/auth.js";
import { useSelector,useDispatch } from "react-redux" 
import { addUser, getUser } from "../../context/userSlice.js";


function SignUP() {
  const navigate = useNavigate();
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState(false);
  const dispatch = useDispatch()

  const handleClick = async (e) => {
    e.preventDefault();
    setValidationError(false);

    if(!userName || !email || !password)
      return setValidationError(true);

    const data = {
      userName,
      email,
      password
    }

    // setuserName('')
    // setEmail("")
    // setPassword('')

    const result = await registerUser(data)
    if(result){
      dispatch(addUser(user))
      navigate('/home')
    }


  };



  return (
    <div className="h-screen w-screen flex flex-col items-center pt-40 gap-16 bg-black">
      <div className="text-3xl font-semibold text-white">
        <h1>SIGNUP</h1>
      </div>
      <div>
        <form className="">
          <div>
            <label htmlFor="email" className="block mt-2 mb-2 text-[19px] text-zinc-200">
              username
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
              placeholder="Password"
              className="h-8 rounded-lg w-80 p-4 border-zinc-700 border-2 bg-transparent mb-7 text-zinc-300"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-lg text-[19px] text-zinc-200">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Confirm password"
              className="h-8 rounded-lg w-80 p-4 border-zinc-700 border-2 bg-transparent mb-7 text-zinc-300"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-lg text-[19px] text-zinc-200">
              password
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Confirm password"
              className="h-8 rounded-lg w-80 p-4 border-zinc-700 border-2 bg-transparent mb-7 text-zinc-300"
            />
          </div>

          <button 
          onClick={handleClick}
          className="p-2 w-full bg-blue-500 rounded-lg font-medium text-white">
            SignUP
          </button>
        </form>
      </div>
      <Link to="/login" className="flex text-zinc-300">
        <FaArrowLeftLong className="mr-2 mt-1" />
        <p>Back to login</p>
      </Link>
    </div>
  );
}

export default SignUP;
