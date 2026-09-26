"use client";

import React, { useState } from "react";
import {
  Share2,
  MoreVertical,
  Link as LinkIcon,
  Check,
  Mail,
  Edit2,
  Calendar,
  Clock,
  Download,
  FileText,
  FileCode,
} from "lucide-react";
import { Meeting } from "@/lib/mock-data";
import ActionItemsList from "./ActionItemsList";
import HighlightsList from "./HighlightsList";
import FollowUpEmailModal from "./FollowUpEmailModal";
import SyncCrmModal from "./SyncCrmModal";

interface SummarySidebarProps {
  meeting: Meeting;
  onSeek: (seconds: number) => void;
  currentSeconds: number;
}

export default function SummarySidebar({
  meeting,
  onSeek,
  currentSeconds,
}: SummarySidebarProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState(meeting.title);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const formattedDate = new Date(meeting.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const formattedTime = new Date(meeting.date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const thumbUrl =
    meeting.thumbnail ||
    (meeting.id === "meeting-2"
      ? "/images/thumb_standup.jpg"
      : meeting.id === "meeting-3"
      ? "/images/thumb_onboarding.jpg"
      : meeting.id === "meeting-4"
      ? "/images/thumb_oneone.jpg"
      : meeting.id === "meeting-5"
      ? "/images/thumb_planning.jpg"
      : "/images/thumb_sales.jpg");

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setShowShareMenu(false);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const formatTimeSec = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder.toString().padStart(2, "0")}`;
  };

  const formatSrtTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")},000`;
  };

  const handleExportMarkdown = () => {
    const md = [
      `# ${meeting.title}`,
      `**Date:** ${new Date(meeting.date).toLocaleString()}  `,
      `**Duration:** ${meeting.durationMinutes} minutes  `,
      `**Participants:** ${meeting.participants.map((p) => p.name).join(", ")}  `,
      "",
      "## Executive Summary",
      ...meeting.summary.map((s) => `- **${s.category || "Insight"}:** ${s.text}`),
      "",
      "## Action Items",
      ...meeting.actionItems.map((a) => `- [${a.isDone ? "x" : " "}] ${a.text} (${a.assignee || "Unassigned"})`),
      "",
      "## Key Quotes & Highlights",
      ...meeting.highlights.map((h) => `> "${h.quoteText}" — *${h.speakerName}*`),
    ].join("\n");

    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${meeting.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_notes.md`;
    a.click();
    URL.revokeObjectURL(url);
    setShowShareMenu(false);
  };

  const handleExportTranscript = () => {
    const txt = meeting.transcript
      .map((l) => `[${formatTimeSec(l.timestampSeconds)}] ${l.speakerName}: ${l.text}`)
      .join("\n\n");
    const blob = new Blob([txt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${meeting.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_transcript.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setShowShareMenu(false);
  };

  const handleExportSrt = () => {
    const srt = meeting.transcript
      .map((l, i) => {
        const start = formatSrtTime(l.timestampSeconds);
        const nextTime = meeting.transcript[i + 1]?.timestampSeconds || l.timestampSeconds + 5;
        const end = formatSrtTime(nextTime);
        return `${i + 1}\n${start} --> ${end}\n${l.speakerName}: ${l.text}\n`;
      })
      .join("\n");
    const blob = new Blob([srt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${meeting.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_captions.srt`;
    a.click();
    URL.revokeObjectURL(url);
    setShowShareMenu(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0C12] text-white">
      {/* Top Header & Toolbar */}
      <div className="p-4 border-b border-[#1A1D2E] space-y-3 shrink-0">
        {/* Title Row with Thumbnail */}
        <div className="flex items-start gap-3">
          <div className="relative w-14 h-10 rounded-lg overflow-hidden border border-[#1E2030] shrink-0 group shadow-sm mt-0.5">
            <img
              src={thumbUrl}
              alt={meetingTitle}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="flex-1 min-w-0">
            {isEditingTitle ? (
              <input
                type="text"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
                autoFocus
                className="text-xs font-semibold bg-[#12141D] border border-[#00E5FF]/50 rounded-lg px-2 py-1 text-white w-full focus:outline-none"
              />
            ) : (
              <div className="flex items-center gap-1.5 group">
                <h2
                  onClick={() => setIsEditingTitle(true)}
                  className="text-xs font-semibold text-white hover:text-[#00E5FF] cursor-pointer transition-colors truncate"
                  title="Click to edit title"
                >
                  {meetingTitle}
                </h2>
                <button
                  onClick={() => setIsEditingTitle(true)}
                  className="opacity-0 group-hover:opacity-100 text-[#555869] hover:text-white transition-opacity shrink-0"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[#8E92A6]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#555869]" />
                {formattedDate}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#555869]" />
                {meeting.durationMinutes}m
              </span>
            </div>
          </div>
        </div>

        {/* Participant chips */}
        <div className="flex flex-wrap items-center gap-1">
          {meeting.participants.map((p, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#12141D] border border-[#1E2030] text-[10px] text-[#C5C8D8]"
            >
              <span
                className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-bold text-white shrink-0"
                style={{ backgroundColor: p.avatarColor }}
              >
                {p.initials}
              </span>
              <span className="truncate max-w-[100px]">{p.name}</span>
            </span>
          ))}
        </div>

        {/* Action Buttons: Email, CRM Sync, Share */}
        <div className="space-y-1.5 pt-1">
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setIsEmailModalOpen(true)}
              className="py-1.5 px-2.5 rounded-lg bg-[#00E5FF] hover:bg-[#38EDFF] text-[#050608] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm shadow-[#00E5FF]/20 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Draft email</span>
            </button>

            <button
              onClick={() => setIsSyncModalOpen(true)}
              className="py-1.5 px-2.5 rounded-lg bg-[#12141D] hover:bg-[#1C1E2A] border border-[#1E2030] hover:border-[#00E5FF]/40 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Sync to CRM</span>
            </button>
          </div>

          {/* Secondary Actions: Share Link & Export Menu */}
          <div className="flex items-center gap-1.5 relative">
            <button
              onClick={handleCopyShareLink}
              className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#12141D] hover:bg-[#1C1E2A] border border-[#1E2030] hover:border-[#353950] text-xs font-medium text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 text-xs">Link copied!</span>
                </>
              ) : (
                <>
                  <LinkIcon className="w-3.5 h-3.5 text-[#8E92A6]" />
                  <span>Copy share link</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="p-1.5 rounded-lg bg-[#12141D] hover:bg-[#1C1E2A] border border-[#1E2030] hover:border-[#353950] text-[#8E92A6] hover:text-white transition-all cursor-pointer"
              title="Exports & more"
            >
              <MoreVertical className="w-3.5 h-3.5" />
            </button>

            {/* Overflow & Export Dropdown */}
            {showShareMenu && (
              <div className="absolute top-full right-0 mt-1 w-52 p-1.5 bg-[#0E111A] border border-[#25283D] rounded-xl z-20 space-y-0.5 text-xs shadow-2xl shadow-black/80 text-white">
                <button
                  onClick={handleCopyShareLink}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#1A1D2E] text-[#D8DAE5] hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <LinkIcon className="w-3.5 h-3.5 text-[#8E92A6]" />
                  <span>Copy share link</span>
                </button>

                <div className="h-px bg-[#1A1D2E] my-1" />

                <div className="px-2.5 py-1 text-[10px] font-semibold text-[#8E92A6] uppercase tracking-wider">
                  Export Files
                </div>

                <button
                  onClick={handleExportMarkdown}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#1A1D2E] text-[#D8DAE5] hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>Markdown Notes (.md)</span>
                </button>

                <button
                  onClick={handleExportTranscript}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#1A1D2E] text-[#D8DAE5] hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verbatim Transcript (.txt)</span>
                </button>

                <button
                  onClick={handleExportSrt}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#1A1D2E] text-[#D8DAE5] hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <FileCode className="w-3.5 h-3.5 text-purple-400" />
                  <span>Subtitles / Captions (.srt)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Content (Action Items + Highlights) with Custom Scrollbar */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        <ActionItemsList initialItems={meeting.actionItems} />
        <HighlightsList
          highlights={meeting.highlights}
          onSeek={onSeek}
          currentSeconds={currentSeconds}
        />
      </div>

      {/* Email Modal Dialog */}
      <FollowUpEmailModal
        meeting={meeting}
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />

      {/* CRM Sync Modal Dialog */}
      <SyncCrmModal
        meeting={meeting}
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
      />
    </div>
  );
}

