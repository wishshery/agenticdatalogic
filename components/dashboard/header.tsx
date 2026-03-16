"use client";

import { Bell, Search, Plus, Sparkles } from "lucide-react";
import { useAuthStore } from "@/lib/stores/auth-store";
import Link from "next/link";

export function DashboardHeader() {
  const { user } = useAuthStore();

  return (
    <header className="h-16 bg-navy-900 border-b border-navy-800 flex items-center justify-between px-6 gap-4">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-500" />
        <input className="input pl-9 bg-navy-800 text-sm h-9 py-0" placeholder="Search tasks, documents, conversations..." />
      </div>

      <div className="flex items-center gap-3">
        {/* Quick create */}
        <Link href="/dashboard/chat" className="btn btn-primary btn-sm hidden sm:flex">
          <Sparkles className="w-3.5 h-3.5" />
          New Task
        </Link>

        {/* Notifications */}
        <button className="btn btn-icon text-navy-400 hover:text-white relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-primary-500" />
        </button>

        {/* User avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold cursor-pointer">
          {user?.name?.[0]?.toUpperCase() || "U"}
        </div>
      </div>
    </header>
  );
}
