import { create } from "zustand";

// Define the types for the state
interface ConversationState {
    selectedConversation: string | null;
    setSelectedConversation: (conversation: string | null) => void;
    messages: string[];
    setMessages: (messages: string[]) => void;
}

// Create the store using the defined types
const useConversation = create<ConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
    messages: [],
    setMessages: (messages) => set({ messages: messages }),
}));

export default useConversation;
