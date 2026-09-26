"use client";

import React, { useState } from "react";
import { Users, Search, Share2 } from "lucide-react";
import { mockMeetings, Meeting } from "@/lib/mock-data";
import TopNav, { UserProfile } from "@/components/dashboard/TopNav";
import MeetingCardGrid from "@/components/dashboard/MeetingCardGrid";
import AskPanel from "@/components/dashboard/AskPanel";

interface TeamCallsClientProps {
  user: UserProfile;
}

export default function TeamCallsClient({ user }: TeamCallsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("team-calls");

  // Filter to only meetings where sharedBy is set
  const sharedMeetings: Meeting[] = mockMeetings.filter((m) => !!m.sharedBy);

  return (
    <div className="h-screen w-screen bg-[#050608] text-white flex flex-col overflow-hidden font-sans select-none">
      {/* Top Navigation Bar with activeTab="team-calls" */}
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
        <main className="relative flex-[70] h-full overflow-y-auto bg-[#050608] custom-scrollbar">
          {/* Ambient top glow */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-[300px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,229,255,0.04),transparent_70%)]" />

          <div className="relative z-10 p-6 lg:p-8">
            {/* Header with Team Context */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    Team Calls
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    Collaborator Shared
                  </span>
                </div>
                <p className="text-sm text-[#8E92A6] mt-1">
                  {sharedMeetings.length} calls shared by your team members and subcontractors
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#8E92A6] bg-[#0A0C12] border border-[#1E2030] px-3 py-1.5 rounded-lg">
                <Share2 className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>Showing externally and internally shared recordings</span>
              </div>
            </div>

            {/* Grid or Empty State */}
            {sharedMeetings.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-[#0A0C12] border border-[#1A1D2E] max-w-lg mx-auto my-12">
                <div className="w-12 h-12 rounded-xl bg-[#12141D] border border-[#1E2030] flex items-center justify-center text-[#555869] mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  No team calls shared yet
                </h3>
                <p className="text-xs text-[#8E92A6] mt-1 max-w-sm">
                  When collaborators or team members share their call recordings with you, they will appear here automatically.
                </p>
              </div>
            ) : (
              <MeetingCardGrid
                meetings={sharedMeetings}
                searchQuery={searchQuery}
                onClearSearch={() => setSearchQuery("")}
              />
            )}
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
