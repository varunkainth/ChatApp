import React from "react";
import { Separator } from "../../ui/separator";
import useConversation from "../../../store/useConversation";
import { ConversationType } from "../../../types/ConversationType"; // Adjust the path based on your file structure and naming

type Props = {
  conversation: ConversationType;
  lastIndex: boolean;
  emoji: string;
};

const Conversation: React.FC<Props> = ({ conversation, lastIndex, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  // Assuming selectedConversation._id is of type string
  const isSelected = selectedConversation?._id === conversation._id;

  return (
    <>
      <Separator />
      <div
        className={`flex items-center hover:bg-sky-500 justify-between p-1 m-2 border-b cursor-pointer border-gray-200 ${isSelected ? "bg-sky-500" : ""}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 avatar overflow-hidden">
            <img
              src={conversation.profilePic}
              alt="Avatar"
              className="w-10 h-10 object-cover rounded-full"
            />
          </div>
          <div className="text-sm text-black font-bold">
            {conversation.fullname}
          </div>
        </div>
        <div className="text-xl">{emoji}</div>
      </div>
      {!lastIndex && <Separator />}
    </>
  );
};

export default Conversation;
