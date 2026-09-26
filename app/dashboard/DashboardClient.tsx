"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Upload,
  Filter,
  ArrowUpDown,
  Calendar,
  Clock,
  Sparkles,
  Plus,
} from "lucide-react";
import {
  Meeting,
  getAllMeetings,
  deleteMeetingById,
} from "@/lib/mock-data";
import TopNav, { UserProfile } from "@/components/dashboard/TopNav";
import MeetingCardGrid from "@/components/dashboard/MeetingCardGrid";
import AskPanel from "@/components/dashboard/AskPanel";
import UploadRecordingModal from "@/components/dashboard/UploadRecordingModal";

interface DashboardClientProps {
  user: UserProfile;
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("my-calls");

  // Filters & Sorting state
  const [dateRange, setDateRange] = useState<"all" | "7d" | "30d">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "duration-desc" | "duration-asc" | "alpha">("newest");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    setMeetings(getAllMeetings());
  }, []);

  const handleDeleteMeeting = (meetingId: string) => {
    const updated = deleteMeetingById(meetingId);
    setMeetings(updated);
  };

  const handleMeetingUploaded = (newMeeting: Meeting) => {
    setMeetings((prev) => [newMeeting, ...prev]);
  };

  // Filter & sort meetings
  const processedMeetings = useMemo(() => {
    let result = [...meetings];

    // Date Range Filter
    const now = new Date("2026-09-26T12:00:00Z").getTime(); // fixed anchor for seeded data
    if (dateRange === "7d") {
      const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
      result = result.filter((m) => new Date(m.date).getTime() >= sevenDaysAgo);
    } else if (dateRange === "30d") {
      const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
      result = result.filter((m) => new Date(m.date).getTime() >= thirtyDaysAgo);
    }

    // Sort By
    result.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "duration-desc":
          return b.durationMinutes - a.durationMinutes;
        case "duration-asc":
          return a.durationMinutes - b.durationMinutes;
        case "alpha":
          return a.title.localeCompare(b.title);
        case "newest":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return result;
  }, [meetings, dateRange, sortBy]);

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
        <main className="relative flex-[70] h-full overflow-y-auto bg-[#050608] custom-scrollbar">
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

          <div className="relative z-10 p-6 lg:p-8 space-y-6">
            {/* Header & Controls Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#1A1D2E]">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Your Meetings
                </h1>
                <p className="text-sm text-[#8E92A6] mt-1">
                  {processedMeetings.length} {processedMeetings.length === 1 ? "call" : "calls"} · AI-powered summaries ready
                </p>
              </div>

              {/* Actions & Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Date Filter Dropdown */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A0C12] border border-[#1E2030] text-xs text-[#8E92A6]">
                  <Calendar className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value as any)}
                    className="bg-transparent text-white focus:outline-none cursor-pointer"
                  >
                    <option value="all" className="bg-[#0A0C12]">All Time</option>
                    <option value="7d" className="bg-[#0A0C12]">Last 7 Days</option>
                    <option value="30d" className="bg-[#0A0C12]">Last 30 Days</option>
                  </select>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A0C12] border border-[#1E2030] text-xs text-[#8E92A6]">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-white focus:outline-none cursor-pointer"
                  >
                    <option value="newest" className="bg-[#0A0C12]">Newest First</option>
                    <option value="oldest" className="bg-[#0A0C12]">Oldest First</option>
                    <option value="duration-desc" className="bg-[#0A0C12]">Longest Duration</option>
                    <option value="duration-asc" className="bg-[#0A0C12]">Shortest Duration</option>
                    <option value="alpha" className="bg-[#0A0C12]">Title (A-Z)</option>
                  </select>
                </div>

                {/* Upload Recording Trigger */}
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="py-2 px-3.5 rounded-xl bg-[#00E5FF] hover:bg-[#38EDFF] text-[#050608] font-semibold text-xs flex items-center gap-2 transition-all shadow-md shadow-[#00E5FF]/20 hover:scale-102 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Upload Recording</span>
                </button>
              </div>
            </div>

            {/* Meetings Grid */}
            <MeetingCardGrid
              meetings={processedMeetings}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery("")}
              onDeleteMeeting={handleDeleteMeeting}
            />
          </div>
        </main>

        {/* Right Column: Persistent Ask Fathom Panel */}
        <aside className="flex-[30] min-w-[340px] max-w-[420px] h-full overflow-hidden flex flex-col shrink-0 border-l border-[#1A1D2E] bg-[#0A0C12] z-10">
          <AskPanel />
        </aside>
      </div>

      {/* Upload Recording Modal */}
      <UploadRecordingModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onMeetingUploaded={handleMeetingUploaded}
      />
    </div>
  );
}
