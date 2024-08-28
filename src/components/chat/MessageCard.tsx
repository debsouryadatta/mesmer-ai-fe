"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import bot from "../../../public/bot.jpg";
// import { Message } from "@/store/global";

const MessageCard = ({ message }: {message: any}) => {

  return (
    <div
      key={message.id}
      className={`flex mb-2 ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {message.role === "assistant" && (
        <Avatar className="mr-2">
          <AvatarImage src={bot.src} alt="System Avatar" />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`flex flex-col w-[50vw] ${
          message.role === "user"
            ? "items-end text-right"
            : "items-start text-left"
        }`}
      >
        <div
          className={`relative max-w-xl ${
            message.role === "assistant" ? "bg-blue-100 dark:bg-zinc-950" : "bg-green-100 dark:bg-green-900"
          } p-2 rounded-lg shadow-md`}
        >
          {message.content && (
            <div className="whitespace-pre-wrap text-black dark:text-zinc-300">
              {message.content}
            </div>
          )}
          <span
            className={`absolute bottom-0 ${
              message.role === "assistant"
                ? "-left-1 bg-blue-100 dark:bg-zinc-950"
                : "-right-1 bg-green-100 dark:bg-green-900"
            } w-3 h-3 transform rotate-45`}
          ></span>
        </div>

      </div>
      {message.role === "user" && (
        <Avatar className="ml-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
          <AvatarFallback>UA</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default MessageCard;