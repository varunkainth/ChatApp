import React from "react";
import SendIcon from "@mui/icons-material/Send";

const MessageInput = () => {
  return (
    <>
      <form action="" className="px-4 my-3">
        <div className="w-full relative">
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
          <button
            type="submit"
            className="inset-y-0 end-0 flex items-center pe-3"
          >
            <SendIcon />
          </button>
        </div>
      </form>
    </>
  );
};

export default MessageInput;
