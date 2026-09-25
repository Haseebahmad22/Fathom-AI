"use client";

import React, { useState } from "react";
import { mockMeetings } from "@/lib/mock-data";
import TopNav from "@/components/dashboard/TopNav";
import MeetingCardGrid from "@/components/dashboard/MeetingCardGrid";
import AskPanel from "@/components/dashboard/AskPanel";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("my-calls");

  return (
    <div className="h-screen w-screen bg-[#07080F] text-white flex flex-col overflow-hidden font-sans select-none">
      {/* Top Navigation Bar with Search and Tab row */}
      <TopNav
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Two-Column Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left / Main Column (~70% width): Scrollable Meeting Grid */}
        <main className="flex-[70] h-full overflow-y-auto p-6 md:p-8 bg-[#0B0C15]">
          <MeetingCardGrid
            meetings={mockMeetings}
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery("")}
          />
        </main>

        {/* Right Column (~30% width, Sticky/Persistent): Ask Fanthom Panel */}
        <aside className="flex-[30] min-w-[320px] max-w-[420px] h-full overflow-hidden flex flex-col shrink-0">
          <AskPanel />
        </aside>
      </div>
    </div>
  );
}
