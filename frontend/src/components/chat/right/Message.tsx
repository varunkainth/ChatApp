import React from "react";

type Props = {
    // children: React.ReactNode
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Message = (props: Props) => {
  return (
    <>
      <div className="chat hat-end flex ">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              src="https://avatar.iran.liara.run/public/boy?username=$pain"
              alt="Tailwind CSS Chat bubble Components"
            />
          </div>
        </div>
        <div className="chat-bubble flex-2 text-white bg-blue-500">
          Hi! What is upp??
        </div>
        <div className="chat-footer opacity-500 text-xs flex  items-center">
          12:42
        </div>
      </div>
    </>
  );
};

export default Message;
