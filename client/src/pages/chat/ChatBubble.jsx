import React from "react";
import { useUserContext } from "../../context/userContext";
import "./ChatInterface.css";

function ChatBubble() {
  const { user } = useUserContext();
  // let side = sender === user.email ? "self-end myMsg" : "self_start";
  return (
    // <div className={`chatBubble m-2 text-lg h-fit px-4 py-2 w-fit max-w-2xl break-words whitespace-normal rounded-2xl ${side}`}>
    <div className={`chatBubble m-2 text-lg h-fit px-4 py-2 w-fit max-w-2xl break-words whitespace-normal rounded-2xl`}>
      {'msg'}
    </div>
  );
}

export default ChatBubble;
