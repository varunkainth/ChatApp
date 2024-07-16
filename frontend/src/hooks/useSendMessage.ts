import { useState } from "react";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

interface Message {
  _id: string; // Assuming _id is of type string, adjust if it's different
  text: string;
  sender: string; // Adjust sender type according to your data structure
  createdAt: string; // Adjust createdAt type according to your data structure
}

interface SendMessageResponse {
  error?: string;
  message?: Message;
}

const useSendMessage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message: string) => {
    setLoading(true);
    try {
      let accessToken = localStorage.getItem("access-token");
      if (!accessToken) {
        throw new Error("Access token not found");
      }
      accessToken = accessToken.replace(/^"(.*)"$/, "$1").trim(); // Remove surrounding quotes if present

      const headers = {
        Authorization: `Bearer${accessToken}`,
      };

      if (!selectedConversation?._id) {
        throw new Error("Selected conversation ID not found");
      }

      const endpoint = `/api/messages/send/${selectedConversation._id}`;

      console.log("Sending message to:", endpoint);
      console.log("Message content:", message);
      console.log("Headers:", headers);

      const res = await axios.post<SendMessageResponse>(
        endpoint,
        { message }, // Sending message as an object
        { headers }
      );

      console.log("Response:", res.data);

      if (res.data.error) {
        throw new Error(res.data.error);
      }

      if (res.data.message) {
        setMessages([...messages, res.data.message]);
        toast.success("Message sent successfully");
      } else {
        throw new Error("Message data not received");
      }
    } catch (error) {
      console.error("useSendMessageError", error);
      if (axios.isAxiosError(error)) {
        handleAxiosError(error);
      } else {
        toast.error("Error occurred while sending message");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAxiosError = (error: AxiosError) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Server responded with status:", error.response.status);
      console.error("Response data:", error.response.data);
      toast.error(`Server responded with status: ${error.response.status}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      toast.error("No response received from the server");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up request:", error.message);
      toast.error("Error setting up request to the server");
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
