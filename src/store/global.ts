import { create } from "zustand";

interface MessageState {
  messageStore: { role: string; content: string; }[];
  setMessageStore: (messages: { role: string; content: string; }[]) => void;
}

// Create the message store
export const useMessageStore = create<MessageState>((set, get) => ({
  messageStore: [{
    role: "assistant",
    content: "Hi there! How can I assist you today?",
  }],
  setMessageStore: (messageStore: { role: string; content: string; }[]) => set({ messageStore }),
}));


interface UserState {
  user: { email: string; name: string; } | null;
  setUser: (user: { email: string; name: string; } | null) => void;
}

// Create the user store
export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  setUser: (user: { email: string; name: string; } | null) => set({ user }),
}));