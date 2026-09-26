"use client";

import React, { useState, useEffect } from "react";
import {
  Lock,
  Bookmark,
  Plus,
  ListPlus,
  Check,
  Film,
  X,
} from "lucide-react";
import {
  Highlight,
  Playlist,
  getStoredPlaylists,
  addHighlightToStoredPlaylist,
  saveStoredPlaylist,
} from "@/lib/mock-data";

interface HighlightsListProps {
  highlights: Highlight[];
  onSeek: (seconds: number) => void;
  currentSeconds: number;
}

export default function HighlightsList({
  highlights,
  onSeek,
  currentSeconds,
}: HighlightsListProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState<{ id: string; text: string } | null>(null);

  useEffect(() => {
    setPlaylists(getStoredPlaylists());
  }, [openDropdownId]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder.toString().padStart(2, "0")}`;
  };

  const handleAddToPlaylist = (
    e: React.MouseEvent,
    highlight: Highlight,
    playlistId: string,
    playlistName: string
  ) => {
    e.stopPropagation();
    addHighlightToStoredPlaylist(playlistId, highlight.meetingId, highlight.id);
    setOpenDropdownId(null);
    setFeedbackMsg({ id: highlight.id, text: `Added to ${playlistName}` });
    setTimeout(() => setFeedbackMsg(null), 2500);
  };

  const handleCreateAndAdd = (
    e: React.FormEvent,
    highlight: Highlight
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!newPlaylistName.trim()) return;

    const newPl: Playlist = {
      id: `playlist-${Date.now()}`,
      name: newPlaylistName.trim(),
      createdAt: new Date().toISOString(),
      highlightRefs: [{ meetingId: highlight.meetingId, highlightId: highlight.id }],
    };

    saveStoredPlaylist(newPl);
    setPlaylists((prev) => [newPl, ...prev]);
    setNewPlaylistName("");
    setIsCreatingNew(false);
    setOpenDropdownId(null);
    setFeedbackMsg({ id: highlight.id, text: `Added to new playlist "${newPl.name}"` });
    setTimeout(() => setFeedbackMsg(null), 2500);
  };

  return (
    <div className="space-y-3 pt-3 border-t border-[#1A1D2E]">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-[11px] font-semibold text-[#8E92A6] uppercase tracking-wider">
          Highlights
        </h4>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-amber-300/90 bg-gradient-to-r from-amber-500/15 to-amber-500/5 border border-amber-500/25 shadow-[0_0_8px_rgba(245,158,11,0.1)]">
          <Lock className="w-2.5 h-2.5 text-amber-400" />
          <span>Internal only</span>
        </span>
      </div>

      {/* List of Annotations */}
      <div className="space-y-1.5">
        {highlights.map((h) => {
          const isActive = Math.abs(currentSeconds - h.timestampSeconds) < 15;
          const isDropdownOpen = openDropdownId === h.id;

          return (
            <div
              key={h.id}
              onClick={() => onSeek(h.timestampSeconds)}
              className={`p-2.5 rounded-lg border cursor-pointer transition-all relative ${
                isActive
                  ? "bg-[#12141D] border-[#00E5FF]/30 shadow-sm shadow-[#00E5FF]/5"
                  : "bg-[#0A0C12] border-[#1A1D2E] hover:bg-[#12141D] hover:border-[#353950]"
              }`}
            >
              <div className="flex items-start gap-2">
                <Bookmark className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isActive ? "text-[#00E5FF]" : "text-[#555869]"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[11px] font-semibold text-white truncate">
                      {h.speakerName}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium text-[#8E92A6] bg-white/[0.04] border border-white/5">
                        {formatTime(h.timestampSeconds)}
                      </span>

                      {/* Add to Playlist Trigger */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId(isDropdownOpen ? null : h.id);
                          setIsCreatingNew(false);
                        }}
                        className="px-2 py-0.5 rounded-full bg-[#12141D] hover:bg-[#1A1D2E] border border-[#1E2030] hover:border-[#00E5FF]/40 text-[10px] font-medium text-[#8E92A6] hover:text-[#00E5FF] transition-all flex items-center gap-1 cursor-pointer"
                        title="Add clip to playlist"
                      >
                        <ListPlus className="w-3 h-3 text-[#00E5FF]" />
                        <span className="hidden sm:inline">Add to playlist</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs leading-snug text-[#C5C8D8] line-clamp-2">
                    &ldquo;{h.quoteText}&rdquo;
                  </p>

                  {/* Feedback Toast */}
                  {feedbackMsg?.id === h.id && (
                    <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-300 bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 border border-emerald-500/30 rounded-full px-2.5 py-0.5 shadow-[0_0_8px_rgba(16,185,129,0.12)]">
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>{feedbackMsg.text}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Add to Playlist Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-2 top-8 z-30 w-56 p-2 bg-[#0E1118] border border-[#25283D] rounded-xl shadow-2xl text-xs space-y-1.5 animate-in fade-in zoom-in-95 duration-100"
                >
                  <div className="flex items-center justify-between px-1 pb-1 border-b border-[#1A1D2E] text-[10px] font-semibold text-[#8E92A6] uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Film className="w-3 h-3 text-[#00E5FF]" /> Add to Playlist
                    </span>
                    <button
                      onClick={() => setOpenDropdownId(null)}
                      className="text-[#6B6F82] hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Existing Playlists */}
                  <div className="max-h-36 overflow-y-auto space-y-0.5 custom-scrollbar pr-0.5">
                    {playlists.map((pl) => (
                      <button
                        key={pl.id}
                        onClick={(e) => handleAddToPlaylist(e, h, pl.id, pl.name)}
                        className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-[#1A1D2E] text-[#D8DAE5] hover:text-white text-[11px] truncate flex items-center justify-between group transition-colors cursor-pointer"
                      >
                        <span className="truncate">{pl.name}</span>
                        <Plus className="w-3 h-3 text-[#555869] group-hover:text-[#00E5FF] shrink-0" />
                      </button>
                    ))}
                  </div>

                  {/* Create New Playlist option */}
                  <div className="pt-1 border-t border-[#1A1D2E]">
                    {isCreatingNew ? (
                      <form
                        onSubmit={(e) => handleCreateAndAdd(e, h)}
                        className="space-y-1.5 pt-1"
                      >
                        <input
                          type="text"
                          placeholder="New playlist name..."
                          value={newPlaylistName}
                          onChange={(e) => setNewPlaylistName(e.target.value)}
                          autoFocus
                          className="w-full px-2 py-1 bg-[#12141D] border border-[#00E5FF]/40 rounded text-xs text-white placeholder-[#555869] focus:outline-none"
                        />
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setIsCreatingNew(false)}
                            className="px-1.5 py-0.5 text-[10px] text-[#8E92A6] hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={!newPlaylistName.trim()}
                            className="px-2 py-0.5 rounded bg-[#00E5FF] text-[#050608] font-semibold text-[10px] hover:bg-[#38EDFF] disabled:opacity-30 cursor-pointer"
                          >
                            Create & Add
                          </button>
                        </div>
                      </form>
                    ) : (
                      <button
                        onClick={() => setIsCreatingNew(true)}
                        className="w-full py-1 px-2 rounded-lg text-left text-[11px] font-medium text-[#00E5FF] hover:bg-[#12141D] flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>+ New Playlist</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
