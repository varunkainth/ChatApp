import  {useState} from "react";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const {messages, setMessages, selectedConversation} = useConversation();

  const sendMessage = async (message:string) => {
    setLoading(true);
    try {
      let accessToken = localStorage.getItem("access-token");
      if (accessToken) {
        accessToken = accessToken.replace(/^"(.*)"$/, "$1"); // Remove surrounding quotes if present
      }

      const headers = {
        Authorization: `Bearer${accessToken} `,
      };

      const res = await axios.post(
        `/api/messages/send/${selectedConversation?._id}`,
        message,
        {
          headers: headers,
        }
      );
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      console.log("Messages", res.data);

      setMessages([...messages, res.data]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("useSendMessageError", error);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return{loading,sendMessage}
};

export default useSendMessage;
