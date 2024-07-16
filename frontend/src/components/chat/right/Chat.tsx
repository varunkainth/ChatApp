import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import SendIcon from "@mui/icons-material/Send";
import useSendMessage from "../../../hooks/useSendMessage";
import useGetMessages from '../../../hooks/useGetMessages';

interface Message {
  _id?: string;
  text?: string;
  senderId?: string;
  receiverId?: string;
  createdAt?: string;
  updatedAt?: string;
  // Add more fields as per your message schema
}

const Chat: React.FC = () => {
  const { getMessages, loading } = useGetMessages();
  const { sendMessage } = useSendMessage(); // Assuming you have a useSendMessage hook

  const messageInputRef = useRef<HTMLInputElement>(null); // Ref for message input
  const [messageInput, setMessageInput] = useState<string>(''); // State for message input

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim()) {
      console.log("Message is empty");
      return;
    }

    try {
      await sendMessage(messageInput); // Call sendMessage function from the hook
      setMessageInput(''); // Clear message input after sending
      messageInputRef.current?.focus(); // Focus on input after sending message
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    handleSendMessage();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {getMessages.map((message: Message) => (
          <div
            key={message._id}
            className={`flex ${
              message.senderId === 'me' ? 'justify-end' : 'justify-start'
            } mb-2`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.senderId === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-300 flex">
        <input
          type="text"
          ref={messageInputRef}
          value={messageInput}
          onChange={handleChange}
          className="flex-1 px-4 py-2 border rounded-lg"
          placeholder="Type your message..."
          aria-label="Type your message"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!messageInput.trim() || loading}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <SendIcon />
          )}
        </button>
      </form>
    </div>
  );
};

export default Chat;
