import {ScrollArea} from "../../ui/scroll-area";

import useGetConversations from "../../../hooks/useGetConversations";
import Conversation from "./Conversation";
import {getRandomUniqueEmoji} from "../../../utils/RandomEmoji";

export function ScrollAreaDemo() {
  const [conversations, loading] = useGetConversations();
  console.log("Conversations", conversations);

  return (
    <ScrollArea className="h-[47rem] w-full bg-black-500 rounded-md">
      <div className="p-4">
        <h4 className="mb-4 text-sm bg-black-500 font-bold text-black font-medium leading-none">
          All Chats
        </h4>
        {conversations.map(
          (
            conversation,
            idx // Added idx as the second parameter
          ) => (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              emoji={getRandomUniqueEmoji()} // Assuming this generates a random emoji
              lastIndex={idx === conversations.length - 1}
            />
          )
        )}
        {loading ? (
          <span className="loading -loading-spinner mx-auto"></span>
        ) : null}
      </div>
    </ScrollArea>
  );
}
