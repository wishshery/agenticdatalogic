"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Bot, Paperclip, Sparkles, RotateCcw, Copy, ThumbsUp, ThumbsDown, ChevronDown } from "lucide-react";
import { useAgentChat } from "@/lib/hooks/use-agent-chat";

const AGENT_SUGGESTIONS = [
  "Schedule a meeting with the team for Friday at 2pm",
  "Draft a professional follow-up email to our new client",
  "Research the top 5 competitors in the SaaS space",
  "Create a weekly project status report",
  "Summarize my inbox from today",
  "Write social media posts for this week",
];

export default function ChatPage() {
  const { messages, sendMessage, isLoading, clearHistory } = useAgentChat();
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    setShowSuggestions(false);
    await sendMessage(text);
  }, [input, isLoading, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestion = (s: string) => {
    setInput(s);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-64px-48px)] max-w-4xl mx-auto">
      {/* Chat header */}
      <div className="flex items-center justify-between pb-4 border-b border-navy-800 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-glow-blue">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white">AI Orchestrator</h1>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online · 10 agents ready
            </div>
          </div>
        </div>
        <button onClick={clearHistory} className="btn btn-ghost btn-sm text-navy-500 hover:text-white">
          <RotateCcw className="w-4 h-4" />
          Clear
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4 hide-scrollbar">
        {/* Welcome state */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center mb-4 shadow-glow-blue">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">How can I help you today?</h2>
            <p className="text-navy-400 text-sm max-w-md mb-8">
              I&apos;m your AI orchestrator. I can route tasks to specialized agents for email, scheduling, research, documents, social media, and more.
            </p>
            {showSuggestions && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-2xl">
                {AGENT_SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => handleSuggestion(s)} className="text-left p-3 rounded-xl bg-navy-800 border border-navy-700 hover:border-primary-700 hover:bg-navy-800/80 transition-all text-sm text-navy-300 hover:text-white">
                    <Sparkles className="w-3.5 h-3.5 text-primary-400 inline mr-2 mb-0.5" />
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Message list */}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
            {/* Avatar */}
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center flex-shrink-0 mt-1 text-xs font-bold text-white">
                You
              </div>
            )}

            <div className={`flex flex-col gap-1 max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
              {/* Agent badge */}
              {msg.agent && (
                <span className="text-2xs text-navy-500 px-2">
                  via {msg.agent}
                </span>
              )}

              {/* Bubble */}
              <div className={msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>

              {/* AI message actions */}
              {msg.role === "assistant" && (
                <div className="flex items-center gap-1 px-1">
                  <span className="text-2xs text-navy-600">{msg.timestamp}</span>
                  <button className="btn btn-icon p-1 text-navy-600 hover:text-navy-400"><Copy className="w-3 h-3" /></button>
                  <button className="btn btn-icon p-1 text-navy-600 hover:text-emerald-400"><ThumbsUp className="w-3 h-3" /></button>
                  <button className="btn btn-icon p-1 text-navy-600 hover:text-red-400"><ThumbsDown className="w-3 h-3" /></button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="chat-bubble-ai flex items-center gap-1 py-3">
              <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-navy-800 pt-4">
        {!showSuggestions && messages.length === 0 && (
          <button onClick={() => setShowSuggestions(true)} className="flex items-center gap-1 text-xs text-navy-500 hover:text-navy-400 mb-3 transition-colors">
            <ChevronDown className="w-3.5 h-3.5" />
            Show suggestions
          </button>
        )}
        <div className="card flex gap-3 p-3 border-navy-700 focus-within:border-primary-700 transition-colors">
          <button className="btn btn-icon text-navy-500 hover:text-white mt-1">
            <Paperclip className="w-4 h-4" />
          </button>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your AI assistant anything..."
            className="flex-1 bg-transparent outline-none resize-none text-sm text-navy-100 placeholder:text-navy-600 min-h-[44px] max-h-[160px] leading-relaxed"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="btn btn-primary btn-sm mt-1 self-end disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-2xs text-navy-600 text-center mt-2">
          AI may make mistakes. Verify important information independently.
        </p>
      </div>
    </div>
  );
}
