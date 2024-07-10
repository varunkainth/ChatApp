import React, { useState, useRef, useEffect } from "react";
import { InputDemo } from "../search/search";
import { Separator } from "../ui/separator";
import { ScrollAreaDemo } from "../chat/left/Scroll";
import ChatHeader from "../chat/right/ChatHeader";
import Chat from "../chat/right/Chat";
import NotSelected from "../chat/right/NotSelected";
import useConversation from "../../store/useConversation";

const MainHome: React.FC = () => {
  const [showAdditionalDiv, setShowAdditionalDiv] = useState(false);
  const [additionalDivHeight, setAdditionalDivHeight] = useState(0);
  const blueDivRef = useRef<HTMLDivElement>(null);
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    if (blueDivRef.current && showAdditionalDiv) {
      const height = blueDivRef.current.clientHeight;
      setAdditionalDivHeight(height);
    } else {
      setAdditionalDivHeight(0);
    }
  }, [showAdditionalDiv]);

  useEffect(()=>{
    return ()=>{
      setSelectedConversation(null)
    }
  },[setSelectedConversation])

  const handleButtonClick = () => {
    setShowAdditionalDiv((prev) => !prev); // Toggle the state
  };

  

  return (
    <div className="flex h-screen w-screen pl-[3.5rem]">
      <div className="w-1/4 bg-gray-200 p-1">
        <InputDemo />
        <Separator className="my-6" />
        <ScrollAreaDemo />
      </div>
      <div
        ref={blueDivRef}
        className={`${
          showAdditionalDiv ? "w-1/2" : "w-3/4"
        } bg-blue-200 p-6 relative min-h-full`}
      >
        {!selectedConversation ? (
          <NotSelected />
        ) : (
          <>
            <ChatHeader  selectedConversation={selectedConversation}
              setSelectedConversation={setSelectedConversation} />
            <div className="h-[calc(100%-4rem)] overflow-y-auto">
              <Chat />
            </div>
          </>
        )}
      </div>
      {showAdditionalDiv && (
        <div
          className="flex-1 bg-green-200 p-6"
          style={{ height: additionalDivHeight }}
        >
          <h2 className="text-xl font-bold mb-4">Additional Content</h2>
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">First Row</h3>
            <p>Insert content for the first row here.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Second Row</h3>
            <p>Insert content for the second row here.</p>
          </div>
        </div>
      )}
      <button
        className="absolute bottom-4 right-4 px-4 py-2 bg-gray-500 text-white rounded"
        onClick={handleButtonClick}
      >
        {showAdditionalDiv ? "Hide Div" : "Show Div"}
      </button>
    </div>
  );
};

export default MainHome;
