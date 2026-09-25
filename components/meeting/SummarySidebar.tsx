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
    <div className="flex flex-col h-full bg-surface text-text-primary">
      {/* Top Header & Toolbar (Sticky at top of sidebar) */}
      <div className="p-5 border-b border-border-subtle bg-surface space-y-4 shrink-0">
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
              className="text-base font-semibold bg-surface-elevated border border-accent rounded-md px-2 py-1 text-text-primary w-full focus:outline-none"
            />
          ) : (
            <div className="flex items-center gap-2 group">
              <h2
                onClick={() => setIsEditingTitle(true)}
                className="text-base font-semibold tracking-tight text-text-primary hover:text-text-secondary cursor-pointer"
                title="Click to edit title"
              >
                {meetingTitle}
              </h2>
              <button
                onClick={() => setIsEditingTitle(true)}
                className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-text-primary transition-opacity"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            </div>
          )}

          <p className="text-[11px] font-mono text-text-muted mt-1">
            {formattedDate} • {meeting.durationMinutes} mins
          </p>
        </div>

        {/* Primary Hero CTA: Draft Follow-up Email */}
        <div className="space-y-2">
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="w-full py-2 px-3 rounded-md bg-accent hover:bg-accent-hover text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Draft follow-up email</span>
          </button>

          {/* Secondary Actions: Share & Overflow */}
          <div className="flex items-center gap-2 relative">
            <button
              onClick={handleCopyShareLink}
              className="flex-1 py-1.5 px-3 rounded-md bg-surface-elevated hover:bg-surface-active border border-border-muted text-xs font-medium text-text-primary flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-text-primary" />
                  <span>Link copied</span>
                </>
              ) : (
                <>
                  <LinkIcon className="w-3.5 h-3.5 text-text-muted" />
                  <span>Copy share link</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="p-1.5 rounded-md bg-surface-elevated hover:bg-surface-active border border-border-muted text-text-muted hover:text-text-primary transition-colors"
            >
              <MoreVertical className="w-3.5 h-3.5" />
            </button>

            {/* Share Dropdown Popover */}
            {showShareMenu && (
              <div className="absolute top-full right-0 mt-1 w-48 p-1 bg-surface-elevated border border-border-strong rounded-md z-20 space-y-0.5 text-xs">
                <button
                  onClick={handleCopyShareLink}
                  className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-surface-active text-text-primary flex items-center gap-2"
                >
                  <LinkIcon className="w-3.5 h-3.5 text-text-muted" />
                  <span>Copy share link</span>
                </button>
                <button
                  onClick={() => {
                    setShowShareMenu(false);
                    setIsEmailModalOpen(true);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-surface-active text-text-primary flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-text-muted" />
                  <span>Open follow-up draft</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Content (Action Items + Highlights) */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
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
