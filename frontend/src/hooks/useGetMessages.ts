import { useEffect, useState } from "react";
import useConversation, { Conversation } from "../store/useConversation"; // Assuming `useConversation` exports `Conversation` type
import axios, { AxiosResponse } from "axios";

interface Message {
  _id?: string;
  text?: string;
  senderId?: string;
  receiverId?: string;
  createdAt?: string;
  updatedAt?: string;
  // Add more fields as per your message schema
}

interface GetMessagesResponse {
  data: Message[]; // Adjust as per your API response structure
  error?: string;
}

const useGetMessages = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        let accessToken = localStorage.getItem("access-token");
        if (accessToken) {
          accessToken = accessToken.replace(/^"(.*)"$/, "$1"); // Remove surrounding quotes if present
        }

        const headers = {
          Authorization: `Bearer${accessToken}`,
        };

        // Fetch messages for the selected conversation
        const res: AxiosResponse<GetMessagesResponse> = await axios.get(
          `/api/messages/${selectedConversation?._id}`,
          { headers }
        );

        // Handle API response
        if (res.data.error) {
          throw new Error(res.data.error);
        } 
        console.log("GetMessageResponse",res.data);
        

        // Update messages in the store
        setMessages(res.data); // Assuming messages are in `data` field of response
        setLoading(false);
      } catch (error) {
        console.log("Error fetching messages:", error);
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id]);
  const getMessages = messages
  return { getMessages, loading };
};

export default useGetMessages;
