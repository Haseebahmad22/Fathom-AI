"use client";

import React from "react";
import Link from "next/link";
import { Search, HelpCircle, LogOut, Bell, Settings } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
}

interface TopNavProps {
  user?: UserProfile;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TopNav({
  user,
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
}: TopNavProps) {
  const tabs = [
    { id: "my-calls", label: "My calls" },
    { id: "team-calls", label: "Team calls" },
    { id: "playlists", label: "Playlists" },
    { id: "alerts", label: "Alerts" },
  ];

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const initial = user?.name ? user.name[0].toUpperCase() : "U";

  return (
    <header className="bg-[#0A0C12] border-b border-[#1A1D2E] text-white shrink-0 select-none">
      {/* Upper Navigation Bar */}
      <div className="h-16 px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <span className="text-base font-black tracking-tight text-white">
              FATHOM
            </span>
            <svg width="18" height="13" viewBox="0 0 22 16" fill="none" className="mt-0.5">
              <path d="M2 12C4 4 8 2 11 8C14 14 18 12 20 4" stroke="#00B8D4" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M6 14C8 6 12 4 15 10C18 16 20 10 22 6" stroke="#00B8D4" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            </svg>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6F82]" />
            <input
              type="text"
              placeholder="Search meetings, people, topics..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#12141D] border border-[#1E2030] rounded-xl text-sm text-white placeholder:text-[#555869] focus:outline-none focus:border-[#00E5FF]/50 focus:bg-[#141620] transition-all"
            />
          </div>
        </div>

        {/* Right: Actions & User */}
        <div className="flex items-center gap-3 shrink-0">
          <button className="w-9 h-9 rounded-lg bg-[#12141D] border border-[#1E2030] flex items-center justify-center text-[#6B6F82] hover:text-white hover:bg-[#1C1E2A] hover:border-[#2A2D42] transition-all">
            <Bell className="w-4 h-4" />
          </button>

          <button className="w-9 h-9 rounded-lg bg-[#12141D] border border-[#1E2030] flex items-center justify-center text-[#6B6F82] hover:text-white hover:bg-[#1C1E2A] hover:border-[#2A2D42] transition-all">
            <HelpCircle className="w-4 h-4" />
          </button>

          <button className="w-9 h-9 rounded-lg bg-[#12141D] border border-[#1E2030] flex items-center justify-center text-[#6B6F82] hover:text-white hover:bg-[#1C1E2A] hover:border-[#2A2D42] transition-all">
            <Settings className="w-4 h-4" />
          </button>

          {/* Divider */}
          <div className="w-px h-7 bg-[#1E2030]" />

          {/* User Profile */}
          <div className="flex items-center gap-3">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-[#1E2030] hover:border-[#00E5FF]/50 transition-colors"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00E5FF]/20 to-[#7C3AED]/20 border-2 border-[#1E2030] flex items-center justify-center font-bold text-sm text-[#00E5FF]">
                {initial}
              </div>
            )}

            <div className="hidden lg:block">
              <p className="text-sm font-medium text-white leading-tight truncate max-w-[140px]">
                {user?.name}
              </p>
              <p className="text-[11px] text-[#6B6F82] leading-tight truncate max-w-[140px]">
                {user?.email}
              </p>
            </div>

            <button
              onClick={handleSignOut}
              className="ml-1 w-9 h-9 rounded-lg bg-[#12141D] border border-[#1E2030] flex items-center justify-center text-[#6B6F82] hover:text-[#FB7185] hover:bg-[#1C1E2A] hover:border-[#2A2D42] transition-all cursor-pointer"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Lower Tab Row */}
      <div className="px-6 lg:px-8 flex items-center gap-1">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-3 text-sm font-medium relative transition-all rounded-t-lg ${
                isSelected
                  ? "text-white bg-[#12141D]"
                  : "text-[#8E92A6] hover:text-white hover:bg-[#0F1118]"
              }`}
            >
              {tab.label}
              {isSelected && (
                <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#00E5FF] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
}
