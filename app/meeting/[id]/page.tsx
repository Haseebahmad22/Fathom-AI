"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
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

  return (
    <div className="h-screen w-screen bg-[#07080F] text-white flex flex-col overflow-hidden font-sans select-none">
      {/* Top Navbar */}
      <header className="h-12 border-b border-[#1E2032] bg-[#0E0F1A] px-4 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>

          <span className="text-white/20">|</span>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-white/40">Meetings</span>
            <ChevronRight className="w-3 h-3 text-white/30" />
            <span className="font-semibold text-white/90 truncate max-w-[240px]">
              {meeting.title}
            </span>
          </div>
        </div>

        {/* Brand Logo & User */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#00A3FF] to-[#4E46DC] flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight text-white group-hover:text-[#00A3FF] transition-colors">
              Fanthom
            </span>
          </Link>

          <div className="w-7 h-7 rounded-full bg-[#1F2338] border border-[#2F3452] flex items-center justify-center text-white/70">
            <UserIcon className="w-3.5 h-3.5" />
          </div>
        </div>
      </header>

      {/* Main Two-Column Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column (~65% width): Video Player + Tab Bar + Tab Content */}
        <div className="flex-[65] flex flex-col h-full overflow-hidden border-r border-[#1E2032] bg-[#0E0F1A]">
          {/* Video Player */}
          <VideoPlayer
            meeting={meeting}
            currentSeconds={currentSeconds}
            onSeek={handleSeek}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
          />

          {/* Horizontal Tab Bar matching Fathom Screenshot */}
          <div className="px-6 border-b border-[#1E2032] bg-[#0A0B14] flex items-center gap-8 shrink-0">
            <button
              onClick={() => setActiveTab("summary")}
              className={`py-3 text-xs font-bold uppercase tracking-wider relative transition-colors ${
                activeTab === "summary"
                  ? "text-[#00A3FF]"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              Summary
              {activeTab === "summary" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00A3FF] shadow-sm shadow-[#00A3FF]/50" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("transcript")}
              className={`py-3 text-xs font-bold uppercase tracking-wider relative transition-colors ${
                activeTab === "transcript"
                  ? "text-[#00A3FF]"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              Transcript
              {activeTab === "transcript" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00A3FF] shadow-sm shadow-[#00A3FF]/50" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("ask")}
              className={`py-3 text-xs font-bold uppercase tracking-wider relative transition-colors ${
                activeTab === "ask"
                  ? "text-[#00A3FF]"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              Ask Fathom
              {activeTab === "ask" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00A3FF] shadow-sm shadow-[#00A3FF]/50" />
              )}
            </button>
          </div>

          {/* Dynamic Tab Body */}
          <div className="flex-1 overflow-hidden relative">
            {activeTab === "summary" && <SummaryView summary={meeting.summary} />}
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

        {/* Right Column (~35% width): Sticky Header + Action Items + Annotations */}
        <div className="flex-[35] min-w-[360px] max-w-[460px] h-full overflow-hidden flex flex-col bg-[#0E0F1A]">
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
