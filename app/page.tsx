"use client";

import Link from "next/link";
import {
  Sparkles, Bot, Calendar, Mail, Search, BarChart3, FileText,
  MessageSquare, ArrowRight, Star, Zap, Shield, Clock, Globe,
  Users, CheckCircle, Play,
} from "lucide-react";

const agents = [
  {
    id: "admin",
    icon: Bot,
    title: "Admin Assistant",
    desc: "Meeting agendas, CRM updates, travel planning, and follow-up emails handled automatically.",
    color: "from-blue-500/20 to-indigo-500/20",
    border: "border-blue-800/40",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
    sample: "Create a meeting agenda for our Monday standup",
  },
  {
    id: "projects",
    icon: BarChart3,
    title: "Project Manager",
    desc: "Project plans, milestone tracking, deadline monitoring, and status reports generated instantly.",
    color: "from-purple-500/20 to-violet-500/20",
    border: "border-purple-800/40",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10",
    sample: "Create a project plan for launching our new website",
  },
  {
    id: "scheduler",
    icon: Calendar,
    title: "Smart Scheduler",
    desc: "Intelligent calendar management, automated reminders, and seamless meeting coordination.",
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-800/40",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    sample: "Schedule a weekly team standup for Fridays at 9am",
  },
  {
    id: "email",
    icon: Mail,
    title: "Email Manager",
    desc: "Categorizes your inbox, summarizes key messages, and drafts professional responses instantly.",
    color: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-800/40",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
    sample: "Write a follow-up email to a client after a demo call",
  },
  {
    id: "research",
    icon: Search,
    title: "Research Agent",
    desc: "Deep web research, competitor analysis, market trends, and structured summaries on demand.",
    color: "from-cyan-500/20 to-sky-500/20",
    border: "border-cyan-800/40",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10",
    sample: "Research the top 5 competitors in the SaaS CRM space",
  },
  {
    id: "social",
    icon: Globe,
    title: "Social Media",
    desc: "Post ideas, captions, hashtag research, and content calendar management for all platforms.",
    color: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-800/40",
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/10",
    sample: "Write 5 LinkedIn posts about AI productivity tips",
  },
  {
    id: "support",
    icon: MessageSquare,
    title: "Customer Support",
    desc: "24/7 FAQ handling, issue resolution, support response drafting, and knowledge base creation.",
    color: "from-violet-500/20 to-purple-500/20",
    border: "border-violet-800/40",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10",
    sample: "Write a response to an angry customer about a delayed order",
  },
  {
    id: "docs",
    icon: FileText,
    title: "Document Creator",
    desc: "Professional reports, proposals, briefs, and business documents created in seconds.",
    color: "from-indigo-500/20 to-blue-500/20",
    border: "border-indigo-800/40",
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-500/10",
    sample: "Create a business proposal template for a software project",
  },
];

const stats = [
  { value: "8", label: "Specialized AI Agents", icon: Bot },
  { value: "24/7", label: "Always Available", icon: Clock },
  { value: "Free", label: "No Subscription", icon: Zap },
  { value: "100%", label: "Powered by Claude AI", icon: Shield },
];

const howItWorks = [
  {
    step: "01",
    title: "Choose Your Agent",
    desc: "Pick from 8 specialized AI agents, each trained for a specific business function.",
    icon: Users,
  },
  {
    step: "02",
    title: "Describe Your Task",
    desc: "Tell the agent what you need in plain English — no technical knowledge required.",
    icon: MessageSquare,
  },
  {
    step: "03",
    title: "Get Instant Results",
    desc: "Receive professional-quality output in seconds — drafts, plans, research, and more.",
    icon: Zap,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-navy-900 text-white overflow-x-hidden">
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-900/80 backdrop-blur-md border-b border-navy-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-lg">AssistAI</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-navy-400">
            <a href="#agents" className="hover:text-white transition-colors">Agents</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          </div>
          <Link
            href="/dashboard"
            className="btn btn-primary btn-sm"
          >
            <Sparkles className="w-4 h-4" />
            Launch App
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center grid-pattern overflow-hidden pt-20">
        {/* Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary-600/8 blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-indigo-600/8 blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-900/60 border border-primary-700/50 text-primary-300 text-sm font-medium mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Powered by Claude AI · Free to Use</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight">
            Your AI-Powered<br />
            <span className="text-gradient">Virtual Assistant Team</span>
          </h1>

          <p className="text-lg sm:text-xl text-navy-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            8 specialized AI agents working 24/7 to handle your admin, scheduling, emails,
            research, social media, and more. No subscription. Just results.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link href="/dashboard" className="btn btn-primary btn-lg shadow-glow-blue w-full sm:w-auto justify-center">
              <Sparkles className="w-5 h-5" />
              Start Using Agents — Free
            </Link>
            <a href="#agents" className="btn btn-secondary btn-lg w-full sm:w-auto justify-center group">
              <Play className="w-4 h-4" />
              See All Agents
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Social proof row */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-navy-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["SC", "MR", "ET", "JL"].map((initials) => (
                  <div
                    key={initials}
                    className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-600 to-indigo-600 border-2 border-navy-900 flex items-center justify-center text-[10px] font-bold text-white"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <span>2,400+ businesses trust AssistAI</span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
              <span className="ml-1">4.9/5 rating</span>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-navy-700 overflow-hidden shadow-2xl bg-navy-800">
              {/* Browser chrome */}
              <div className="bg-navy-800 border-b border-navy-700 px-4 py-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                </div>
                <div className="flex-1 bg-navy-700/60 rounded-md px-3 py-1 text-xs text-navy-400 text-center max-w-xs mx-auto">
                  agenticdatalogic.com/dashboard
                </div>
              </div>
              {/* Mockup content */}
              <div className="bg-navy-900/80 p-5">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Tasks Today", value: "24", color: "text-emerald-400" },
                    { label: "Emails Handled", value: "87", color: "text-amber-400" },
                    { label: "Hours Saved", value: "4.2", color: "text-blue-400" },
                  ].map((s) => (
                    <div key={s.label} className="bg-navy-800 border border-navy-700 rounded-xl p-4">
                      <p className="text-xs text-navy-400 mb-1">{s.label}</p>
                      <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-navy-800 border border-navy-700 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-white">AI Orchestrator</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
                  </div>
                  <div className="space-y-2">
                    <div className="bg-navy-700/60 border border-navy-600/40 text-navy-100 rounded-2xl rounded-tl-sm px-4 py-2.5 text-xs max-w-sm">
                      Good morning! I&apos;ve organized your inbox (12 emails), scheduled your 3pm team meeting, and drafted the Q2 report. What else can I help with?
                    </div>
                    <div className="bg-primary-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-xs max-w-xs ml-auto">
                      Research our top 3 competitors and summarize findings.
                    </div>
                    <div className="flex items-center gap-1 text-navy-500 text-xs pl-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "300ms" }} />
                      <span className="ml-1">Research Agent is working…</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-14 border-y border-navy-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-11 h-11 rounded-xl bg-primary-900/50 border border-primary-800/50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary-400" />
                  </div>
                </div>
                <p className="text-3xl font-extrabold text-white mb-1">{value}</p>
                <p className="text-sm text-navy-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGENTS ── */}
      <section id="agents" className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="badge badge-blue mb-4">AI Agents</div>
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Click Any Agent to Start Working
          </h2>
          <p className="text-navy-400 text-lg max-w-xl mx-auto">
            Each agent is a specialist. Select one and start chatting — they work immediately, no setup required.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map(({ id, icon: Icon, title, desc, color, border, iconColor, iconBg, sample }) => (
            <Link
              key={id}
              href={`/dashboard/chat?agent=${id}&q=${encodeURIComponent(sample)}`}
              className={`group relative bg-gradient-to-br ${color} ${border} border rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 hover:scale-[1.03] hover:shadow-lg cursor-pointer`}
            >
              <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm mb-1">{title}</h3>
                <p className="text-navy-400 text-xs leading-relaxed">{desc}</p>
              </div>
              <div className="mt-auto flex items-center gap-1 text-xs font-semibold text-navy-400 group-hover:text-white transition-colors">
                Try now <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 bg-navy-800/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="badge badge-purple mb-4">How It Works</div>
            <h2 className="text-4xl font-extrabold text-white mb-4">Up &amp; Running in Seconds</h2>
            <p className="text-navy-400 text-lg">No sign-up. No credit card. Just open and start working.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {howItWorks.map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="bg-navy-800 border border-navy-700 rounded-2xl p-6">
                <div className="text-5xl font-black text-primary-900 mb-4 leading-none">{step}</div>
                <div className="w-10 h-10 rounded-xl bg-primary-900/50 border border-primary-800 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary-400" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                <p className="text-navy-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="badge badge-green mb-4">Testimonials</div>
          <h2 className="text-4xl font-extrabold text-white mb-4">Loved by Businesses Worldwide</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { name: "Sarah Chen", role: "Startup Founder", avatar: "SC", text: "AssistAI handles my entire inbox and scheduling. I reclaimed 15 hours per week. It's like having a full-time EA for free.", stars: 5 },
            { name: "Marcus Rodriguez", role: "Freelance Consultant", avatar: "MR", text: "The research agent alone is incredible. I get comprehensive competitor analyses in minutes instead of days.", stars: 5 },
            { name: "Emma Thompson", role: "Small Business Owner", avatar: "ET", text: "From social media to customer support — AssistAI manages it all. My team can focus on what actually matters.", stars: 5 },
          ].map(({ name, role, avatar, text, stars }) => (
            <div key={name} className="bg-navy-800 border border-navy-700 rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-navy-300 text-sm leading-relaxed mb-5">&quot;{text}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  {avatar}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{name}</p>
                  <p className="text-navy-500 text-xs">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-900/50 to-indigo-900/40 border border-primary-700/30 rounded-3xl p-12 text-center">
          <div className="absolute inset-0 grid-pattern opacity-50" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-glow-blue">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Ready to Multiply Your Productivity?
            </h2>
            <p className="text-navy-300 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of businesses using AI agents to work smarter. Free, forever.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard" className="btn btn-primary btn-lg shadow-glow-blue w-full sm:w-auto justify-center">
                <Sparkles className="w-5 h-5" />
                Launch the App — Free
              </Link>
              <a href="#agents" className="btn btn-ghost btn-lg w-full sm:w-auto justify-center">
                Browse Agents
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-navy-500">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              No sign-up required · No credit card · Instant access
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-navy-800 py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-white">AssistAI</span>
          </div>
          <p className="text-sm text-navy-500">© 2026 AgenticDataLogic. Powered by Claude AI.</p>
          <div className="flex items-center gap-4 text-sm text-navy-500">
            <a href="#agents" className="hover:text-white transition-colors">Agents</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
