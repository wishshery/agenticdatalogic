"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckSquare, MessageSquare, Calendar, FileText, Bot,
  Clock, CheckCircle2, ArrowRight, Zap, Mail, Search,
  BarChart3, Users, Globe, Sparkles,
} from "lucide-react";

const AGENTS = [
  { id: "orchestrator", name: "AI Orchestrator", icon: Bot, color: "text-primary-400", bg: "bg-primary-500/10", border: "border-primary-800/50", desc: "Your general AI assistant — routes tasks to specialists", status: "active" },
  { id: "admin", name: "Admin Assistant", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-800/50", desc: "Meetings, travel, CRM updates, follow-ups", status: "active" },
  { id: "email", name: "Email Manager", icon: Mail, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-800/50", desc: "Inbox management, drafts, responses", status: "active" },
  { id: "scheduler", name: "Scheduler", icon: Calendar, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-800/50", desc: "Calendar, meetings, reminders", status: "idle" },
  { id: "research", name: "Research Agent", icon: Search, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-800/50", desc: "Competitors, market research, industry analysis", status: "active" },
  { id: "social", name: "Social Media", icon: Globe, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-800/50", desc: "Posts, captions, content calendars", status: "idle" },
  { id: "support", name: "Customer Support", icon: MessageSquare, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-800/50", desc: "FAQs, responses, knowledge base", status: "idle" },
  { id: "docs", name: "Document Creator", icon: FileText, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-800/50", desc: "Reports, proposals, briefs", status: "idle" },
  { id: "projects", name: "Project Manager", icon: BarChart3, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-800/50", desc: "Plans, milestones, status reports", status: "active" },
];

const statCards = [
  { label: "Tasks Completed", value: "24", change: "+8 today", up: true, icon: CheckSquare, color: "bg-primary-500/10 text-primary-400" },
  { label: "Active Agents", value: "4", change: "of 9 running", up: null, icon: Bot, color: "bg-emerald-500/10 text-emerald-400" },
  { label: "Emails Handled", value: "87", change: "3 need review", up: null, icon: Mail, color: "bg-amber-500/10 text-amber-400" },
  { label: "Hours Saved", value: "4.2", change: "+1.1h vs yesterday", up: true, icon: Clock, color: "bg-indigo-500/10 text-indigo-400" },
];

const recentTasks = [
  { id: 1, title: "Draft Q2 investor update email", agent: "Email Manager", status: "completed", time: "2m ago", priority: "high" },
  { id: 2, title: "Research competitor pricing strategies", agent: "Research Agent", status: "in_progress", time: "5m ago", priority: "medium" },
  { id: 3, title: "Schedule weekly team standup", agent: "Scheduler", status: "completed", time: "10m ago", priority: "low" },
  { id: 4, title: "Create project brief for new client", agent: "Document Creator", status: "pending", time: "1h ago", priority: "high" },
  { id: 5, title: "Update CRM with meeting notes", agent: "Admin Assistant", status: "completed", time: "2h ago", priority: "medium" },
];

export default function DashboardPage() {
  const [greeting, setGreeting] = useState("Good morning");

  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 12 && h < 18) setGreeting("Good afternoon");
    else if (h >= 18) setGreeting("Good evening");
  }, []);

  const priorityBadge = (priority: string) => {
    const map: Record<string, string> = { high: "badge-red", medium: "badge-amber", low: "badge-blue" };
    return <span className={`badge ${map[priority] || "badge-blue"}`}>{priority}</span>;
  };

  const taskStatusIcon = (status: string) => {
    if (status === "completed") return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
    if (status === "in_progress") return <Clock className="w-4 h-4 text-amber-400" />;
    return <div className="w-4 h-4 rounded-full border-2 border-navy-600" />;
  };

  const statusDot = (status: string) => {
    if (status === "active") return <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />;
    return <span className="w-2 h-2 rounded-full bg-navy-600" />;
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{greeting}! 👋</h1>
          <p className="text-navy-400 text-sm mt-1">Your AI team is ready. Click any agent to start chatting.</p>
        </div>
        <Link href="/dashboard/chat" className="btn btn-primary btn-sm hidden sm:flex">
          <Zap className="w-4 h-4" />
          Ask AI
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, change, up, icon: Icon, color }) => (
          <div key={label} className="stat-card">
            <div className={`stat-icon ${color}`}><Icon className="w-5 h-5" /></div>
            <div className="flex-1 min-w-0">
              <p className="stat-value">{value}</p>
              <p className="stat-label">{label}</p>
              <p className={up === true ? "stat-change-up" : "text-xs text-navy-500 mt-1"}>
                {up === true && "↑ "}{change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* AI Agents Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary-400" />
            Your AI Agents — Click to Chat
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {AGENTS.map(({ id, name, icon: Icon, color, bg, border, desc, status }) => (
            <Link
              key={id}
              href={`/dashboard/chat?agent=${id}`}
              className={`flex items-center gap-3 p-4 rounded-xl border ${bg} ${border} hover:border-opacity-100 hover:scale-[1.02] transition-all duration-150 group`}
            >
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white truncate">{name}</p>
                  {statusDot(status)}
                </div>
                <p className="text-xs text-navy-500 truncate">{desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-navy-600 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Tasks + Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Tasks */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Recent Tasks</h2>
            <span className="text-xs text-navy-500">Session activity</span>
          </div>
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg bg-navy-800/50 hover:bg-navy-800 transition-colors">
                <div className="mt-0.5">{taskStatusIcon(task.status)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-navy-500">{task.agent}</span>
                    <span className="text-navy-700">·</span>
                    <span className="text-xs text-navy-500">{task.time}</span>
                  </div>
                </div>
                {priorityBadge(task.priority)}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-5">
          <h2 className="font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: "Compose Email", href: "/dashboard/chat?agent=email&q=Write+a+professional+email", icon: Mail, color: "text-amber-400", bg: "bg-amber-500/10" },
              { label: "Schedule Meeting", href: "/dashboard/chat?agent=scheduler&q=Help+me+schedule+a+meeting", icon: Calendar, color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { label: "Research Topic", href: "/dashboard/chat?agent=research&q=Research+this+topic+for+me", icon: Search, color: "text-cyan-400", bg: "bg-cyan-500/10" },
              { label: "Create Document", href: "/dashboard/chat?agent=docs&q=Create+a+professional+document", icon: FileText, color: "text-indigo-400", bg: "bg-indigo-500/10" },
              { label: "Social Media Post", href: "/dashboard/chat?agent=social&q=Write+social+media+posts+for+me", icon: Globe, color: "text-pink-400", bg: "bg-pink-500/10" },
            ].map(({ label, href, icon: Icon, color, bg }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 p-3 rounded-lg bg-navy-800/40 hover:bg-navy-800 border border-transparent hover:border-navy-700 transition-all group"
              >
                <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <span className="text-sm text-navy-300 group-hover:text-white transition-colors flex-1">{label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-navy-600 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
