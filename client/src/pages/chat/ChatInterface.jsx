import React, { useEffect, useRef, useState } from "react";
import ChatBox from "./ChatBox";
import ChatScreen from "./ChatScreen";
import Search from "./Search"
import './ChatInterface.css'
import { UserContextProvider } from '../../context/userContext'

function ChatInterface() {

  const [user, setUser] = useState();
  

  return (
    <UserContextProvider
      value={{user, setUser}}
    >
      <div className="chatInterface  h-screen w-screen flex">
        <div className="chatBoxContainer w-full md:w-2/6 h-full overflow-y-scroll">
          <Search />
          <ChatBox />
        </div>
        <div className="divider"></div>
        <div className="chatContainer hidden md:block md:w-3/4  h-full ">
          <ChatScreen />
        </div>
      </div>
    </UserContextProvider>
  );
}

export default ChatInterface;
