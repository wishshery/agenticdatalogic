"use client";
import Link from "next/link";

const AGENTS = [
  {
    id: "orchestrator",
    icon: "🧠",
    name: "AI Orchestrator",
    desc: "Routes tasks to the best specialist agent automatically",
    color: "agent-icon-violet",
    sample: "I need to plan a product launch — where do I start?",
  },
  {
    id: "admin",
    icon: "📋",
    name: "Admin Assistant",
    desc: "Meetings, CRM updates, travel planning & follow-ups",
    color: "agent-icon-blue",
    sample: "Draft a meeting agenda for our Q2 planning session",
  },
  {
    id: "email",
    icon: "✉️",
    name: "Email Manager",
    desc: "Drafts, summaries, inbox triage & professional replies",
    color: "agent-icon-cyan",
    sample: "Write a follow-up email to a client after a demo",
  },
  {
    id: "scheduler",
    icon: "🗓️",
    name: "Scheduler",
    desc: "Calendar management, reminders & time-zone coordination",
    color: "agent-icon-orange",
    sample: "Schedule a team standup across 3 time zones",
  },
  {
    id: "research",
    icon: "🔍",
    name: "Research Agent",
    desc: "Competitor analysis, market research & industry insights",
    color: "agent-icon-green",
    sample: "Analyze our top 3 competitors in the SaaS market",
  },
  {
    id: "social",
    icon: "📱",
    name: "Social Media",
    desc: "Posts, captions, hashtags & content calendar strategy",
    color: "agent-icon-pink",
    sample: "Write 5 LinkedIn posts for our product launch",
  },
  {
    id: "support",
    icon: "💬",
    name: "Customer Support",
    desc: "FAQ responses, ticket handling & knowledge base articles",
    color: "agent-icon-amber",
    sample: "Draft a response to a frustrated customer complaint",
  },
  {
    id: "docs",
    icon: "📄",
    name: "Document Creator",
    desc: "Reports, proposals, briefs & structured documents",
    color: "agent-icon-rose",
    sample: "Write a business proposal for a new enterprise client",
  },
  {
    id: "projects",
    icon: "🚀",
    name: "Project Manager",
    desc: "Project plans, milestones, status reports & risk tracking",
    color: "agent-icon-indigo",
    sample: "Create a 30-day project plan for a website redesign",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Choose Your Agent",
    desc: "Pick from 9 specialized AI agents, each trained for a specific role in your business.",
    icon: "🎯",
  },
  {
    num: "02",
    title: "Describe Your Task",
    desc: "Tell the agent what you need in plain English — no prompting skills required.",
    icon: "💬",
  },
  {
    num: "03",
    title: "Get Results Instantly",
    desc: "Receive professional-quality output in seconds. Edit, refine, or use as-is.",
    icon: "⚡",
  },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#09090B", color: "#F4F4F5", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* ─── Navbar ─── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(9,9,11,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: "linear-gradient(135deg,#7C3AED,#4F46E5)" }}>
              🤖
            </div>
            <span style={{ fontWeight: 800, color: "white", fontSize: 18, letterSpacing: "-0.02em" }}>AgenticAI</span>
          </div>
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <a href="#agents" style={{ padding: "8px 16px", fontSize: 14, color: "#A1A1AA", borderRadius: 8, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "white")}
              onMouseLeave={e => (e.currentTarget.style.color = "#A1A1AA")}>
              Agents
            </a>
            <a href="#how-it-works" style={{ padding: "8px 16px", fontSize: 14, color: "#A1A1AA", borderRadius: 8, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "white")}
              onMouseLeave={e => (e.currentTarget.style.color = "#A1A1AA")}>
              How It Works
            </a>
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/dashboard" style={{
              display: "inline-flex", alignItems: "center", padding: "8px 16px",
              borderRadius: 10, fontSize: 14, fontWeight: 600, color: "#A78BFA",
              border: "1px solid rgba(124,58,237,0.4)", textDecoration: "none",
              background: "transparent",
            }}>
              Dashboard
            </Link>
            <Link href="/dashboard" style={{
              display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 20px",
              borderRadius: 10, fontSize: 14, fontWeight: 700, color: "white",
              background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
              textDecoration: "none",
              boxShadow: "0 0 20px rgba(124,58,237,0.35)",
            }}>
              Launch App →
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 64 }}>
        {/* Grid dots background */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(148,163,184,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        {/* Glow blobs */}
        <div style={{ position: "absolute", top: "10%", left: "15%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "35%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,70,229,0.15), transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "96px 24px", width: "100%", textAlign: "center" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 99, fontSize: 12, fontWeight: 600,
            background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#A78BFA",
            marginBottom: 32,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#A78BFA" }} />
            Powered by Claude AI · Free to Use
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 24, color: "white" }}>
            Your AI-Powered<br />
            <span style={{ background: "linear-gradient(135deg, #A78BFA 0%, #818CF8 50%, #67E8F9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Virtual Assistant Team
            </span>
          </h1>

          <p style={{ fontSize: 20, color: "#71717A", lineHeight: 1.6, maxWidth: 580, margin: "0 auto 48px", fontWeight: 400 }}>
            9 specialized AI agents working 24/7 to handle your admin, scheduling,
            emails, research, social media, and more. No subscription. Just results.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginBottom: 72 }}>
            <Link href="/dashboard" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "16px 32px", borderRadius: 12, fontWeight: 800, color: "white", fontSize: 16,
              background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
              boxShadow: "0 0 40px rgba(124,58,237,0.45)",
              textDecoration: "none",
              transition: "transform 0.2s",
            }}>
              ✨ Start Using Agents — Free
            </Link>
            <a href="#agents" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "16px 32px", borderRadius: 12, fontWeight: 600, color: "#A1A1AA", fontSize: 16,
              border: "1px solid rgba(255,255,255,0.1)",
              textDecoration: "none",
              background: "rgba(255,255,255,0.03)",
            }}>
              See All Agents →
            </a>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
            {[
              { value: "9", label: "Specialized Agents" },
              { value: "24/7", label: "Always Available" },
              { value: "Free", label: "No Subscription" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: "white", marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: "#52525B", fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Agent Grid ─── */}
      <section id="agents" style={{ position: "relative", padding: "96px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 12px", borderRadius: 99, fontSize: 11, fontWeight: 700,
              background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)",
              color: "#A78BFA", letterSpacing: "0.08em", marginBottom: 16,
            }}>
              MEET YOUR TEAM
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "white", letterSpacing: "-0.03em", marginBottom: 16 }}>
              9 Agents. Every Task Covered.
            </h2>
            <p style={{ fontSize: 18, color: "#71717A", maxWidth: 500, margin: "0 auto" }}>
              Each specialist is purpose-built and ready to work. Click any agent to start immediately.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
            {AGENTS.map((agent) => (
              <Link
                key={agent.id}
                href={`/dashboard/chat?agent=${agent.id}&q=${encodeURIComponent(agent.sample)}`}
                style={{
                  display: "flex", flexDirection: "column", gap: 12,
                  padding: 20,
                  background: "#18181B",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 16,
                  textDecoration: "none",
                  transition: "all 0.2s",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)";
                  e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,58,237,0.2)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div className={`agent-icon ${agent.color}`} style={{ fontSize: 20 }}>{agent.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontWeight: 700, color: "white", fontSize: 15, marginBottom: 4 }}>{agent.name}</h3>
                    <p style={{ color: "#71717A", fontSize: 13, lineHeight: 1.4 }}>{agent.desc}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: 12, color: "#52525B", fontStyle: "italic", flex: 1, marginRight: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    &ldquo;{agent.sample.slice(0, 44)}…&rdquo;
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#7C3AED", flexShrink: 0 }}>Try →</span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <Link href="/dashboard" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 32px", borderRadius: 12, fontWeight: 700, color: "white", fontSize: 14,
              background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
              boxShadow: "0 0 24px rgba(124,58,237,0.3)",
              textDecoration: "none",
            }}>
              Open Dashboard — All Agents
            </Link>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how-it-works" style={{ padding: "96px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 12px", borderRadius: 99, fontSize: 11, fontWeight: 700,
              background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)",
              color: "#34D399", letterSpacing: "0.08em", marginBottom: 16,
            }}>
              HOW IT WORKS
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "white", letterSpacing: "-0.03em" }}>
              From Idea to Output<br />
              <span style={{ background: "linear-gradient(135deg, #A78BFA 0%, #67E8F9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                in Under 10 Seconds
              </span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {STEPS.map((step) => (
              <div key={step.num} style={{
                padding: 32, background: "#18181B",
                border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16,
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>{step.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#7C3AED", letterSpacing: "0.1em", marginBottom: 8 }}>{step.num}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "white", marginBottom: 12 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "#71717A", lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section style={{ padding: "96px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div style={{
            padding: "64px 48px",
            background: "#18181B",
            border: "1px solid rgba(124,58,237,0.2)",
            borderRadius: 24,
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 0 60px rgba(124,58,237,0.1)",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(124,58,237,0.06), rgba(79,70,229,0.06))" }} />
            <div style={{ position: "relative" }}>
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "white", letterSpacing: "-0.03em", marginBottom: 16 }}>
                Ready to{" "}
                <span style={{ background: "linear-gradient(135deg, #A78BFA, #67E8F9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  delegate everything?
                </span>
              </h2>
              <p style={{ fontSize: 18, color: "#71717A", marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
                Your AI team is online and ready. No setup, no subscriptions — just pick an agent and go.
              </p>
              <Link href="/dashboard" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "16px 40px", borderRadius: 12, fontWeight: 800, color: "white", fontSize: 16,
                background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
                boxShadow: "0 0 40px rgba(124,58,237,0.45)",
                textDecoration: "none",
              }}>
                ✨ Launch Your AI Team — Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "40px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, background: "linear-gradient(135deg,#7C3AED,#4F46E5)" }}>
              🤖
            </div>
            <span style={{ fontWeight: 800, color: "white", fontSize: 15 }}>AgenticAI</span>
          </div>
          <p style={{ fontSize: 13, color: "#3F3F46" }}>Powered by Claude AI · agenticdatalogic.com</p>
          <Link href="/dashboard" style={{ fontSize: 13, color: "#71717A", textDecoration: "none", fontWeight: 600 }}>
            Open Dashboard →
          </Link>
        </div>
      </footer>
    </div>
  );
}
