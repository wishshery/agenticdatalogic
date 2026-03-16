"use client";

import { useState } from "react";
import { Plus, Filter, Search, CheckCircle2, Clock, AlertCircle, MoreVertical, Bot, Calendar, Tag } from "lucide-react";

type Priority = "high" | "medium" | "low";
type Status = "todo" | "in_progress" | "completed";
interface Task {
  id: number; title: string; description: string; agent: string;
  priority: Priority; status: Status; dueDate: string; tags: string[];
}

const initialTasks: Task[] = [
  { id: 1, title: "Draft Q2 investor update email", description: "Professional update covering financials, milestones, and outlook", agent: "Email Agent", priority: "high", status: "completed", dueDate: "Today", tags: ["email", "investor"] },
  { id: 2, title: "Research competitor pricing strategies", description: "Analyze top 5 competitors pricing models and position recommendations", agent: "Research Agent", priority: "medium", status: "in_progress", dueDate: "Tomorrow", tags: ["research", "strategy"] },
  { id: 3, title: "Schedule weekly team standup", description: "Book recurring 30min Zoom for Mon 9am", agent: "Scheduler", priority: "low", status: "todo", dueDate: "This week", tags: ["scheduling"] },
  { id: 4, title: "Create project brief for new client", description: "Comprehensive onboarding doc including scope, timeline, and deliverables", agent: "Document Agent", priority: "high", status: "todo", dueDate: "Today", tags: ["document", "client"] },
  { id: 5, title: "Social media content for product launch", description: "5 posts across LinkedIn, Twitter, Instagram", agent: "Social Media Agent", priority: "medium", status: "todo", dueDate: "Next week", tags: ["social media"] },
  { id: 6, title: "Monthly expense report", description: "Compile all receipts and categorize for accounting", agent: "Admin Agent", priority: "medium", status: "in_progress", dueDate: "Friday", tags: ["admin", "finance"] },
];

const priorityConfig: Record<Priority, { label: string; class: string }> = {
  high: { label: "High", class: "badge-red" },
  medium: { label: "Medium", class: "badge-amber" },
  low: { label: "Low", class: "badge-blue" },
};

const statusConfig: Record<Status, { label: string; icon: React.ElementType; class: string }> = {
  todo: { label: "To Do", icon: AlertCircle, class: "text-navy-500" },
  in_progress: { label: "In Progress", icon: Clock, class: "text-amber-400" },
  completed: { label: "Completed", icon: CheckCircle2, class: "text-emerald-400" },
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<Status | "all">("all");
  const [search, setSearch] = useState("");
  const [showNewTask, setShowNewTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "medium" as Priority });

  const filtered = tasks.filter(t =>
    (filter === "all" || t.status === filter) &&
    (t.title.toLowerCase().includes(search.toLowerCase()) || t.agent.toLowerCase().includes(search.toLowerCase()))
  );

  const grouped = {
    todo: filtered.filter(t => t.status === "todo"),
    in_progress: filtered.filter(t => t.status === "in_progress"),
    completed: filtered.filter(t => t.status === "completed"),
  };

  const toggleStatus = (id: number) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      const next: Record<Status, Status> = { todo: "in_progress", in_progress: "completed", completed: "todo" };
      return { ...t, status: next[t.status] };
    }));
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), ...newTask, agent: "Orchestrator", status: "todo", dueDate: "Soon", tags: [] }]);
    setNewTask({ title: "", description: "", priority: "medium" });
    setShowNewTask(false);
  };

  const stats = { all: tasks.length, todo: tasks.filter(t => t.status === "todo").length, in_progress: tasks.filter(t => t.status === "in_progress").length, completed: tasks.filter(t => t.status === "completed").length };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Task Manager</h1>
          <p className="text-navy-400 text-sm mt-1">{stats.all} total tasks · {stats.in_progress} in progress</p>
        </div>
        <button onClick={() => setShowNewTask(!showNewTask)} className="btn btn-primary btn-sm">
          <Plus className="w-4 h-4" /> New Task
        </button>
      </div>

      {/* New task form */}
      {showNewTask && (
        <div className="card p-5 border-primary-800/40 bg-primary-900/10 animate-in">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Bot className="w-4 h-4 text-primary-400" /> Create New Task</h3>
          <div className="space-y-3">
            <input className="input" placeholder="Task title..." value={newTask.title} onChange={e => setNewTask(p => ({ ...p, title: e.target.value }))} />
            <input className="input" placeholder="Description (optional)..." value={newTask.description} onChange={e => setNewTask(p => ({ ...p, description: e.target.value }))} />
            <div className="flex gap-3">
              <select className="input flex-1" value={newTask.priority} onChange={e => setNewTask(p => ({ ...p, priority: e.target.value as Priority }))}>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <button onClick={addTask} className="btn btn-primary">Create Task</button>
              <button onClick={() => setShowNewTask(false)} className="btn btn-ghost">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-500" />
          <input className="input pl-9 h-9 py-0 text-sm" placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {(["all", "todo", "in_progress", "completed"] as const).map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`btn btn-sm ${filter === s ? "btn-primary" : "btn-ghost"}`}>
              {s === "all" ? `All (${stats.all})` : s === "in_progress" ? `Active (${stats.in_progress})` : s === "todo" ? `To Do (${stats.todo})` : `Done (${stats.completed})`}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban columns */}
      <div className="grid sm:grid-cols-3 gap-5">
        {(["todo", "in_progress", "completed"] as Status[]).map(colStatus => {
          const { label, icon: ColIcon, class: colClass } = statusConfig[colStatus];
          const colTasks = grouped[colStatus];
          return (
            <div key={colStatus} className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <ColIcon className={`w-4 h-4 ${colClass}`} />
                <span className="text-sm font-semibold text-white">{label}</span>
                <span className="badge badge-blue text-xs">{colTasks.length}</span>
              </div>
              {colTasks.length === 0 ? (
                <div className="card p-6 text-center text-navy-500 text-sm border-dashed border-navy-700">
                  No {label.toLowerCase()} tasks
                </div>
              ) : (
                colTasks.map(task => {
                  const { label: pLabel, class: pClass } = priorityConfig[task.priority];
                  const { icon: StatusIcon, class: sClass } = statusConfig[task.status];
                  return (
                    <div key={task.id} className="card p-4 hover:border-navy-600 transition-all cursor-pointer">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <button onClick={() => toggleStatus(task.id)}>
                          <StatusIcon className={`w-4 h-4 ${sClass} mt-0.5 hover:scale-110 transition-transform`} />
                        </button>
                        <button className="btn btn-icon p-0.5 text-navy-600 hover:text-white ml-auto">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                      <h3 className="text-sm font-medium text-white mb-1 leading-snug">{task.title}</h3>
                      {task.description && <p className="text-xs text-navy-500 mb-3 line-clamp-2">{task.description}</p>}
                      <div className="flex items-center justify-between mt-2">
                        <span className={`badge text-xs ${pClass}`}>{pLabel}</span>
                        <div className="flex items-center gap-1 text-xs text-navy-500">
                          <Calendar className="w-3 h-3" />
                          {task.dueDate}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        <Bot className="w-3 h-3 text-primary-500" />
                        <span className="text-2xs text-navy-500">{task.agent}</span>
                      </div>
                      {task.tags.length > 0 && (
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {task.tags.map(tag => (
                            <span key={tag} className="text-2xs px-1.5 py-0.5 rounded bg-navy-800 text-navy-500 border border-navy-700">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
