"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  User as UserIcon,
} from "lucide-react";
import { mockMeetings, Meeting } from "@/lib/mock-data";
import VideoPlayer from "@/components/meeting/VideoPlayer";
import TranscriptPanel from "@/components/meeting/TranscriptPanel";
import SummaryView from "@/components/meeting/SummaryView";
import AskFathomPanel from "@/components/meeting/AskFathomPanel";
import SummarySidebar from "@/components/meeting/SummarySidebar";

interface MeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function MeetingDetailPage({ params }: MeetingPageProps) {
  const resolvedParams = use(params);
  const meetingId = resolvedParams.id;

  const meeting: Meeting =
    mockMeetings.find((m) => m.id === meetingId) || mockMeetings[0];

  const [activeTab, setActiveTab] = useState<"summary" | "transcript" | "ask">(
    "summary"
  );
  const [currentSeconds, setCurrentSeconds] = useState<number>(14);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Playback timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSeconds((prev) => {
          const maxSecs = meeting.durationMinutes * 60;
          if (prev >= maxSecs) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, meeting.durationMinutes]);

  const handleSeek = (secs: number) => {
    setCurrentSeconds(secs);
  };

  const tabs = [
    { id: "summary" as const, label: "Summary" },
    { id: "transcript" as const, label: "Transcript" },
    { id: "ask" as const, label: "Ask Fathom" },
  ];

  return (
    <div className="h-screen w-screen bg-[#050608] text-white flex flex-col overflow-hidden font-sans select-none">
      {/* Top Navbar - Compact */}
      <header className="h-12 border-b border-[#1A1D2E] bg-[#0A0C12] px-4 lg:px-6 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs text-[#8E92A6] hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-[#12141D]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>

          <div className="w-px h-5 bg-[#1E2030]" />

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#555869]">Meetings</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#555869]" />
            <img
              src={
                meeting.thumbnail ||
                (meeting.id === "meeting-2"
                  ? "/images/thumb_standup.jpg"
                  : meeting.id === "meeting-3"
                  ? "/images/thumb_onboarding.jpg"
                  : meeting.id === "meeting-4"
                  ? "/images/thumb_oneone.jpg"
                  : meeting.id === "meeting-5"
                  ? "/images/thumb_planning.jpg"
                  : "/images/thumb_sales.jpg")
              }
              alt=""
              className="w-5 h-5 rounded object-cover border border-[#1E2030]"
            />
            <span className="font-medium text-white truncate max-w-[300px]">
              {meeting.title}
            </span>
          </div>
        </div>

        {/* Brand Logo & User */}
        <div className="flex items-center gap-5">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <span className="text-sm font-black tracking-tight text-white">
              FATHOM
            </span>
            <svg width="16" height="12" viewBox="0 0 22 16" fill="none" className="mt-0.5">
              <path d="M2 12C4 4 8 2 11 8C14 14 18 12 20 4" stroke="#00B8D4" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M6 14C8 6 12 4 15 10C18 16 20 10 22 6" stroke="#00B8D4" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            </svg>
          </Link>

          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00E5FF]/20 to-[#7C3AED]/20 border border-[#1E2030] flex items-center justify-center text-[#8E92A6]">
            <UserIcon className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* Main Two-Column Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column (~68% width): Video Player + Tab Bar + Tab Content */}
        <div className="flex-[68] flex flex-col h-full overflow-hidden border-r border-[#1A1D2E] bg-[#050608]">
          {/* Video Player */}
          <VideoPlayer
            meeting={meeting}
            currentSeconds={currentSeconds}
            onSeek={handleSeek}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
          />

          {/* Horizontal Tab Bar - Compact Height */}
          <div className="px-4 bg-[#0A0C12] flex items-center gap-1 border-b border-[#1A1D2E] shrink-0 h-10">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 text-xs font-semibold relative transition-all rounded-md cursor-pointer ${
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

          {/* Dynamic Tab Content Area with Custom Scrollbar */}
          <div className={`flex-1 ${activeTab === "ask" ? "overflow-hidden flex flex-col" : "overflow-y-auto custom-scrollbar"} bg-[#050608]`}>
            {activeTab === "summary" && (
              <SummaryView summary={meeting.summary} meeting={meeting} />
            )}

            {activeTab === "transcript" && (
              <TranscriptPanel
                transcript={meeting.transcript}
                highlights={meeting.highlights}
                currentSeconds={currentSeconds}
                onSeek={handleSeek}
                hostName={meeting.participants[0]?.name}
              />
            )}

            {activeTab === "ask" && (
              <AskFathomPanel meeting={meeting} onSeek={handleSeek} />
            )}
          </div>
        </div>

        {/* Right Column (~32% width, Sticky/Persistent): Summary, Actions & Highlights Sidebar */}
        <div className="flex-[32] min-w-[290px] max-w-[360px] h-full overflow-hidden flex flex-col shrink-0 bg-[#0A0C12]">
          <SummarySidebar
            meeting={meeting}
            onSeek={handleSeek}
            currentSeconds={currentSeconds}
          />
        </div>
      </div>
    </div>
  );
}
