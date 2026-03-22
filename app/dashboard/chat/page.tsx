"use client";

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAgentChat } from "@/lib/hooks/use-agent-chat";

const AGENTS = [
  { id: "orchestrator", icon: "🧠", name: "AI Orchestrator",  color: "linear-gradient(135deg,#7C3AED,#6366F1)" },
  { id: "admin",        icon: "📋", name: "Admin Assistant",   color: "linear-gradient(135deg,#2563EB,#0EA5E9)" },
  { id: "email",        icon: "✉️", name: "Email Manager",     color: "linear-gradient(135deg,#06B6D4,#0EA5E9)" },
  { id: "scheduler",    icon: "🗓️", name: "Scheduler",         color: "linear-gradient(135deg,#F97316,#F59E0B)" },
  { id: "research",     icon: "🔍", name: "Research Agent",    color: "linear-gradient(135deg,#10B981,#14B8A6)" },
  { id: "social",       icon: "📱", name: "Social Media",      color: "linear-gradient(135deg,#EC4899,#8B5CF6)" },
  { id: "support",      icon: "💬", name: "Customer Support",  color: "linear-gradient(135deg,#F59E0B,#EF4444)" },
  { id: "docs",         icon: "📄", name: "Document Creator",  color: "linear-gradient(135deg,#F43F5E,#EC4899)" },
  { id: "projects",     icon: "🚀", name: "Project Manager",   color: "linear-gradient(135deg,#6366F1,#4F46E5)" },
];

const QUICK_PROMPTS: Record<string, string[]> = {
  orchestrator: ["What tasks can you help with?", "Plan my upcoming product launch", "What should I prioritize today?", "Help me organize my workload"],
  admin:        ["Draft a meeting agenda", "Write a travel itinerary", "Create a follow-up email template", "Update CRM notes"],
  email:        ["Write a cold outreach email", "Reply to a customer complaint", "Draft a follow-up email", "Summarize my inbox"],
  scheduler:    ["Schedule a team standup", "Find the best meeting time", "Set reminders for this week", "Plan my calendar for Monday"],
  research:     ["Analyze our competitors", "Research market trends in AI", "Summarize industry news", "Competitor SWOT analysis"],
  social:       ["Write 5 LinkedIn posts", "Create a content calendar", "Caption ideas for Instagram", "Twitter thread on our product"],
  support:      ["Draft a response to a complaint", "Write an FAQ article", "Handle a refund request", "Write a support ticket response"],
  docs:         ["Write a business proposal", "Create a project brief", "Draft an executive summary", "Write a meeting summary"],
  projects:     ["Create a 30-day plan", "Build a sprint board", "Write a status report", "Risk assessment template"],
};

function ChatPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialAgent = searchParams.get("agent") || "orchestrator";
  const initialQuery = searchParams.get("q") || "";

  const [selectedAgent, setSelectedAgent] = useState(initialAgent);
  const [inputValue, setInputValue] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const didSendInitial = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, isLoading, clearHistory } = useAgentChat(selectedAgent);

  const currentAgent = AGENTS.find((a) => a.id === selectedAgent) || AGENTS[0];
  const quickPrompts = QUICK_PROMPTS[selectedAgent] || QUICK_PROMPTS.orchestrator;

  useEffect(() => {
    if (initialQuery && !didSendInitial.current && messages.length === 0) {
      didSendInitial.current = true;
      sendMessage(initialQuery);
    }
  }, [initialQuery, messages.length, sendMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;
    setInputValue("");
    await sendMessage(text);
  }, [inputValue, isLoading, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const switchAgent = (agentId: string) => {
    setSelectedAgent(agentId);
    clearHistory();
    didSendInitial.current = false;
    router.push(`/dashboard/chat?agent=${agentId}`);
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#09090B", color: "#F4F4F5", fontFamily: "Inter, system-ui, sans-serif", overflow: "hidden" }}>

      {/* ─── Left Sidebar ─── */}
      {sidebarOpen && (
        <aside style={{
          width: 240, flexShrink: 0,
          background: "#0D0D0F",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex", flexDirection: "column",
          overflowY: "auto",
        }}>
          {/* Header */}
          <div style={{ padding: "16px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", flexShrink: 0 }}>
                🤖
              </div>
              <span style={{ fontWeight: 800, color: "white", fontSize: 14 }}>AgenticAI</span>
            </Link>
            <Link href="/dashboard" style={{
              display: "flex", alignItems: "center", gap: 6, padding: "7px 10px", borderRadius: 8,
              textDecoration: "none", fontSize: 12, fontWeight: 500, color: "#71717A",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#71717A"; }}>
              ← Dashboard
            </Link>
          </div>

          {/* Agents List */}
          <div style={{ padding: "10px 8px", flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#52525B", letterSpacing: "0.1em", padding: "4px 8px", marginBottom: 6 }}>SELECT AGENT</div>
            {AGENTS.map((agent) => {
              const isActive = selectedAgent === agent.id;
              return (
                <button
                  key={agent.id}
                  onClick={() => switchAgent(agent.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", borderRadius: 9,
                    fontSize: 13, fontWeight: isActive ? 700 : 500,
                    color: isActive ? "white" : "#A1A1AA",
                    background: isActive ? "rgba(124,58,237,0.18)" : "transparent",
                    border: isActive ? "1px solid rgba(124,58,237,0.3)" : "1px solid transparent",
                    width: "100%", textAlign: "left", cursor: "pointer", marginBottom: 2,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "white"; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#A1A1AA"; } }}
                >
                  <div style={{ width: 28, height: 28, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, background: agent.color, flexShrink: 0 }}>
                    {agent.icon}
                  </div>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{agent.name}</span>
                  {isActive && (
                    <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#10B981", flexShrink: 0 }} />
                  )}
                </button>
              );
            })}
          </div>
        </aside>
      )}

      {/* ─── Main Chat Area ─── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Chat Header */}
        <div style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 20px", height: 58,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(9,9,11,0.9)", backdropFilter: "blur(16px)",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: "none", border: "none", color: "#71717A", cursor: "pointer", padding: 4, borderRadius: 6, display: "flex", alignItems: "center" }}>
              ☰
            </button>
            <div style={{ width: 36, height: 36, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, background: currentAgent.color }}>
              {currentAgent.icon}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "white", fontSize: 15 }}>{currentAgent.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#71717A" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
                Online · Ready to help
              </div>
            </div>
          </div>
          <button
            onClick={() => { clearHistory(); didSendInitial.current = false; }}
            style={{
              display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8,
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              color: "#71717A", fontSize: 12, fontWeight: 600, cursor: "pointer",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "white"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#71717A"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
            ↺ Clear
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px" }}>
          {messages.length === 0 && !isLoading && (
            <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", paddingTop: 48 }}>
              {/* Agent welcome */}
              <div style={{ width: 64, height: 64, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, background: currentAgent.color, margin: "0 auto 20px" }}>
                {currentAgent.icon}
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 8 }}>
                Chat with {currentAgent.name}
              </h2>
              <p style={{ fontSize: 14, color: "#71717A", marginBottom: 28, lineHeight: 1.6 }}>
                Your AI specialist is ready. Type a message below or pick a quick prompt to get started.
              </p>
              {/* Quick prompts */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    style={{
                      padding: "12px 14px", borderRadius: 10, textAlign: "left",
                      background: "#18181B", border: "1px solid rgba(255,255,255,0.07)",
                      color: "#D4D4D8", fontSize: 13, fontWeight: 500, cursor: "pointer",
                      lineHeight: 1.4, transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)"; e.currentTarget.style.color = "white"; e.currentTarget.style.background = "rgba(124,58,237,0.08)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#D4D4D8"; e.currentTarget.style.background = "#18181B"; }}>
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} style={{
              display: "flex", flexDirection: "column",
              alignItems: msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: 16, maxWidth: 800, margin: "0 auto 16px",
            }}>
              {msg.role === "assistant" && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, background: currentAgent.color }}>
                    {currentAgent.icon}
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#71717A" }}>{currentAgent.name}</span>
                  <span style={{ fontSize: 11, color: "#3F3F46" }}>{msg.timestamp}</span>
                </div>
              )}
              <div style={{
                maxWidth: "80%",
                padding: "12px 16px",
                borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                fontSize: 14, lineHeight: 1.6,
                background: msg.role === "user"
                  ? "linear-gradient(135deg,#7C3AED,#4F46E5)"
                  : "#1C1C1F",
                color: "white",
                border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.07)" : "none",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}>
                {msg.content}
              </div>
              {msg.role === "user" && (
                <span style={{ fontSize: 11, color: "#3F3F46", marginTop: 4 }}>{msg.timestamp}</span>
              )}
            </div>
          ))}

          {isLoading && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 16, maxWidth: 800, margin: "0 auto 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <div style={{ width: 22, height: 22, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, background: currentAgent.color }}>
                  {currentAgent.icon}
                </div>
              </div>
              <div style={{
                padding: "12px 18px", borderRadius: "16px 16px 16px 4px",
                background: "#1C1C1F", border: "1px solid rgba(255,255,255,0.07)",
                display: "flex", alignItems: "center", gap: 4,
              }}>
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "16px 20px 20px",
          background: "#09090B",
          flexShrink: 0,
        }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{
              display: "flex", alignItems: "flex-end", gap: 10,
              background: "#18181B",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14, padding: "10px 12px",
              transition: "border-color 0.2s",
            }}
              onFocusCapture={e => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)"; }}
              onBlurCapture={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Message ${currentAgent.name}… (Enter to send, Shift+Enter for new line)`}
                rows={1}
                style={{
                  flex: 1, background: "none", border: "none", outline: "none",
                  color: "white", fontSize: 14, lineHeight: 1.5, resize: "none",
                  fontFamily: "inherit", maxHeight: 120, overflowY: "auto",
                  placeholderColor: "#52525B",
                }}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                style={{
                  width: 36, height: 36, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
                  background: inputValue.trim() && !isLoading ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "#27272A",
                  border: "none", cursor: inputValue.trim() && !isLoading ? "pointer" : "not-allowed",
                  color: "white", fontSize: 16, flexShrink: 0, transition: "all 0.15s",
                }}>
                {isLoading ? "⏳" : "↑"}
              </button>
            </div>
            <p style={{ fontSize: 11, color: "#3F3F46", textAlign: "center", marginTop: 8 }}>
              Powered by Claude AI · Results may vary
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#09090B" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 12px" }}>
            🤖
          </div>
          <div style={{ color: "#71717A", fontSize: 14 }}>Loading chat…</div>
        </div>
      </div>
    }>
      <ChatPageInner />
    </Suspense>
  );
}
