import React from "react";

const Message = () => {
  return (
    <div className="chat hat-end ">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://avatar.iran.liara.run/public/boy?username=$pain"
            alt="Tailwind CSS Chat bubble Components"
          />
        </div>
      </div>
      <div className="chat-bubble text-white bg-blue-500">
        Hi! What is upp??
      </div>
      <div className="chat-footer opacity-500 text-xs flex gap-1 items-center">
        12:42
      </div>
    </div>
  );
};

export default Message;
