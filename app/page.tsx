"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  Sparkles, Bot, Calendar, Mail, Search, BarChart3, Users, FileText,
  MessageSquare, CheckCircle, ArrowRight, Play, Star, Zap, Shield,
  ChevronRight, Globe, Clock, TrendingUp
} from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

const services = [
  { icon: Bot, title: "Administrative Support", desc: "Meeting agendas, CRM updates, travel planning, follow-up emails, and reports handled automatically.", color: "from-blue-500/20 to-indigo-500/20", border: "border-blue-800/40", iconColor: "text-blue-400" },
  { icon: BarChart3, title: "Project Management", desc: "AI creates project plans, tracks milestones, monitors deadlines, and generates status reports.", color: "from-purple-500/20 to-violet-500/20", border: "border-purple-800/40", iconColor: "text-purple-400" },
  { icon: Calendar, title: "Smart Scheduling", desc: "Intelligent calendar management, automated reminders, and seamless meeting rescheduling.", color: "from-emerald-500/20 to-teal-500/20", border: "border-emerald-800/40", iconColor: "text-emerald-400" },
  { icon: Mail, title: "Email Management", desc: "Categorizes your inbox, summarizes key messages, and drafts professional responses.", color: "from-amber-500/20 to-orange-500/20", border: "border-amber-800/40", iconColor: "text-amber-400" },
  { icon: Search, title: "Business Research", desc: "Deep web research, competitor analysis, and structured summaries delivered instantly.", color: "from-cyan-500/20 to-sky-500/20", border: "border-cyan-800/40", iconColor: "text-cyan-400" },
  { icon: Globe, title: "Social Media", desc: "Post ideas, caption writing, hashtag research, and content calendar management.", color: "from-pink-500/20 to-rose-500/20", border: "border-pink-800/40", iconColor: "text-pink-400" },
  { icon: MessageSquare, title: "Customer Support", desc: "24/7 FAQ handling, product info, and intelligent issue routing to your team.", color: "from-violet-500/20 to-purple-500/20", border: "border-violet-800/40", iconColor: "text-violet-400" },
  { icon: FileText, title: "Document Creation", desc: "Professional reports, proposals, meeting summaries, and business documents on demand.", color: "from-indigo-500/20 to-blue-500/20", border: "border-indigo-800/40", iconColor: "text-indigo-400" },
];

const stats = [
  { value: "10+", label: "Specialized AI Agents", icon: Bot },
  { value: "24/7", label: "Always Available", icon: Clock },
  { value: "500+", label: "Tasks Automated Daily", icon: Zap },
  { value: "99.9%", label: "Uptime Guarantee", icon: Shield },
];

const testimonials = [
  { name: "Sarah Chen", role: "Startup Founder", avatar: "SC", text: "AssistAI handles my entire inbox and scheduling. I reclaimed 15 hours per week. It's like having a full-time EA at a fraction of the cost.", stars: 5 },
  { name: "Marcus Rodriguez", role: "Freelance Consultant", avatar: "MR", text: "The research agent alone is worth the price. I get comprehensive competitor analyses in minutes instead of days.", stars: 5 },
  { name: "Emma Thompson", role: "Small Business Owner", avatar: "ET", text: "From social media to customer support — AssistAI manages it all. My team can focus on what actually matters.", stars: 5 },
];

const plans = [
  {
    name: "Starter", price: 29, period: "month",
    desc: "Perfect for solopreneurs and freelancers",
    features: ["5 tasks/day", "Email & Scheduling agents", "Basic document creation", "Chat interface", "Email support"],
    cta: "Start Free Trial", highlight: false,
  },
  {
    name: "Professional", price: 79, period: "month",
    desc: "The complete AI assistant suite",
    features: ["Unlimited tasks", "All 10 AI agents", "Priority processing", "Team collaboration (3 seats)", "API access", "Priority support"],
    cta: "Get Started", highlight: true, badge: "Most Popular",
  },
  {
    name: "Enterprise", price: 199, period: "month",
    desc: "For growing teams and agencies",
    features: ["Custom AI agents", "Unlimited team seats", "Dedicated account manager", "Custom integrations", "SLA guarantee", "White-label option"],
    cta: "Contact Sales", highlight: false,
  },
];

export default function LandingPage() {
  const featuresRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen bg-navy-900 text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center grid-pattern overflow-hidden pt-20">
        {/* Background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Announcement badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-900/50 border border-primary-700/50 text-primary-300 text-sm font-medium mb-8 animate-in">
            <Sparkles className="w-4 h-4" />
            <span>Powered by Claude AI &amp; GPT-4</span>
            <ChevronRight className="w-4 h-4" />
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 animate-in animate-delay-100">
            Your AI-Powered<br />
            <span className="text-gradient">Virtual Assistant Team</span>
          </h1>

          <p className="text-lg sm:text-xl text-navy-300 max-w-2xl mx-auto mb-10 leading-relaxed animate-in animate-delay-200">
            10 specialized AI agents working 24/7 to handle your admin, scheduling, emails, research, social media, and more. Focus on growing your business — let AI handle the rest.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-in animate-delay-300">
            <Link href="/auth/signup" className="btn btn-primary btn-lg shadow-glow-blue">
              <Sparkles className="w-5 h-5" />
              Start Free Trial
            </Link>
            <button className="btn btn-secondary btn-lg group">
              <Play className="w-5 h-5" />
              Watch Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 text-sm text-navy-400 animate-in animate-delay-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["A", "B", "C", "D"].map((l) => (
                  <div key={l} className="w-7 h-7 rounded-full bg-primary-700 border-2 border-navy-900 flex items-center justify-center text-xs font-bold text-white">{l}</div>
                ))}
              </div>
              <span>2,400+ businesses trust AssistAI</span>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
              <span>4.9/5</span>
            </div>
          </div>

          {/* Hero dashboard mockup */}
          <div className="mt-16 max-w-5xl mx-auto animate-in animate-delay-400">
            <div className="card border-navy-700 overflow-hidden shadow-2xl">
              {/* Browser chrome */}
              <div className="bg-navy-800/80 border-b border-navy-700 px-4 py-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                </div>
                <div className="flex-1 bg-navy-700 rounded-md px-3 py-1 text-xs text-navy-400 text-center">
                  app.assistai.com/dashboard
                </div>
              </div>
              {/* Dashboard mockup */}
              <div className="bg-navy-900/60 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Tasks Completed", value: "24", change: "+12% today", color: "text-emerald-400" },
                    { label: "Emails Handled", value: "87", change: "3 need review", color: "text-amber-400" },
                    { label: "Meetings Booked", value: "6", change: "Next: 2:00 PM", color: "text-blue-400" },
                  ].map(s => (
                    <div key={s.label} className="card p-4">
                      <p className="text-xs text-navy-400 mb-1">{s.label}</p>
                      <p className="text-2xl font-bold text-white">{s.value}</p>
                      <p className={`text-xs mt-1 ${s.color}`}>{s.change}</p>
                    </div>
                  ))}
                </div>
                {/* Chat preview */}
                <div className="card p-4 flex gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-indigo-500 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-white">AI Orchestrator</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <div className="chat-bubble-ai text-xs">Good morning! I've organized your inbox (12 emails), scheduled your 3pm meeting with the team, and drafted the Q2 report. What else can I help with?</div>
                      <div className="chat-bubble-user text-xs">Research our top 3 competitors and prepare a summary.</div>
                      <div className="flex items-center gap-1 text-navy-500 text-xs">
                        <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                        <span className="ml-1">Research Agent is gathering data...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 border-y border-navy-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-900/50 border border-primary-800/50 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-400" />
                  </div>
                </div>
                <p className="text-3xl font-extrabold text-white mb-1">{value}</p>
                <p className="text-sm text-navy-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section ref={featuresRef} id="services" className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="badge badge-blue mb-4">Services</div>
          <h2 className="text-4xl font-extrabold text-white mb-4">Everything Your Business Needs</h2>
          <p className="text-navy-400 text-lg max-w-xl mx-auto">A full team of specialized AI agents, each an expert in their domain, working together seamlessly.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map(({ icon: Icon, title, desc, color, border, iconColor }) => (
            <div key={title} className={`card-hover p-5 bg-gradient-to-br ${color} ${border} group cursor-pointer`}>
              <div className={`w-10 h-10 rounded-lg bg-navy-900/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <h3 className="font-bold text-white mb-2 text-sm">{title}</h3>
              <p className="text-navy-400 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-navy-800/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="badge badge-purple mb-4">How It Works</div>
            <h2 className="text-4xl font-extrabold text-white mb-4">Up &amp; Running in Minutes</h2>
            <p className="text-navy-400 text-lg">Simple onboarding, immediate impact.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Sign Up & Onboard", desc: "Our intake agent learns about your business needs, preferences, and workflows in a friendly conversation.", icon: Users },
              { step: "02", title: "Assign Your First Task", desc: "Tell the AI what you need — the orchestrator routes it to the right specialist agent automatically.", icon: Zap },
              { step: "03", title: "Get Results Instantly", desc: "Receive completed tasks, reports, drafts, and updates directly in your dashboard in real-time.", icon: TrendingUp },
            ].map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="relative">
                <div className="card p-6 h-full">
                  <div className="text-5xl font-black text-primary-800 mb-4 leading-none">{step}</div>
                  <div className="w-10 h-10 rounded-lg bg-primary-900/50 border border-primary-800 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                  <p className="text-navy-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="badge badge-green mb-4">Testimonials</div>
          <h2 className="text-4xl font-extrabold text-white mb-4">Loved by 2,400+ Businesses</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, avatar, text, stars }) => (
            <div key={name} className="card p-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: stars }).map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-navy-300 text-sm leading-relaxed mb-6">&quot;{text}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">{avatar}</div>
                <div>
                  <p className="font-semibold text-white text-sm">{name}</p>
                  <p className="text-navy-500 text-xs">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 bg-navy-800/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="badge badge-amber mb-4">Pricing</div>
            <h2 className="text-4xl font-extrabold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-navy-400 text-lg">14-day free trial · No credit card required · Cancel anytime</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {plans.map(({ name, price, period, desc, features, cta, highlight, badge }) => (
              <div key={name} className={`card p-6 relative ${highlight ? "border-primary-600 shadow-glow-blue scale-105" : ""}`}>
                {badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge badge-blue">{badge}</span>
                  </div>
                )}
                <h3 className="font-bold text-white text-xl mb-1">{name}</h3>
                <p className="text-navy-400 text-sm mb-4">{desc}</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">${price}</span>
                  <span className="text-navy-400 text-sm pb-1">/{period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-navy-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/signup" className={`btn w-full justify-center ${highlight ? "btn-primary" : "btn-secondary"}`}>
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="card bg-gradient-to-br from-primary-900/40 to-indigo-900/40 border-primary-700/30 p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary-500 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-4">Ready to Multiply Your Productivity?</h2>
          <p className="text-navy-300 text-lg mb-8 max-w-xl mx-auto">Join thousands of entrepreneurs using AI agents to work smarter, not harder.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup" className="btn btn-primary btn-lg">
              <Sparkles className="w-5 h-5" />
              Start Your Free Trial
            </Link>
            <Link href="/services" className="btn btn-ghost btn-lg">
              Explore Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
