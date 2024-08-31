"use client";

import ChatContainer from "@/components/chat/ChatContainer";


export default function page() {
  return (
    <>
      <div className="flex items-center justify-center overflow-hidden bg-gradient-to-r from-stone-400 to-stone-100 dark:from-stone-800 dark:to-stone-950">
        <ChatContainer />
      </div>
    </>
  );
}
