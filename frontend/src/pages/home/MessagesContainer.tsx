import React from "react";
import Messages from "./Message";
import MessageInput from "./MessageInput";

const MessagesContainer = () => {
  return (
    <>
      <div className="bg-slate-500 px-4 py-2 mb2">
        <span className="label-text">To:</span>
        <span className="text-gray-900 font-bold">King</span>
      </div>
      <Messages />
      <MessageInput />
    </>
  );
};

export default MessagesContainer;
