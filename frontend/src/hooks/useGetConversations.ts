/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

// Define the types for the conversation
interface Conversation {
  [x: string]: Key | null | undefined;
  id: string;
  // Add other conversation properties as needed
}

// Custom hook to get conversations
const useGetConversations = (): [Conversation[], boolean] => {
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        let accessToken = localStorage.getItem("access-token");
        if (accessToken) {
          accessToken = accessToken.replace(/^"(.*)"$/, "$1"); // Remove surrounding quotes if present
        }
        const res = await axios.get("/api/users", {
          headers: {
            Authorization: `Bearer${accessToken} `,
          },
        });
        if (res.data.error) {
          throw new Error(res.data.error);
        }
        setConversations(res.data);
      } catch (error: any) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversation();
  }, []);

  return [conversations, loading];
};

export default useGetConversations;
