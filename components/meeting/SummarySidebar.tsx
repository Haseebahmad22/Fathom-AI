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
} from "lucide-react";
import { Meeting } from "@/lib/mock-data";
import ActionItemsList from "./ActionItemsList";
import HighlightsList from "./HighlightsList";
import FollowUpEmailModal from "./FollowUpEmailModal";

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
  const [showShareMenu, setShowShareMenu] = useState(false);

  const formattedDate = new Date(meeting.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = new Date(meeting.date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setShowShareMenu(false);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0C12] text-white">
      {/* Top Header & Toolbar */}
      <div className="p-6 border-b border-[#1A1D2E] space-y-4 shrink-0">
        {/* Meeting Thumbnail Preview Card */}
        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-[#1E2030] shadow-md group">
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
            alt={meetingTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C12] via-black/20 to-transparent" />
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[10px] font-semibold text-[#00E5FF] border border-[#00E5FF]/20 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            <span>Recorded Call</span>
          </div>
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[10px] font-mono text-white">
            {meeting.durationMinutes} min
          </div>
        </div>

        {/* Title and Date */}
        <div>
          {isEditingTitle ? (
            <input
              type="text"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
              autoFocus
              className="text-lg font-semibold bg-[#12141D] border border-[#00E5FF]/50 rounded-xl px-3 py-2 text-white w-full focus:outline-none"
            />
          ) : (
            <div className="flex items-center gap-2 group">
              <h2
                onClick={() => setIsEditingTitle(true)}
                className="text-lg font-semibold tracking-tight text-white hover:text-[#00E5FF] cursor-pointer transition-colors"
                title="Click to edit title"
              >
                {meetingTitle}
              </h2>
              <button
                onClick={() => setIsEditingTitle(true)}
                className="opacity-0 group-hover:opacity-100 text-[#555869] hover:text-white transition-opacity"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-3 mt-2 text-xs text-[#8E92A6]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#555869]" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#555869]" />
              {formattedTime} · {meeting.durationMinutes} min
            </span>
          </div>

          {/* Participant chips */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            {meeting.participants.map((p, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#12141D] border border-[#1E2030] text-xs text-[#C5C8D8]"
              >
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                  style={{ backgroundColor: p.avatarColor }}
                >
                  {p.initials}
                </span>
                {p.name}
              </span>
            ))}
          </div>
        </div>

        {/* Primary Hero CTA: Draft Follow-up Email */}
        <div className="space-y-2.5">
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-[#00E5FF] hover:bg-[#38EDFF] text-[#050608] text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-[#00E5FF]/20"
          >
            <Mail className="w-4 h-4" />
            <span>Draft follow-up email</span>
          </button>

          {/* Secondary Actions: Share & Overflow */}
          <div className="flex items-center gap-2 relative">
            <button
              onClick={handleCopyShareLink}
              className="flex-1 py-2 px-3 rounded-xl bg-[#12141D] hover:bg-[#1C1E2A] border border-[#1E2030] hover:border-[#353950] text-sm font-medium text-white flex items-center justify-center gap-2 transition-all"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Link copied!</span>
                </>
              ) : (
                <>
                  <LinkIcon className="w-4 h-4 text-[#8E92A6]" />
                  <span>Copy share link</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="p-2 rounded-xl bg-[#12141D] hover:bg-[#1C1E2A] border border-[#1E2030] hover:border-[#353950] text-[#8E92A6] hover:text-white transition-all"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {/* Share Dropdown */}
            {showShareMenu && (
              <div className="absolute top-full right-0 mt-1.5 w-52 p-1.5 bg-[#12141D] border border-[#353950] rounded-xl z-20 space-y-0.5 text-sm shadow-xl shadow-black/40">
                <button
                  onClick={handleCopyShareLink}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#1C1E2A] text-white flex items-center gap-2.5"
                >
                  <LinkIcon className="w-4 h-4 text-[#8E92A6]" />
                  <span>Copy share link</span>
                </button>
                <button
                  onClick={() => {
                    setShowShareMenu(false);
                    setIsEmailModalOpen(true);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#1C1E2A] text-white flex items-center gap-2.5"
                >
                  <Mail className="w-4 h-4 text-[#8E92A6]" />
                  <span>Open follow-up draft</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Content (Action Items + Highlights) */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <ActionItemsList initialItems={meeting.actionItems} />
        <HighlightsList
          highlights={meeting.highlights}
          onSeek={onSeek}
          currentSeconds={currentSeconds}
        />
      </div>

      {/* Modal Dialog */}
      <FollowUpEmailModal
        meeting={meeting}
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </div>
  );
}
