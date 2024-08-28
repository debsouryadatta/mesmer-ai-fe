import React, { useEffect, useRef, useState } from 'react';
import MessageCard from './MessageCard';
import { useMessageStore } from '@/store/global';

const ChatWindow = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string; }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { messageStore, setMessageStore } = useMessageStore();

  const fetchStreamedResponse = async () => {
    setIsLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: userInput },
    ]);

    const response = await fetch('https://mesmer-ai-be.souryax.tech/get_response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: 1, // Replace with actual user ID
        user_input: userInput,
      }),
    });

    // @ts-ignore
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let assistantMessage = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      assistantMessage += decoder.decode(value, { stream: true });
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const lastMessage = updatedMessages[updatedMessages.length - 1];
        if (lastMessage && lastMessage.role === 'assistant') {
          lastMessage.content += decoder.decode(value, { stream: true });
        } else {
          updatedMessages.push({
            role: 'assistant',
            content: decoder.decode(value, { stream: true }),
          });
        }
        return updatedMessages;
      });
    }

    setMessageStore(messages);
    // console.log("Message Store", messageStore);
    setIsLoading(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchStreamedResponse();
    setUserInput('');
  };

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages(messageStore);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-center mb-6 text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-400 dark:from-neutral-100 dark:to-neutral-400 bg-opacity-50">
        Welcome to Mesmer Ai
      </h2>
      <div className="w-full bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6 ">
        <div className="space-y-4 mb-4 max-h-[70vh] overflow-y-scroll" style={{
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}>
          {messages.map((message, index) => (
            <MessageCard key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            required
            className="flex-grow p-2 border border-gray-300 dark:border-gray-600 dark:bg-zinc-900 rounded-l-lg focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`p-2 bg-zinc-500 text-white rounded-r-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-zinc-600'}`}
          >
            {isLoading ? 'Loading...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;