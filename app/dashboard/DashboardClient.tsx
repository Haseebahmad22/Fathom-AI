"use client";

import React, { useState } from "react";
import { mockMeetings } from "@/lib/mock-data";
import TopNav, { UserProfile } from "@/components/dashboard/TopNav";
import MeetingCardGrid from "@/components/dashboard/MeetingCardGrid";
import AskPanel from "@/components/dashboard/AskPanel";

interface DashboardClientProps {
  user: UserProfile;
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("my-calls");

  return (
    <div className="h-screen w-screen bg-app text-text-primary flex flex-col overflow-hidden font-sans select-none">
      {/* Top Navigation Bar with Search, User info, and Log out */}
      <TopNav
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Two-Column Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left / Main Column: Scrollable Meeting Grid */}
        <main className="flex-[70] h-full overflow-y-auto p-6 md:p-8 bg-app">
          <MeetingCardGrid
            meetings={mockMeetings}
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery("")}
          />
        </main>

        {/* Right Column: Persistent Ask Fanthom Panel */}
        <aside className="flex-[30] min-w-[320px] max-w-[400px] h-full overflow-hidden flex flex-col shrink-0 border-l border-border-subtle bg-surface">
          <AskPanel />
        </aside>
      </div>
    </div>
  );
}
