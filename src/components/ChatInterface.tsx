import { useState } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { RecentQueries } from "./RecentQueries";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChatMessage as ChatMessageType, RecentQuery } from "@/types/chat";
import { Loader2 } from "lucide-react";

export const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: "1",
      content: "Hello! How can I help you find product or supplier information today?",
      isBot: true,
      timestamp: new Date(),
      type: "text"
    },
  ]);
  const [recentQueries, setRecentQueries] = useState<RecentQuery[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  const fetchFromBackend = async (query: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching from backend:', error);
      return {
        content: "Sorry, I'm having trouble connecting to the backend server.",
        type: "error"
      };
    }
  };

  const handleSend = async (message: string) => {
    // Add user message
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      content: message,
      isBot: false,
      timestamp: new Date(),
      type: "text"
    };
    setMessages((prev) => [...prev, userMessage]);
    
    // Add to recent queries
    const newQuery: RecentQuery = {
      id: Date.now().toString(),
      query: message,
      timestamp: new Date(),
    };
    setRecentQueries((prev) => [newQuery, ...prev].slice(0, 5));

    // Fetch response from backend
    setIsLoading(true);
    const response = await fetchFromBackend(message);
    
    const botMessage: ChatMessageType = {
      id: (Date.now() + 1).toString(),
      content: response.content,
      isBot: true,
      timestamp: new Date(),
      type: response.type,
      data: response.data
    };
    
    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex h-screen max-h-screen overflow-hidden">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto p-4">
        <div className="flex-1 overflow-y-auto space-y-4 pb-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-secondary rounded-lg px-4 py-2">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
          )}
        </div>
        <div className="pt-4 border-t">
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      </div>
      {!isMobile && (
        <RecentQueries
          queries={recentQueries}
          onSelect={(query) => handleSend(query)}
        />
      )}
    </div>
  );
};