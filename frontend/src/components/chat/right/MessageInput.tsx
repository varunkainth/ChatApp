import React, { useState, ChangeEvent, FormEvent } from "react";
import SendIcon from "@mui/icons-material/Send";
import useSendMessage from "../../../hooks/useSendMessage";

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState<string>(""); // State for the message input
  const { loading, sendMessage } = useSendMessage(); // Custom hook for sending messages

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("Input changed:", e.target.value); // Log input changes
    setMessage(e.target.value); // Update message state as the user types
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Form submitted with message:", message); // Log form submission

    if (!message.trim()) {
      console.log("Message is empty");
      return; // Ensure message is not empty or whitespace
    }

    try {
      await sendMessage(message); // Call sendMessage function to send the message
      setMessage(""); // Clear the input field after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="p-4 border-t border-gray-300 flex">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-lg"
          value={message}
          onChange={handleChange}
          disabled={loading} // Disable input while loading
        />
        <button
          disabled={loading}
          type="submit"
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <SendIcon />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
