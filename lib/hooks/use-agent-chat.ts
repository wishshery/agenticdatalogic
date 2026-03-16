import { useState, useCallback } from "react";
import axios from "axios";
import { useAuthStore } from "@/lib/stores/auth-store";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  agent?: string;
  timestamp: string;
}

export function useAgentChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuthStore();

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/agents/chat`,
        { message: content, history: messages.slice(-10) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.response,
        agent: data.agent,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error: any) {
      const errMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "I apologize, I encountered an error processing your request. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, token]);

  const clearHistory = useCallback(() => setMessages([]), []);

  return { messages, sendMessage, isLoading, clearHistory };
}
