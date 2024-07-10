// components/chat/right/ChatHeader.tsx

import React from "react";
import { ConversationType } from "../../../types/ConversationType";

type Props = {
  selectedConversation: ConversationType | null;
  setSelectedConversation: (conversation: ConversationType | null) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ChatHeader: React.FC<Props> = ({ selectedConversation }) => {
  return (
    <div className="flex w-full rounded border">
      <div className="flex p-2">
        {selectedConversation ? (
          <>
            <img
              src={selectedConversation.profilePic}
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 justify-center items-center ml-3">
              <p className="font-bold text-lg">{selectedConversation.fullname}</p>
              <span className="text-sm my-0">online</span>
            </div>
          </>
        ) : (
          <p>No conversation selected</p>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
