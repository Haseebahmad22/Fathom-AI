"use client";

import React from "react";
import Link from "next/link";
import { Search, Settings, HelpCircle, LogOut } from "lucide-react";
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
    <header className="bg-surface border-b border-border-subtle text-text-primary shrink-0 select-none">
      {/* Upper Navigation Bar */}
      <div className="h-14 px-6 flex items-center justify-between gap-6">
        {/* Left: Brand Logo & Search */}
        <div className="flex items-center gap-6 flex-1 max-w-lg">
          <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
            <span className="text-sm font-bold tracking-tight text-text-primary">
              FATHOM
            </span>
            <span className="w-1.5 h-3 bg-accent rounded-xs" />
          </Link>

          {/* Search Input */}
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search call recordings..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-surface-elevated border border-border-muted rounded-md text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        {/* Right: Actions, Log Out & User Profile */}
        <div className="flex items-center gap-4 text-xs font-normal text-text-secondary">
          <button className="hidden md:flex items-center gap-1.5 hover:text-text-primary transition-colors">
            <HelpCircle className="w-3.5 h-3.5 text-text-muted" />
            <span>Help</span>
          </button>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 hover:text-text-primary transition-colors text-xs cursor-pointer"
            title="Log out"
          >
            <LogOut className="w-3.5 h-3.5 text-text-muted" />
            <span>Log out</span>
          </button>

          {/* User Profile Avatar & Name */}
          <div className="flex items-center gap-2 pl-2 border-l border-border-subtle">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-7 h-7 rounded-md object-cover border border-border-muted"
              />
            ) : (
              <div className="w-7 h-7 rounded-md bg-surface-elevated border border-border-muted flex items-center justify-center font-medium text-xs text-text-primary">
                {initial}
              </div>
            )}
            {user?.name && (
              <span className="text-xs text-text-secondary font-medium hidden sm:inline truncate max-w-[120px]">
                {user.name}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Lower Tab Row */}
      <div className="px-6 flex items-center gap-6 text-xs font-medium border-t border-border-subtle">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-2.5 relative transition-colors ${
                isSelected
                  ? "text-text-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {tab.label}
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
}
