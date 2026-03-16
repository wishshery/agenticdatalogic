"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot, LayoutDashboard, MessageSquare, CheckSquare, Calendar,
  FileText, Settings, Bell, ChevronLeft, ChevronRight,
  Zap, Users, BarChart3, LogOut, CreditCard, HelpCircle
} from "lucide-react";
import { useAuthStore } from "@/lib/stores/auth-store";

const mainNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/chat", label: "AI Chat", icon: MessageSquare, badge: "Live" },
  { href: "/dashboard/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
  { href: "/dashboard/documents", label: "Documents", icon: FileText },
  { href: "/dashboard/agents", label: "AI Agents", icon: Zap },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/team", label: "Team", icon: Users },
];

const secondaryNav = [
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/help", label: "Help & Docs", icon: HelpCircle },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const NavLink = ({ href, label, icon: Icon, badge }: { href: string; label: string; icon: React.ElementType; badge?: string }) => {
    const active = pathname === href;
    return (
      <Link href={href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group ${active ? "bg-primary-900/60 text-white border border-primary-800/50" : "text-navy-400 hover:text-white hover:bg-navy-800"} ${collapsed ? "justify-center" : ""}`}>
        <Icon className={`w-5 h-5 flex-shrink-0 ${active ? "text-primary-400" : "group-hover:text-primary-400 transition-colors"}`} />
        {!collapsed && (
          <>
            <span className="text-sm font-medium flex-1">{label}</span>
            {badge && <span className="text-2xs font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-700/50">{badge}</span>}
          </>
        )}
      </Link>
    );
  };

  return (
    <aside className={`flex flex-col bg-navy-900 border-r border-navy-800 h-full transition-all duration-300 ${collapsed ? "w-16" : "w-60"}`}>
      {/* Header */}
      <div className={`flex items-center h-16 border-b border-navy-800 px-4 ${collapsed ? "justify-center" : "justify-between"}`}>
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2 font-bold text-white">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span>AssistAI</span>
          </Link>
        )}
        {collapsed && (
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="btn btn-icon text-navy-500 hover:text-white ml-auto">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 hide-scrollbar">
        {!collapsed && <p className="section-header mb-3">Main</p>}
        <div className="space-y-1">
          {mainNav.map(item => <NavLink key={item.href} {...item} />)}
        </div>

        <div className="my-4 border-t border-navy-800" />

        {!collapsed && <p className="section-header mb-3">Account</p>}
        <div className="space-y-1">
          {secondaryNav.map(item => <NavLink key={item.href} {...item} />)}
        </div>
      </nav>

      {/* User profile */}
      <div className={`border-t border-navy-800 p-3 ${collapsed ? "flex justify-center" : ""}`}>
        {!collapsed ? (
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-navy-800 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name || "User"}</p>
              <p className="text-xs text-navy-500 truncate">{user?.email || "user@email.com"}</p>
            </div>
            <button onClick={logout} className="opacity-0 group-hover:opacity-100 transition-opacity">
              <LogOut className="w-4 h-4 text-navy-500 hover:text-red-400" />
            </button>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
        )}
      </div>
    </aside>
  );
}
