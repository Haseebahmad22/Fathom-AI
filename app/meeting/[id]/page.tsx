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

  return (
    <div className="h-screen w-screen bg-app text-text-primary flex flex-col overflow-hidden font-sans select-none">
      {/* Top Navbar */}
      <header className="h-12 border-b border-border-subtle bg-surface px-4 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors px-2 py-1 rounded-md hover:bg-surface-elevated"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>

          <span className="text-border-muted">|</span>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-text-muted">Meetings</span>
            <ChevronRight className="w-3 h-3 text-text-muted" />
            <span className="font-medium text-text-primary truncate max-w-[240px]">
              {meeting.title}
            </span>
          </div>
        </div>

        {/* Brand Logo & User */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <span className="text-xs font-bold tracking-tight text-text-primary">
              FATHOM
            </span>
            <span className="w-1.5 h-3 bg-accent rounded-xs" />
          </Link>

          <div className="w-7 h-7 rounded-md bg-surface-elevated border border-border-muted flex items-center justify-center text-text-secondary">
            <UserIcon className="w-3.5 h-3.5" />
          </div>
        </div>
      </header>

      {/* Main Two-Column Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column (~65% width): Video Player + Tab Bar + Tab Content */}
        <div className="flex-[65] flex flex-col h-full overflow-hidden border-r border-border-subtle bg-app">
          {/* Video Player */}
          <VideoPlayer
            meeting={meeting}
            currentSeconds={currentSeconds}
            onSeek={handleSeek}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
          />

          {/* Horizontal Tab Bar */}
          <div className="px-6 border-b border-border-subtle bg-surface flex items-center gap-6 shrink-0">
            <button
              onClick={() => setActiveTab("summary")}
              className={`py-2.5 text-xs font-medium relative transition-colors ${
                activeTab === "summary"
                  ? "text-text-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Summary
              {activeTab === "summary" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("transcript")}
              className={`py-2.5 text-xs font-medium relative transition-colors ${
                activeTab === "transcript"
                  ? "text-text-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Transcript
              {activeTab === "transcript" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("ask")}
              className={`py-2.5 text-xs font-medium relative transition-colors ${
                activeTab === "ask"
                  ? "text-text-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Ask Fanthom
              {activeTab === "ask" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>
          </div>

          {/* Dynamic Tab Content Area */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "summary" && (
              <SummaryView summary={meeting.summary} />
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

        {/* Right Column (~35% width, Sticky/Persistent): Summary, Actions & Highlights Sidebar */}
        <div className="flex-[35] min-w-[340px] max-w-[420px] h-full overflow-hidden flex flex-col shrink-0 bg-surface">
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
