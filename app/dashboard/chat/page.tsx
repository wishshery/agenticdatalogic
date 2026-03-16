"use client";

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Send, Bot, Sparkles, RotateCcw, Copy, ThumbsUp, ThumbsDown,
  ChevronRight, Mail, Calendar, Search, BarChart3, FileText,
  MessageSquare, Globe, Users, Zap,
} from "lucide-react";
import { useAgentChat } from "@/lib/hooks/use-agent-chat";

const AGENTS = [
  { id: "orchestrator", label: "AI Orchestrator", icon: Bot, color: "text-primary-400", bgColor: "bg-primary-500/10", desc: "General-purpose AI, routes to specialists" },
  { id: "admin", label: "Admin Assistant", icon: Users, color: "text-blue-400", bgColor: "bg-blue-500/10", desc: "Meetings, CRM, travel, follow-ups" },
  { id: "email", label: "Email Manager", icon: Mail, color: "text-amber-400", bgColor: "bg-amber-500/10", desc: "Inbox, drafts, professional responses" },
  { id: "scheduler", label: "Scheduler", icon: Calendar, color: "text-emerald-400", bgColor: "bg-emerald-500/10", desc: "Calendar, meetings, reminders" },
  { id: "research", label: "Research Agent", icon: Search, color: "text-cyan-400", bgColor: "bg-cyan-500/10", desc: "Competitors, market, industry research" },
  { id: "social", label: "Social Media", icon: Globe, color: "text-pink-400", bgColor: "bg-pink-500/10", desc: "Posts, captions, content calendars" },
  { id: "support", label: "Customer Support", icon: MessageSquare, color: "text-violet-400", bgColor: "bg-violet-500/10", desc: "FAQ, responses, knowledge base" },
  { id: "docs", label: "Document Creator", icon: FileText, color: "text-indigo-400", bgColor: "bg-indigo-500/10", desc: "Reports, proposals, briefs" },
  { id: "projects", label: "Project Manager", icon: BarChart3, color: "text-purple-400", bgColor: "bg-purple-500/10", desc: "Plans, milestones, status reports" },
];

const QUICK_PROMPTS: Record<string, string[]> = {
  orchestrator: [
    "What can you help me with today?",
    "Summarize my priorities for this week",
    "Draft a professional email to a new client",
    "Research my top 3 competitors",
  ],
  admin: [
    "Create a meeting agenda for our Monday standup",
    "Draft a travel itinerary for a 3-day conference",
    "Write a follow-up email after a sales meeting",
    "Create a weekly activity report template",
  ],
  email: [
    "Write a cold outreach email to a potential partner",
    "Draft a follow-up email after a demo call",
    "Write a professional rejection email",
    "Create a customer onboarding welcome email",
  ],
  scheduler: [
    "Schedule a weekly team standup for Fridays at 9am",
    "Create a project kickoff meeting agenda",
    "Plan a 1-hour team brainstorming session",
    "Suggest the best times for a client call",
  ],
  research: [
    "Research the top 5 competitors in the SaaS CRM space",
    "Summarize current trends in AI productivity tools",
    "Create a competitor analysis for my industry",
    "Research pricing strategies for B2B SaaS",
  ],
  social: [
    "Write 5 LinkedIn posts about AI productivity",
    "Create a week of Instagram captions for a tech brand",
    "Write Twitter/X threads about building a startup",
    "Create a social media content calendar for next month",
  ],
  support: [
    "Write a response to an angry customer about a delayed order",
    "Create an FAQ document for our SaaS product",
    "Draft a refund policy response email",
    "Write a knowledge base article about our onboarding",
  ],
  docs: [
    "Create a business proposal template for software projects",
    "Write a project brief for a new mobile app",
    "Draft an executive summary for a quarterly report",
    "Create a product requirements document template",
  ],
  projects: [
    "Create a project plan for launching a new website",
    "Write a sprint planning document for 2 weeks",
    "Create a risk assessment for a software migration",
    "Draft a project status report template",
  ],
};

function ChatPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialAgent = searchParams.get("agent") || "orchestrator";
  const initialQuery = searchParams.get("q") || "";

  const [selectedAgent, setSelectedAgent] = useState(initialAgent);
  const [input, setInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, isLoading, clearHistory } = useAgentChat(selectedAgent);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-send initial query from URL once
  const didSendInitial = useRef(false);
  useEffect(() => {
    if (initialQuery && !didSendInitial.current && messages.length === 0) {
      didSendInitial.current = true;
      sendMessage(initialQuery);
    }
  }, [initialQuery, messages.length, sendMessage]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await sendMessage(text);
  }, [input, isLoading, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAgentSwitch = (agentId: string) => {
    setSelectedAgent(agentId);
    clearHistory();
    router.replace(`/dashboard/chat?agent=${agentId}`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const activeAgent = AGENTS.find((a) => a.id === selectedAgent) || AGENTS[0];
  const quickPrompts = QUICK_PROMPTS[selectedAgent] || QUICK_PROMPTS.orchestrator;

  return (
    <div className="flex h-full gap-0 -m-6">
      {/* ── AGENT SIDEBAR ── */}
      <div
        className={`${
          showSidebar ? "w-64" : "w-0"
        } transition-all duration-200 overflow-hidden flex-shrink-0 border-r border-navy-800 flex flex-col bg-navy-950`}
      >
        <div className="p-4 border-b border-navy-800">
          <p className="text-xs font-semibold uppercase tracking-widest text-navy-500 mb-1">Select Agent</p>
          <p className="text-xs text-navy-600">Each agent is a specialist</p>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {AGENTS.map((agent) => {
            const Icon = agent.icon;
            const isActive = selectedAgent === agent.id;
            return (
              <button
                key={agent.id}
                onClick={() => handleAgentSwitch(agent.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150 ${
                  isActive
                    ? "bg-primary-900/40 border-r-2 border-primary-500"
                    : "hover:bg-navy-800/50"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg ${agent.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${agent.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isActive ? "text-white" : "text-navy-300"}`}>
                    {agent.label}
                  </p>
                  <p className="text-xs text-navy-600 truncate">{agent.desc}</p>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── CHAT AREA ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-navy-800 bg-navy-950">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="w-8 h-8 rounded-lg bg-navy-800 hover:bg-navy-700 flex items-center justify-center transition-colors"
          >
            <ChevronRight className={`w-4 h-4 text-navy-400 transition-transform ${showSidebar ? "rotate-180" : ""}`} />
          </button>
          <div className={`w-9 h-9 rounded-xl ${activeAgent.bgColor} flex items-center justify-center flex-shrink-0`}>
            <activeAgent.icon className={`w-5 h-5 ${activeAgent.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-white text-sm">{activeAgent.label}</h1>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online · Ready to help
            </div>
          </div>
          <button
            onClick={clearHistory}
            className="btn btn-ghost btn-sm text-navy-500 hover:text-white gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <div className={`w-16 h-16 rounded-2xl ${activeAgent.bgColor} border border-navy-700 flex items-center justify-center mb-4`}>
                <activeAgent.icon className={`w-8 h-8 ${activeAgent.color}`} />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{activeAgent.label}</h2>
              <p className="text-navy-400 text-sm max-w-md mb-8">{activeAgent.desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-xl">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => {
                      setInput(prompt);
                      inputRef.current?.focus();
                    }}
                    className="text-left p-3 rounded-xl bg-navy-800 border border-navy-700 hover:border-primary-700 hover:bg-navy-800/80 transition-all text-sm text-navy-300 hover:text-white"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-primary-400 inline mr-2 mb-0.5" />
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              {msg.role === "assistant" ? (
                <div className={`w-8 h-8 rounded-full ${activeAgent.bgColor} flex items-center justify-center flex-shrink-0 mt-1`}>
                  <activeAgent.icon className={`w-4 h-4 ${activeAgent.color}`} />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center flex-shrink-0 mt-1 text-xs font-bold text-white">
                  You
                </div>
              )}
              <div className={`flex flex-col gap-1 max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                {msg.agent && (
                  <span className="text-[11px] text-navy-600 px-1">via {msg.agent}</span>
                )}
                <div className={msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"}>
                  <p className="whitespace-pre-wrap leading-relaxed text-sm">{msg.content}</p>
                </div>
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-1 px-1">
                    <span className="text-[11px] text-navy-600">{msg.timestamp}</span>
                    <button
                      onClick={() => copyToClipboard(msg.content)}
                      className="p-1 rounded text-navy-600 hover:text-navy-400 transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    <button className="p-1 rounded text-navy-600 hover:text-emerald-400 transition-colors">
                      <ThumbsUp className="w-3 h-3" />
                    </button>
                    <button className="p-1 rounded text-navy-600 hover:text-red-400 transition-colors">
                      <ThumbsDown className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className={`w-8 h-8 rounded-full ${activeAgent.bgColor} flex items-center justify-center flex-shrink-0`}>
                <activeAgent.icon className={`w-4 h-4 ${activeAgent.color}`} />
              </div>
              <div className="chat-bubble-ai flex items-center gap-1 py-3">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-6 pb-6 pt-4 border-t border-navy-800">
          <div className="flex gap-3 bg-navy-800 border border-navy-700 rounded-xl p-3 focus-within:border-primary-600 transition-colors">
            <div className="flex items-start pt-1">
              <Zap className="w-4 h-4 text-navy-500" />
            </div>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask ${activeAgent.label} anything…`}
              className="flex-1 bg-transparent outline-none resize-none text-sm text-navy-100 placeholder:text-navy-600 min-h-[44px] max-h-[160px] leading-relaxed"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="btn btn-primary btn-sm self-end disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] text-navy-700 text-center mt-2">
            Powered by Claude AI · Responses may vary · Verify important information
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full text-navy-400">Loading…</div>}>
      <ChatPageInner />
    </Suspense>
  );
}
