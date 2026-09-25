"use client";

import React, { useState } from "react";
import {
  Share2,
  MoreVertical,
  Link as LinkIcon,
  Check,
  Mail,
  Edit2,
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
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setShowShareMenu(false);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0E0F1A] border-l border-[#1E2032] text-white">
      {/* Top Header & Toolbar (Sticky at top of sidebar) */}
      <div className="p-6 border-b border-[#1E2032] bg-[#0E0F1A] space-y-4 shrink-0">
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
              className="text-xl font-bold bg-[#141625] border border-[#00A3FF] rounded px-2 py-0.5 text-white w-full focus:outline-none"
            />
          ) : (
            <div className="flex items-center gap-2 group">
              <h2
                onClick={() => setIsEditingTitle(true)}
                className="text-xl font-bold tracking-tight text-white hover:text-white/90 cursor-pointer"
                title="Click to edit title"
              >
                {meetingTitle}
              </h2>
              <button
                onClick={() => setIsEditingTitle(true)}
                className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-white transition-opacity"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <p className="text-xs text-white/40 mt-1 font-medium">
            {formattedDate}
          </p>
        </div>

        {/* Share Button & Actions Row (Matching Screenshot) */}
        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="flex-1 py-2 px-4 rounded-xl bg-[#141726] hover:bg-[#1A1E33] border border-[#242944] text-xs font-semibold text-[#00A3FF] flex items-center justify-between transition-all group shadow-sm"
          >
            <span>{copiedLink ? "Link Copied!" : "Share"}</span>
            {copiedLink ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <LinkIcon className="w-4 h-4 text-[#00A3FF] group-hover:rotate-45 transition-transform" />
            )}
          </button>

          {/* Quick Draft Email Action (Hero Action per Spec Section 3) */}
          <button
            onClick={() => setIsEmailModalOpen(true)}
            title="Draft Follow-up Email"
            className="p-2 rounded-xl bg-[#141726] hover:bg-[#1A1E33] border border-[#242944] text-white/70 hover:text-[#00A3FF] transition-colors"
          >
            <Mail className="w-4 h-4" />
          </button>

          {/* More options menu */}
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="p-2 rounded-xl bg-[#141726] hover:bg-[#1A1E33] border border-[#242944] text-white/70 hover:text-white transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* Share Dropdown Popover */}
          {showShareMenu && (
            <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-[#16182B] border border-[#2C3150] rounded-xl shadow-2xl z-20 space-y-1">
              <button
                onClick={handleCopyShareLink}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-xs text-white flex items-center gap-2"
              >
                <LinkIcon className="w-3.5 h-3.5 text-[#00A3FF]" />
                <span>Copy Shareable Link</span>
              </button>
              <button
                onClick={() => {
                  setShowShareMenu(false);
                  setIsEmailModalOpen(true);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-xs text-white flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Email Summary & Action Items</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Content: Action Items + Annotations */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <ActionItemsList
          initialItems={meeting.actionItems}
          onExtractMore={() => setIsEmailModalOpen(true)}
        />

        <HighlightsList
          highlights={meeting.highlights}
          onSeek={onSeek}
          currentSeconds={currentSeconds}
        />
      </div>

      {/* Follow-up Email Modal */}
      <FollowUpEmailModal
        meeting={meeting}
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </div>
  );
}
