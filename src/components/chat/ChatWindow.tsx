import React, { useEffect, useRef, useState } from 'react';
import MessageCard from './MessageCard';

const ChatWindow = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string; }[]>([
    {
      role: 'assistant',
      content: 'Hi there! How can I assist you today?',
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-center mb-6 text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-400 bg-opacity-50">
        Mesmer Ai
      </h2>
      <div className="w-full bg-white rounded-lg shadow-lg p-6 ">
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
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`p-2 bg-blue-500 text-white rounded-r-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            {isLoading ? 'Loading...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;