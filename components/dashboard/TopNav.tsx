"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  Gift,
  Settings,
  HelpCircle,
  Sparkles,
  Coins,
} from "lucide-react";

interface TopNavProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TopNav({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
}: TopNavProps) {
  const tabs = [
    { id: "my-calls", label: "My Calls", active: true },
    { id: "team-calls", label: "Team Calls" },
    { id: "playlists", label: "Playlists" },
    { id: "alerts", label: "Alerts" },
    { id: "deals", label: "Deals" },
  ];

  return (
    <header className="bg-[#0B0C15] border-b border-[#1A1C2C] text-white shrink-0 select-none">
      {/* Upper Navigation Bar */}
      <div className="h-14 px-6 flex items-center justify-between gap-6">
        {/* Left: Brand Logo & Search */}
        <div className="flex items-center gap-6 flex-1 max-w-xl">
          <Link href="/dashboard" className="flex items-center gap-2 group shrink-0">
            <span className="text-lg font-black tracking-wider text-white">
              FATHOM
            </span>
            <div className="flex items-center -space-x-1">
              <span className="w-1.5 h-4 bg-[#00A3FF] rounded-sm -skew-x-12" />
              <span className="w-1.5 h-4 bg-[#00D2FF] rounded-sm -skew-x-12 opacity-80" />
            </div>
          </Link>

          {/* Search Input */}
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search Call Recordings"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#161829] border border-[#252840] rounded-lg text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#00A3FF] transition-all"
            />
          </div>
        </div>

        {/* Right: Actions & User Avatar */}
        <div className="flex items-center gap-4 text-xs font-medium text-white/70">
          <button className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Gift className="w-4 h-4 text-white/50" />
            <span>Refer</span>
          </button>

          <button className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Settings className="w-4 h-4 text-white/50" />
            <span>Settings</span>
          </button>

          <button className="flex items-center gap-1.5 hover:text-white transition-colors">
            <HelpCircle className="w-4 h-4 text-white/50" />
            <span>Help & Feedback</span>
          </button>

          {/* Points Pill from Screenshot */}
          <div className="flex items-center gap-1.5 bg-[#1F1E16] border border-amber-500/30 px-2 py-1 rounded-full text-amber-400">
            <Coins className="w-3.5 h-3.5 fill-amber-400" />
            <span className="font-bold text-[11px]">30</span>
            <span className="text-[9px] font-bold uppercase bg-amber-400 text-black px-1.5 py-0.5 rounded-full tracking-wider ml-1">
              +5 POINTS
            </span>
          </div>

          {/* User Profile Avatar */}
          <div className="w-7 h-7 rounded-full bg-[#1F2338] border border-[#2D3352] flex items-center justify-center font-bold text-xs text-white">
            H
          </div>
        </div>
      </div>

      {/* Lower Tab Row (My Calls, Team Calls, etc.) */}
      <div className="px-6 flex items-center gap-8 text-xs font-semibold border-t border-[#141624]">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-3 relative transition-colors ${
                isSelected
                  ? "text-white"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {tab.label}
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00A3FF]" />
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
}
