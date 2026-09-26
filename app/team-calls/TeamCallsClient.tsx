"use client";

import React, { useState, useMemo } from "react";
import { Users, Search, Share2, Filter, UserCheck } from "lucide-react";
import {
  Meeting,
  getAllMeetings,
  deleteMeetingById,
} from "@/lib/mock-data";
import TopNav, { UserProfile } from "@/components/dashboard/TopNav";
import MeetingCardGrid from "@/components/dashboard/MeetingCardGrid";
import AskPanel from "@/components/dashboard/AskPanel";

interface TeamCallsClientProps {
  user: UserProfile;
}

export default function TeamCallsClient({ user }: TeamCallsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("team-calls");
  const [selectedCollaborator, setSelectedCollaborator] = useState<string>("all");
  const [allMeetings, setAllMeetings] = useState<Meeting[]>(() => getAllMeetings());

  // Filter to only meetings where sharedBy is set
  const sharedMeetings: Meeting[] = useMemo(() => {
    return allMeetings.filter((m) => !!m.sharedBy);
  }, [allMeetings]);

  // Extract unique collaborators
  const collaborators = useMemo(() => {
    const map = new Map<string, string>();
    sharedMeetings.forEach((m) => {
      if (m.sharedBy) {
        map.set(m.sharedBy.name, m.sharedBy.avatarInitials);
      }
    });
    return Array.from(map.entries()).map(([name, initials]) => ({
      name,
      initials,
    }));
  }, [sharedMeetings]);

  const filteredMeetings = useMemo(() => {
    if (selectedCollaborator === "all") return sharedMeetings;
    return sharedMeetings.filter((m) => m.sharedBy?.name === selectedCollaborator);
  }, [sharedMeetings, selectedCollaborator]);

  const handleDeleteMeeting = (id: string) => {
    const updated = deleteMeetingById(id);
    setAllMeetings(updated);
  };

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

          <div className="relative z-10 p-6 lg:p-8 space-y-6">
            {/* Header with Team Context */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#1A1D2E]">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    Team Calls
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-[#38EDFF] bg-gradient-to-r from-[#00E5FF]/15 to-[#00E5FF]/5 border border-[#00E5FF]/30 shadow-[0_0_12px_rgba(0,229,255,0.12)] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_6px_#00E5FF] animate-pulse" />
                    <Users className="w-3.5 h-3.5" />
                    <span>Collaborator Shared</span>
                  </span>
                </div>
                <p className="text-sm text-[#8E92A6] mt-1">
                  {filteredMeetings.length} {filteredMeetings.length === 1 ? "call" : "calls"} shared with your workspace
                </p>
              </div>

              {/* Collaborator Filter Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setSelectedCollaborator("all")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCollaborator === "all"
                      ? "bg-gradient-to-r from-[#00E5FF] to-[#38EDFF] text-[#050608] shadow-[0_0_14px_rgba(0,229,255,0.3)] font-bold"
                      : "bg-white/[0.03] hover:bg-white/[0.08] text-[#8E92A6] hover:text-white border border-white/10"
                  }`}
                >
                  All ({sharedMeetings.length})
                </button>

                {collaborators.map((c) => {
                  const isSelected = selectedCollaborator === c.name;
                  const count = sharedMeetings.filter((m) => m.sharedBy?.name === c.name).length;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedCollaborator(c.name)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-gradient-to-r from-[#00E5FF] to-[#38EDFF] text-[#050608] shadow-[0_0_14px_rgba(0,229,255,0.3)] font-bold"
                          : "bg-white/[0.03] hover:bg-white/[0.08] text-[#8E92A6] hover:text-white border border-white/10"
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${
                        isSelected ? "bg-black/80 text-[#00E5FF]" : "bg-[#1E2030] text-[#00E5FF] border border-[#00E5FF]/20"
                      }`}>
                        {c.initials}
                      </span>
                      <span>{c.name}</span>
                      <span className="opacity-70 text-[10px]">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Grid or Empty State */}
            {filteredMeetings.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-[#0A0C12] border border-[#1A1D2E] max-w-lg mx-auto my-12">
                <div className="w-12 h-12 rounded-xl bg-[#12141D] border border-[#1E2030] flex items-center justify-center text-[#555869] mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  No team calls found
                </h3>
                <p className="text-xs text-[#8E92A6] mt-1 max-w-sm">
                  {selectedCollaborator !== "all"
                    ? `No recordings found shared by ${selectedCollaborator}.`
                    : "When collaborators or team members share their call recordings with you, they will appear here automatically."}
                </p>
              </div>
            ) : (
              <MeetingCardGrid
                meetings={filteredMeetings}
                searchQuery={searchQuery}
                onClearSearch={() => setSearchQuery("")}
                onDeleteMeeting={handleDeleteMeeting}
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
