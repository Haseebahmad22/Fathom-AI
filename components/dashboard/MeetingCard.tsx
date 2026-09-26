"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Play,
  Users,
  CheckSquare,
  Clock,
  MoreVertical,
  Link as LinkIcon,
  Download,
  Film,
  Trash2,
  Check,
  Plus,
} from "lucide-react";
import {
  Meeting,
  getStoredPlaylists,
  addHighlightToStoredPlaylist,
} from "@/lib/mock-data";

interface MeetingCardProps {
  meeting: Meeting;
  onDelete?: (meetingId: string) => void;
}

export default function MeetingCard({ meeting, onDelete }: MeetingCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showPlaylistPicker, setShowPlaylistPicker] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const formattedDate = new Date(meeting.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const formattedTime = new Date(meeting.date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/meeting/${meeting.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setActionFeedback("Link copied!");
    setShowMenu(false);
    setTimeout(() => {
      setCopiedLink(false);
      setActionFeedback(null);
    }, 2000);
  };

  const handleDownloadSummary = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const content = [
      `FATHOM AI SUMMARY: ${meeting.title}`,
      `Date: ${new Date(meeting.date).toLocaleString()}`,
      `Duration: ${meeting.durationMinutes} minutes`,
      `Participants: ${meeting.participants.map((p) => p.name).join(", ")}`,
      "",
      "--- SUMMARY BULLETS ---",
      ...meeting.summary.map((s) => `• [${s.category || "Insight"}] ${s.text}`),
      "",
      "--- ACTION ITEMS ---",
      ...meeting.actionItems.map((a) => `[${a.isDone ? "X" : " "}] ${a.text} (${a.assignee || "Unassigned"})`),
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${meeting.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_summary.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setShowMenu(false);
  };

  const handleAddToPlaylist = (e: React.MouseEvent, playlistId: string, playlistName: string) => {
    e.preventDefault();
    e.stopPropagation();
    const firstHighlight = meeting.highlights[0];
    if (firstHighlight) {
      addHighlightToStoredPlaylist(playlistId, meeting.id, firstHighlight.id);
      setActionFeedback(`Added to ${playlistName}`);
    } else {
      setActionFeedback("No highlight clips in this call");
    }
    setShowPlaylistPicker(false);
    setShowMenu(false);
    setTimeout(() => setActionFeedback(null), 2500);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(`Are you sure you want to remove "${meeting.title}"?`)) {
      if (onDelete) onDelete(meeting.id);
    }
    setShowMenu(false);
  };

  const playlists = getStoredPlaylists();

  return (
    <div className="relative group select-none">
      <Link
        href={`/meeting/${meeting.id}`}
        className="flex flex-col w-full"
      >
        {/* Thumbnail with hover overlay */}
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#12141D] border border-[#1E2030] group-hover:border-[#353950] transition-all">
          {meeting.thumbnail ? (
            <img
              src={meeting.thumbnail}
              alt={meeting.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full grid grid-cols-2 gap-1.5 p-3">
              {meeting.participants.slice(0, 4).map((p, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-[#1A1D2E] flex items-center justify-center"
                >
                  <span className="text-lg font-bold text-[#6B6F82] font-mono">
                    {p.initials}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Play button centered on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-[#00E5FF] flex items-center justify-center shadow-lg shadow-[#00E5FF]/30 scale-90 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-5 h-5 text-[#050608] fill-current ml-0.5" />
            </div>
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono font-medium text-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex items-center gap-1">
            <Clock className="w-2.5 h-2.5 text-[#00E5FF]" />
            <span>{meeting.durationMinutes}:00</span>
          </div>

          {/* Participant count badge */}
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-medium text-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex items-center gap-1">
            <Users className="w-2.5 h-2.5 text-[#00E5FF]" />
            <span>{meeting.participants.length}</span>
          </div>

          {/* Feedback Toast */}
          {actionFeedback && (
            <div className="absolute inset-x-2 top-2 z-20 px-2 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-[10px] font-semibold text-emerald-300 flex items-center justify-center gap-1 shadow-lg shadow-emerald-950/50 animate-in fade-in">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>{actionFeedback}</span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="mt-3 space-y-1.5 px-0.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-white group-hover:text-[#00E5FF] transition-colors truncate leading-tight flex-1">
              {meeting.title}
            </h3>

            {/* 3-Dot Quick Action Trigger */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowMenu(!showMenu);
                setShowPlaylistPicker(false);
              }}
              className="p-1 rounded-md text-[#555869] hover:text-white hover:bg-[#1A1D2E] opacity-0 group-hover:opacity-100 transition-all shrink-0 cursor-pointer"
              title="Quick actions"
            >
              <MoreVertical className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-[#8E92A6]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#555869]" />
              {formattedDate} · {formattedTime}
            </span>

            {meeting.actionItems.length > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold text-emerald-300 bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.12)]">
                <CheckSquare className="w-2.5 h-2.5 text-emerald-400" />
                <span>{meeting.actionItems.filter((a) => a.isDone).length}/{meeting.actionItems.length}</span>
              </span>
            )}
          </div>

          {/* Participant Avatars Row */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center -space-x-1.5">
              {meeting.participants.slice(0, 4).map((p, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-[#0A0C12] flex items-center justify-center text-[9px] font-bold text-white shadow-sm"
                  style={{ backgroundColor: p.avatarColor }}
                  title={p.name}
                >
                  {p.initials}
                </div>
              ))}
              {meeting.participants.length > 4 && (
                <div className="w-6 h-6 rounded-full border-2 border-[#0A0C12] bg-[#1E2030] flex items-center justify-center text-[9px] font-medium text-[#8E92A6]">
                  +{meeting.participants.length - 4}
                </div>
              )}
            </div>

            {/* Shared By Badge */}
            {meeting.sharedBy && (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500/15 to-indigo-500/10 border border-purple-500/30 text-[10px] text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.12)]">
                <span className="w-3.5 h-3.5 rounded-full bg-purple-500/30 text-purple-300 border border-purple-400/40 flex items-center justify-center text-[7px] font-bold shrink-0">
                  {meeting.sharedBy.avatarInitials}
                </span>
                <span className="truncate max-w-[125px]">
                  Shared by <strong className="text-white font-medium">{meeting.sharedBy.name}</strong>
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* 3-Dot Dropdown Menu */}
      {showMenu && (
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute right-0 top-12 z-30 w-48 p-1.5 bg-[#0E111A] border border-[#25283D] rounded-xl shadow-2xl text-xs space-y-0.5 animate-in fade-in zoom-in-95 duration-100 text-white"
        >
          <button
            onClick={handleCopyLink}
            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#1A1D2E] text-[#D8DAE5] hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
          >
            <LinkIcon className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Copy share link</span>
          </button>

          <button
            onClick={handleDownloadSummary}
            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#1A1D2E] text-[#D8DAE5] hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Download summary (.txt)</span>
          </button>

          <button
            onClick={() => setShowPlaylistPicker(!showPlaylistPicker)}
            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#1A1D2E] text-[#D8DAE5] hover:text-white flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>Add clip to playlist</span>
            </div>
            <Plus className="w-3 h-3 text-[#555869]" />
          </button>

          {/* Sub-menu: Playlists */}
          {showPlaylistPicker && (
            <div className="pl-4 py-1 space-y-0.5 border-l border-[#1E2030] my-1">
              {playlists.map((pl) => (
                <button
                  key={pl.id}
                  onClick={(e) => handleAddToPlaylist(e, pl.id, pl.name)}
                  className="w-full text-left px-2 py-1 rounded hover:bg-[#1A1D2E] text-[11px] text-[#A6A9B8] hover:text-[#00E5FF] truncate block transition-colors cursor-pointer"
                >
                  {pl.name}
                </button>
              ))}
            </div>
          )}

          <div className="h-px bg-[#1A1D2E] my-1" />

          <button
            onClick={handleDelete}
            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#1A1D2E] text-rose-400 hover:text-rose-300 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete recording</span>
          </button>
        </div>
      )}
    </div>
  );
}
