import { create } from "zustand";

interface MessageState {
  messages: { role: string; content: string; }[];
  setMessages: (messages: { role: string; content: string; }[]) => void;
}

// Create the message store
export const useMessageStore = create<MessageState>((set, get) => ({
  messages: [{
    role: "assistant",
    content: "Hi there! How can I assist you today?",
  }],
  setMessages: (messages: { role: string; content: string; }[]) => set({ messages }),
}));