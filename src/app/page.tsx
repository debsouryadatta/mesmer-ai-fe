"use client";

import { ThemeButton } from "@/components/ThemeButton";
import ChatContainer from "../components/chat/ChatContainer";

export default function page() {
  return (
    <>
      <div className="absolute right-10 top-10">
        <ThemeButton />
      </div>
      <div className="flex items-center justify-center h-screen w-screen bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        <ChatContainer />
      </div>
    </>
  );
}
