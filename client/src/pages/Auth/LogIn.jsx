import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { login } from "../../APIs/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../../context/userSlice";
import { resetData } from "../../context/store";

function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("a");
  const [email, setEmail] = useState("a@gmail.com");
  const dispatch = useDispatch()

  const handleClick = async (e) => {
    e.preventDefault();

    // setPassword("");
    // setConfirmPassword("");
    
    const body = {
        email,
        password
    }
    const result = await login(body)

    if(result){
        resetData()
        dispatch(addUser(result))
      navigate('/')
    }
    else{
      
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center pt-40 gap-16 bg-black">
      <div className="text-3xl font-semibold text-white">
        <h1>Login</h1>
      </div>
      <div>
        <form className="">
          <div>
            <label htmlFor="email" className="block mt-2 mb-2 text-[19px] text-zinc-200">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              className="h-8 rounded-lg w-80 p-4 border-zinc-700 border-2 bg-transparent mb-7 text-zinc-300"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-lg text-[19px] text-zinc-200">
              Password
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
            Login
          </button>
        </form>
      </div>
      <Link to="/signin" className="flex text-zinc-300">
        <FaArrowLeftLong className="mr-2 mt-1" />
        <p>Create new account</p>
      </Link>
    </div>
  );
}

export default Login;
