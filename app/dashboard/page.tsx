"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckSquare, MessageSquare, Calendar, FileText, Bot,
  TrendingUp, Clock, AlertCircle, CheckCircle2, ArrowRight,
  Zap, Mail, Search, BarChart3, Users
} from "lucide-react";
import { useAuthStore } from "@/lib/stores/auth-store";

const agentStatuses = [
  { name: "Orchestrator", status: "active", tasks: 3, icon: Bot, color: "text-primary-400" },
  { name: "Email Agent", status: "active", tasks: 12, icon: Mail, color: "text-amber-400" },
  { name: "Scheduler", status: "idle", tasks: 0, icon: Calendar, color: "text-emerald-400" },
  { name: "Research Agent", status: "processing", tasks: 1, icon: Search, color: "text-cyan-400" },
  { name: "Project Mgmt", status: "active", tasks: 5, icon: BarChart3, color: "text-purple-400" },
  { name: "Document Agent", status: "idle", tasks: 0, icon: FileText, color: "text-indigo-400" },
];

const recentTasks = [
  { id: 1, title: "Draft Q2 investor update email", agent: "Email Agent", status: "completed", time: "2m ago", priority: "high" },
  { id: 2, title: "Research competitor pricing strategies", agent: "Research Agent", status: "in_progress", time: "5m ago", priority: "medium" },
  { id: 3, title: "Schedule weekly team standup", agent: "Scheduler", status: "completed", time: "10m ago", priority: "low" },
  { id: 4, title: "Create project brief for new client", agent: "Document Agent", status: "pending", time: "1h ago", priority: "high" },
  { id: 5, title: "Update CRM with meeting notes", agent: "Admin Agent", status: "completed", time: "2h ago", priority: "medium" },
];

const statCards = [
  { label: "Tasks Completed", value: "24", change: "+8 today", up: true, icon: CheckSquare, color: "bg-primary-500/10 text-primary-400" },
  { label: "Active Agents", value: "3", change: "of 10 running", up: null, icon: Bot, color: "bg-emerald-500/10 text-emerald-400" },
  { label: "Emails Handled", value: "87", change: "3 need review", up: null, icon: Mail, color: "bg-amber-500/10 text-amber-400" },
  { label: "Hrs Saved Today", value: "4.2", change: "+1.1h vs yesterday", up: true, icon: Clock, color: "bg-indigo-500/10 text-indigo-400" },
];

const quickActions = [
  { label: "Chat with AI", href: "/dashboard/chat", icon: MessageSquare, color: "bg-primary-500/10 border-primary-800/50 hover:border-primary-600" },
  { label: "New Task", href: "/dashboard/tasks", icon: CheckSquare, color: "bg-emerald-500/10 border-emerald-800/50 hover:border-emerald-600" },
  { label: "Schedule Meeting", href: "/dashboard/calendar", icon: Calendar, color: "bg-amber-500/10 border-amber-800/50 hover:border-amber-600" },
  { label: "New Document", href: "/dashboard/documents", icon: FileText, color: "bg-indigo-500/10 border-indigo-800/50 hover:border-indigo-600" },
];

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [greeting, setGreeting] = useState("Good morning");

  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 12 && h < 18) setGreeting("Good afternoon");
    else if (h >= 18) setGreeting("Good evening");
  }, []);

  const statusDot = (status: string) => {
    const map: Record<string, string> = { active: "agent-status-active", idle: "agent-status-idle", processing: "agent-status-processing" };
    return <span className={`agent-status-dot ${map[status] || "agent-status-idle"}`} />;
  };

  const priorityBadge = (priority: string) => {
    const map: Record<string, string> = { high: "badge-red", medium: "badge-amber", low: "badge-blue" };
    return <span className={`badge ${map[priority]}`}>{priority}</span>;
  };

  const taskStatusIcon = (status: string) => {
    if (status === "completed") return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
    if (status === "in_progress") return <Clock className="w-4 h-4 text-amber-400 animate-spin-slow" />;
    return <AlertCircle className="w-4 h-4 text-navy-500" />;
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Greeting */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{greeting}, {user?.name?.split(" ")[0] || "there"}! 👋</h1>
          <p className="text-navy-400 text-sm mt-1">Here&apos;s what your AI team is working on today.</p>
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
              <p className={up === true ? "stat-change-up" : up === false ? "stat-change-down" : "text-xs text-navy-500 mt-1"}>
                {up === true && "↑ "}{up === false && "↓ "}{change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActions.map(({ label, href, icon: Icon, color }) => (
          <Link key={href} href={href} className={`card p-4 ${color} border flex items-center gap-3 rounded-xl hover:scale-[1.02] transition-all duration-200`}>
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium text-white">{label}</span>
            <ArrowRight className="w-4 h-4 ml-auto text-navy-500" />
          </Link>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Tasks */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Recent Tasks</h2>
            <Link href="/dashboard/tasks" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentTasks.map(task => (
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

        {/* AI Agents status */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">AI Agents</h2>
            <Link href="/dashboard/agents" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {agentStatuses.map(({ name, status, tasks, icon: Icon, color }) => (
              <div key={name} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-navy-800/50 transition-colors">
                <div className={`w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{name}</p>
                  <p className="text-xs text-navy-500">{tasks > 0 ? `${tasks} tasks active` : "Idle"}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  {statusDot(status)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
