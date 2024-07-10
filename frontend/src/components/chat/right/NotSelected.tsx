import {MessageCircleIcon} from "lucide-react";
import React from "react";

const NotSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg text-black-500 md:text-xl font-semibold flex flex-col">
        <p>Welcome ✌ Varun Kainth ❄</p>
        <p>Select a chat to start messaging</p>
        <MessageCircleIcon className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default NotSelected;
