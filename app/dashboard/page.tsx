"use client";
import Link from "next/link";

const AGENTS = [
  { id: "orchestrator", icon: "🧠", name: "AI Orchestrator",   desc: "Routes to specialists", color: "linear-gradient(135deg,#7C3AED,#6366F1)", sample: "What can you help me with today?" },
  { id: "admin",        icon: "📋", name: "Admin Assistant",    desc: "Meetings & CRM",        color: "linear-gradient(135deg,#2563EB,#0EA5E9)", sample: "Draft a meeting agenda for Monday" },
  { id: "email",        icon: "✉️", name: "Email Manager",      desc: "Drafts & replies",      color: "linear-gradient(135deg,#06B6D4,#0EA5E9)", sample: "Help me write a professional email" },
  { id: "scheduler",    icon: "🗓️", name: "Scheduler",          desc: "Calendar & reminders",  color: "linear-gradient(135deg,#F97316,#F59E0B)", sample: "Schedule a team meeting for next week" },
  { id: "research",     icon: "🔍", name: "Research Agent",     desc: "Market insights",       color: "linear-gradient(135deg,#10B981,#14B8A6)", sample: "Research our top 3 competitors" },
  { id: "social",       icon: "📱", name: "Social Media",       desc: "Posts & captions",      color: "linear-gradient(135deg,#EC4899,#8B5CF6)", sample: "Write 5 LinkedIn posts for our launch" },
  { id: "support",      icon: "💬", name: "Customer Support",   desc: "FAQs & tickets",        color: "linear-gradient(135deg,#F59E0B,#EF4444)", sample: "Draft a response to a customer issue" },
  { id: "docs",         icon: "📄", name: "Document Creator",   desc: "Reports & proposals",   color: "linear-gradient(135deg,#F43F5E,#EC4899)", sample: "Write a business proposal template" },
  { id: "projects",     icon: "🚀", name: "Project Manager",    desc: "Plans & milestones",    color: "linear-gradient(135deg,#6366F1,#4F46E5)", sample: "Create a 30-day project plan" },
];

const QUICK_ACTIONS = [
  { label: "Draft an email", icon: "✉️", agent: "email",     q: "Help me draft a professional email" },
  { label: "Plan my week",   icon: "🗓️", agent: "scheduler",  q: "Help me plan and organize my schedule for this week" },
  { label: "Research topic", icon: "🔍", agent: "research",   q: "Research and give me key insights on a topic" },
  { label: "Write a post",   icon: "📱", agent: "social",     q: "Write an engaging LinkedIn post for my business" },
  { label: "Start a project",icon: "🚀", agent: "projects",   q: "Help me create a structured project plan" },
];

export default function DashboardPage() {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#09090B", color: "#F4F4F5", fontFamily: "Inter, system-ui, sans-serif" }}>

      {/* ─── Sidebar ─── */}
      <aside style={{
        width: 240, flexShrink: 0,
        background: "#0D0D0F",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex", flexDirection: "column",
        position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 40,
        overflowY: "auto",
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", flexShrink: 0 }}>
              🤖
            </div>
            <span style={{ fontWeight: 800, color: "white", fontSize: 15, letterSpacing: "-0.02em" }}>AgenticAI</span>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ padding: "12px 8px", flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#52525B", letterSpacing: "0.1em", padding: "4px 8px", marginBottom: 4 }}>NAVIGATION</div>
          <Link href="/dashboard" style={{
            display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8,
            textDecoration: "none", fontSize: 13, fontWeight: 600, color: "white",
            background: "rgba(124,58,237,0.18)", border: "1px solid rgba(124,58,237,0.3)",
            marginBottom: 2,
          }}>
            <span>🏠</span> Dashboard
          </Link>
          <Link href="/dashboard/chat" style={{
            display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8,
            textDecoration: "none", fontSize: 13, fontWeight: 500, color: "#A1A1AA",
            marginBottom: 2,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "white"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#A1A1AA"; }}>
            <span>💬</span> Chat
          </Link>

          <div style={{ fontSize: 10, fontWeight: 700, color: "#52525B", letterSpacing: "0.1em", padding: "12px 8px 4px" }}>AGENTS</div>
          {AGENTS.map((a) => (
            <Link key={a.id} href={`/dashboard/chat?agent=${a.id}&q=${encodeURIComponent(a.sample)}`} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8,
              textDecoration: "none", fontSize: 12, fontWeight: 500, color: "#71717A",
              marginBottom: 1,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#71717A"; }}>
              <span style={{ fontSize: 14 }}>{a.icon}</span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.name}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{
            padding: "10px 12px", borderRadius: 10,
            background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)",
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#A78BFA", marginBottom: 4 }}>✨ Claude AI Powered</div>
            <div style={{ fontSize: 11, color: "#71717A" }}>Free to use · No subscription</div>
          </div>
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <main style={{ marginLeft: 240, flex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <div style={{
          position: "sticky", top: 0, zIndex: 30,
          background: "rgba(9,9,11,0.90)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 32px", height: 60,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: "white" }}>Dashboard</h1>
          <Link href="/dashboard/chat" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700, color: "white",
            background: "linear-gradient(135deg,#7C3AED,#4F46E5)", textDecoration: "none",
          }}>
            ✨ New Chat
          </Link>
        </div>

        {/* Content */}
        <div style={{ padding: "32px", flex: 1 }}>
          {/* Greeting */}
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 4 }}>
              {greeting} 👋
            </h2>
            <p style={{ fontSize: 15, color: "#71717A" }}>Your AI team is online and ready. What would you like to delegate today?</p>
          </div>

          {/* Quick actions */}
          <div style={{ marginBottom: 40 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#71717A", letterSpacing: "0.06em", marginBottom: 12, textTransform: "uppercase" }}>Quick Actions</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {QUICK_ACTIONS.map((q) => (
                <Link key={q.label} href={`/dashboard/chat?agent=${q.agent}&q=${encodeURIComponent(q.q)}`} style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "8px 16px", borderRadius: 99, fontSize: 13, fontWeight: 600,
                  background: "#18181B", border: "1px solid rgba(255,255,255,0.08)",
                  color: "#D4D4D8", textDecoration: "none", transition: "all 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)"; e.currentTarget.style.color = "white"; e.currentTarget.style.background = "rgba(124,58,237,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#D4D4D8"; e.currentTarget.style.background = "#18181B"; }}>
                  <span>{q.icon}</span> {q.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Agent Cards Grid */}
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#71717A", letterSpacing: "0.06em", marginBottom: 16, textTransform: "uppercase" }}>All Agents</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
              {AGENTS.map((agent) => (
                <Link
                  key={agent.id}
                  href={`/dashboard/chat?agent=${agent.id}&q=${encodeURIComponent(agent.sample)}`}
                  style={{
                    display: "flex", flexDirection: "column", gap: 12, padding: 18,
                    background: "#18181B",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 14, textDecoration: "none",
                    transition: "all 0.2s",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(124,58,237,0.45)";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.35), 0 0 0 1px rgba(124,58,237,0.15)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.25)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: 18, flexShrink: 0,
                      background: agent.color,
                    }}>
                      {agent.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: "white", fontSize: 14 }}>{agent.name}</div>
                      <div style={{ fontSize: 12, color: "#71717A", marginTop: 1 }}>{agent.desc}</div>
                    </div>
                  </div>
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.05)",
                  }}>
                    <span style={{ fontSize: 12, color: "#52525B" }}>Click to chat</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#7C3AED" }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
