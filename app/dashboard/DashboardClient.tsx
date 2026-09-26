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
    <div className="h-screen w-screen bg-[#050608] text-white flex flex-col overflow-hidden font-sans select-none">
      {/* Top Navigation Bar with Search, User info, and Log out */}
      <TopNav
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Two-Column Viewport */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left / Main Column: Scrollable Meeting Grid */}
        <main className="relative flex-[70] h-full overflow-y-auto bg-[#050608]">
          {/* Ambient top glow */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-[300px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,229,255,0.04),transparent_70%)]" />

          {/* Subtle Starfield background */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(1px 1px at 30px 40px, #ffffff, rgba(0,0,0,0)),
                  radial-gradient(1px 1px at 150px 180px, #00E5FF, rgba(0,0,0,0)),
                  radial-gradient(1.5px 1.5px at 320px 80px, #ffffff, rgba(0,0,0,0)),
                  radial-gradient(1px 1px at 500px 290px, #ffffff, rgba(0,0,0,0)),
                  radial-gradient(1.5px 1.5px at 700px 140px, #00E5FF, rgba(0,0,0,0)),
                  radial-gradient(1px 1px at 880px 380px, #ffffff, rgba(0,0,0,0)),
                  radial-gradient(1px 1px at 1050px 90px, #ffffff, rgba(0,0,0,0)),
                  radial-gradient(1.5px 1.5px at 1220px 280px, #00E5FF, rgba(0,0,0,0))`,
                backgroundRepeat: "repeat",
                backgroundSize: "750px 500px",
              }}
            />
          </div>

          <div className="relative z-10 p-6 lg:p-8">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Your Meetings
              </h1>
              <p className="text-sm text-[#8E92A6] mt-1">
                {mockMeetings.length} recorded meetings · All AI-powered summaries ready
              </p>
            </div>

            <MeetingCardGrid
              meetings={mockMeetings}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery("")}
            />
          </div>
        </main>

        {/* Right Column: Persistent Ask Fathom Panel */}
        <aside className="flex-[30] min-w-[340px] max-w-[420px] h-full overflow-hidden flex flex-col shrink-0 border-l border-[#1A1D2E] bg-[#0A0C12] z-10">
          <AskPanel />
        </aside>
      </div>
    </div>
  );
}
