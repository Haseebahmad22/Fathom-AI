"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, HelpCircle, LogOut, Bell, Settings, Command } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import NotificationsTray from "./NotificationsTray";
import SettingsModal from "./SettingsModal";
import ShortcutsHelpModal from "./ShortcutsHelpModal";
import CommandPalette from "./CommandPalette";

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
    { id: "my-calls", label: "My calls", href: "/dashboard" },
    { id: "team-calls", label: "Team calls", href: "/team-calls" },
    { id: "playlists", label: "Playlists", href: "/playlists" },
    { id: "alerts", label: "Alerts", href: "/alerts" },
  ];

  // Modals & Panels State
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global keyboard shortcuts (Cmd+K for Command Palette, ? for Help)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      // ? for shortcuts help (when not typing in an input)
      if (
        e.key === "?" &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        setIsHelpOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }
    document.cookie = "fathom_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "fathom_demo_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href = "/";
  };

  const initial = user?.name ? user.name[0].toUpperCase() : "U";

  return (
    <header className="bg-[#0A0C12] border-b border-[#1A1D2E] text-white shrink-0 select-none relative z-30">
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

        {/* Center: Search Bar with Command Palette trigger */}
        <div className="flex-1 max-w-xl">
          <div
            onClick={() => setIsCommandPaletteOpen(true)}
            className="relative cursor-pointer group"
          >
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6F82] group-hover:text-[#00E5FF] transition-colors" />
            <input
              type="text"
              readOnly
              placeholder="Search meetings, transcripts, playlists (⌘K)..."
              value={searchQuery}
              className="w-full pl-10 pr-20 py-2.5 bg-[#12141D] group-hover:bg-[#151824] border border-[#1E2030] group-hover:border-[#00E5FF]/40 rounded-xl text-sm text-white placeholder:text-[#555869] cursor-pointer transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[#1A1D2E] border border-[#2A2E44] text-[10px] font-mono text-[#8E92A6]">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right: Actions & User */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all cursor-pointer relative ${
                isNotificationsOpen
                  ? "bg-[#1C1E2A] border-[#00E5FF]/50 text-[#00E5FF]"
                  : "bg-[#12141D] border-[#1E2030] text-[#6B6F82] hover:text-white hover:bg-[#1C1E2A]"
              }`}
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#38EDFF] text-[#050608] font-black text-[9px] flex items-center justify-center border border-[#0A0C12] shadow-[0_0_8px_rgba(0,229,255,0.6)] animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Tray */}
            <NotificationsTray
              isOpen={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
              onUnreadCountChange={setUnreadCount}
            />
          </div>

          {/* Help & Shortcuts Trigger */}
          <button
            onClick={() => setIsHelpOpen(true)}
            className="w-9 h-9 rounded-lg bg-[#12141D] border border-[#1E2030] flex items-center justify-center text-[#6B6F82] hover:text-white hover:bg-[#1C1E2A] hover:border-[#2A2D42] transition-all cursor-pointer"
            title="Keyboard Shortcuts & Help (?)"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Settings Trigger */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="w-9 h-9 rounded-lg bg-[#12141D] border border-[#1E2030] flex items-center justify-center text-[#6B6F82] hover:text-white hover:bg-[#1C1E2A] hover:border-[#2A2D42] transition-all cursor-pointer"
            title="Workspace Settings"
          >
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
            <Link
              key={tab.id}
              href={tab.href}
              onClick={() => onTabChange && onTabChange(tab.id)}
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
            </Link>
          );
        })}
      </div>

      {/* Global Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <ShortcutsHelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
    </header>
  );
}
