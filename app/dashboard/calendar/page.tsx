"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock, Users, Video, MapPin, Bot } from "lucide-react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";

interface Meeting {
  id: number; title: string; time: string; duration: string;
  type: "video" | "in-person" | "phone"; attendees: string[];
  date: Date; color: string; agent?: string;
}

const meetings: Meeting[] = [
  { id: 1, title: "Team Standup", time: "09:00", duration: "30m", type: "video", attendees: ["Sarah", "Mike", "Alex"], date: new Date(), color: "bg-primary-600", agent: "Scheduler" },
  { id: 2, title: "Client Onboarding Call", time: "11:00", duration: "1h", type: "video", attendees: ["Client Team"], date: new Date(), color: "bg-emerald-600", agent: "Scheduler" },
  { id: 3, title: "Q2 Planning", time: "14:00", duration: "2h", type: "in-person", attendees: ["Leadership"], date: new Date(new Date().setDate(new Date().getDate() + 2)), color: "bg-purple-600", agent: "Scheduler" },
  { id: 4, title: "Investor Update", time: "16:30", duration: "45m", type: "phone", attendees: ["Board Members"], date: new Date(new Date().setDate(new Date().getDate() + 5)), color: "bg-amber-600", agent: "Scheduler" },
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week">("month");

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calStart, end: calEnd });
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getMeetingsForDay = (day: Date) => meetings.filter(m => isSameDay(m.date, day));
  const selectedMeetings = getMeetingsForDay(selectedDate);

  const typeIcon = (type: Meeting["type"]) => {
    if (type === "video") return <Video className="w-3 h-3" />;
    if (type === "in-person") return <MapPin className="w-3 h-3" />;
    return <Clock className="w-3 h-3" />;
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6 max-w-6xl">
      {/* Calendar */}
      <div className="lg:col-span-2 card p-5">
        {/* Calendar header */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-bold text-white">{format(currentDate, "MMMM yyyy")}</h1>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 bg-navy-800 rounded-lg p-1">
              {(["month", "week"] as const).map(v => (
                <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${view === v ? "bg-primary-600 text-white" : "text-navy-400 hover:text-white"}`}>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
            <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="btn btn-icon text-navy-400 hover:text-white">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setCurrentDate(new Date())} className="btn btn-ghost btn-sm">Today</button>
            <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="btn btn-icon text-navy-400 hover:text-white">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 mb-2">
          {dayNames.map(d => (
            <div key={d} className="text-center text-xs font-semibold text-navy-500 py-2">{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map(day => {
            const dayMeetings = getMeetingsForDay(day);
            const isToday = isSameDay(day, new Date());
            const isSelected = isSameDay(day, selectedDate);
            const inMonth = isSameMonth(day, currentDate);
            return (
              <button
                key={day.toISOString()}
                onClick={() => setSelectedDate(day)}
                className={`relative min-h-[60px] p-1.5 rounded-lg text-xs transition-all ${isSelected ? "bg-primary-600 text-white" : isToday ? "bg-primary-900/50 border border-primary-700 text-white" : inMonth ? "text-navy-200 hover:bg-navy-800" : "text-navy-700 hover:bg-navy-800/50"}`}
              >
                <span className={`font-medium ${isToday && !isSelected ? "text-primary-400" : ""}`}>
                  {format(day, "d")}
                </span>
                <div className="mt-1 space-y-0.5">
                  {dayMeetings.slice(0, 2).map(m => (
                    <div key={m.id} className={`${m.color} text-white text-2xs rounded px-1 truncate`}>{m.time}</div>
                  ))}
                  {dayMeetings.length > 2 && (
                    <div className="text-2xs text-navy-400">+{dayMeetings.length - 2}</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected day sidebar */}
      <div className="space-y-4">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-white">{format(selectedDate, "EEEE")}</h2>
              <p className="text-sm text-navy-400">{format(selectedDate, "MMMM d, yyyy")}</p>
            </div>
            <button className="btn btn-primary btn-sm"><Plus className="w-4 h-4" /> Book</button>
          </div>

          {selectedMeetings.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-8 h-8 text-navy-600 mx-auto mb-2" />
              <p className="text-navy-500 text-sm">No meetings scheduled</p>
              <button className="btn btn-ghost btn-sm mt-3 text-primary-400">
                <Bot className="w-3.5 h-3.5" />
                Ask AI to schedule
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedMeetings.map(m => (
                <div key={m.id} className="card p-3 border-navy-700">
                  <div className="flex items-start gap-2 mb-2">
                    <div className={`w-2 h-full min-h-[40px] rounded-full ${m.color} flex-shrink-0 mt-0.5`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{m.title}</p>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-navy-400">
                        <Clock className="w-3 h-3" />
                        {m.time} · {m.duration}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-navy-400">
                        {typeIcon(m.type)}
                        {m.type.replace("-", " ")}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-navy-400">
                        <Users className="w-3 h-3" />
                        {m.attendees.join(", ")}
                      </div>
                    </div>
                  </div>
                  {m.agent && (
                    <div className="flex items-center gap-1 text-2xs text-navy-600 mt-1">
                      <Bot className="w-2.5 h-2.5" />
                      Booked by {m.agent}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick schedule with AI */}
        <div className="card p-4 border-primary-800/40 bg-primary-900/10">
          <div className="flex items-center gap-2 mb-3">
            <Bot className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-semibold text-white">AI Scheduler</span>
          </div>
          <p className="text-xs text-navy-400 mb-3">Tell the AI what meeting you need — it will find the best time and book it.</p>
          <input className="input text-xs mb-2" placeholder="e.g. Schedule a 1hr client call next week" />
          <button className="btn btn-primary btn-sm w-full justify-center">
            <Bot className="w-3.5 h-3.5" />
            Schedule with AI
          </button>
        </div>
      </div>
    </div>
  );
}

// Needed for the import
function Calendar({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
      <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
      <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
      <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
    </svg>
  );
}
