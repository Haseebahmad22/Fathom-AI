"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  FileText,
  Film,
  Bell,
  Video,
  ArrowRight,
  Clock,
  Sparkles,
  Command,
  Sliders,
  Plus,
} from "lucide-react";
import {
  mockMeetings,
  mockPlaylists,
  mockAlerts,
  getStoredPlaylists,
  getStoredAlerts,
  Meeting,
} from "@/lib/mock-data";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings?: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenSettings,
}: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Global key listener for Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search Results
  const matchedMeetings = mockMeetings.filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      m.participants.some((p) => p.name.toLowerCase().includes(q))
  );

  // Search Transcript Lines
  const matchedTranscripts: { meeting: Meeting; lineText: string; time: number }[] = [];
  if (q.length >= 2) {
    mockMeetings.forEach((m) => {
      m.transcript.forEach((t) => {
        if (t.text.toLowerCase().includes(q) && matchedTranscripts.length < 5) {
          matchedTranscripts.push({
            meeting: m,
            lineText: t.text,
            time: t.timestampSeconds,
          });
        }
      });
    });
  }

  // Playlists
  const currentPlaylists = getStoredPlaylists();
  const matchedPlaylists = currentPlaylists.filter(
    (p) => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
  );

  // Alerts
  const currentAlerts = getStoredAlerts();
  const matchedAlerts = currentAlerts.filter(
    (a) => a.keyword.toLowerCase().includes(q) || a.name?.toLowerCase().includes(q)
  );

  const navigateTo = (path: string) => {
    onClose();
    router.push(path);
  };

  const formatSeconds = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#0A0C12] border border-[#1E2030] rounded-2xl shadow-2xl overflow-hidden flex flex-col text-white animate-in zoom-in-95 duration-150"
      >
        {/* Search Input Bar */}
        <div className="p-3.5 px-4 border-b border-[#1A1D2E] flex items-center gap-3 bg-[#0E111A]">
          <Search className="w-4 h-4 text-[#00E5FF] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search meetings, transcripts, playlists, alerts, or actions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-[#555869] focus:outline-none"
          />
          <div className="flex items-center gap-1.5 shrink-0">
            <kbd className="px-1.5 py-0.5 rounded bg-[#12141D] border border-[#1E2030] text-[10px] text-[#8E92A6]">
              ESC
            </kbd>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-[#555869] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results Stream */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4 custom-scrollbar bg-[#0A0C12]">
          {/* Quick Navigation / Actions */}
          {!q && (
            <div className="space-y-1">
              <div className="text-[10px] font-semibold text-[#8E92A6] uppercase tracking-wider px-2">
                Navigation & Shortcuts
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => navigateTo("/dashboard")}
                  className="p-2.5 px-3 rounded-xl bg-[#12141D] hover:bg-[#1A1D2E] border border-[#1E2030] flex items-center justify-between text-xs text-white transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <Video className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>My Calls</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-[#555869] group-hover:text-white" />
                </button>

                <button
                  onClick={() => navigateTo("/team-calls")}
                  className="p-2.5 px-3 rounded-xl bg-[#12141D] hover:bg-[#1A1D2E] border border-[#1E2030] flex items-center justify-between text-xs text-white transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Team Calls</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-[#555869] group-hover:text-white" />
                </button>

                <button
                  onClick={() => navigateTo("/playlists")}
                  className="p-2.5 px-3 rounded-xl bg-[#12141D] hover:bg-[#1A1D2E] border border-[#1E2030] flex items-center justify-between text-xs text-white transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <Film className="w-3.5 h-3.5 text-amber-400" />
                    <span>Playlists</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-[#555869] group-hover:text-white" />
                </button>

                <button
                  onClick={() => navigateTo("/alerts")}
                  className="p-2.5 px-3 rounded-xl bg-[#12141D] hover:bg-[#1A1D2E] border border-[#1E2030] flex items-center justify-between text-xs text-white transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <Bell className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Alerts & Keywords</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-[#555869] group-hover:text-white" />
                </button>
              </div>

              {onOpenSettings && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenSettings();
                    }}
                    className="w-full p-2.5 px-3 rounded-xl bg-[#12141D] hover:bg-[#1A1D2E] border border-[#1E2030] flex items-center justify-between text-xs text-white transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <Sliders className="w-3.5 h-3.5 text-[#00E5FF]" />
                      <span>Configure Workspace Settings & Integrations</span>
                    </div>
                    <span className="text-[10px] text-[#00E5FF] font-medium">Open Settings →</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Matches: Meetings */}
          {matchedMeetings.length > 0 && (
            <div className="space-y-1">
              <div className="text-[10px] font-semibold text-[#8E92A6] uppercase tracking-wider px-2">
                Meetings ({matchedMeetings.length})
              </div>
              <div className="space-y-0.5">
                {matchedMeetings.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => navigateTo(`/meeting/${m.id}`)}
                    className="w-full p-2 px-3 rounded-lg hover:bg-[#12141D] flex items-center justify-between gap-3 text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Video className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                      <span className="text-xs font-semibold text-white group-hover:text-[#00E5FF] truncate">
                        {m.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-[#555869] shrink-0">
                      <span>{new Date(m.date).toLocaleDateString()}</span>
                      <span>·</span>
                      <span>{m.durationMinutes}m</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matches: Transcript Quotes */}
          {matchedTranscripts.length > 0 && (
            <div className="space-y-1">
              <div className="text-[10px] font-semibold text-[#8E92A6] uppercase tracking-wider px-2">
                Transcript Mentions ({matchedTranscripts.length})
              </div>
              <div className="space-y-1">
                {matchedTranscripts.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigateTo(`/meeting/${t.meeting.id}`)}
                    className="w-full p-2.5 px-3 rounded-xl bg-[#12141D] hover:bg-[#1A1D2E] border border-[#1E2030] text-left transition-colors cursor-pointer group block"
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-semibold text-white group-hover:text-[#00E5FF] truncate">
                        {t.meeting.title}
                      </span>
                      <span className="text-[10px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-1 py-0.2 rounded">
                        @{formatSeconds(t.time)}
                      </span>
                    </div>
                    <p className="text-xs text-[#8E92A6] line-clamp-1 italic">
                      &ldquo;{t.lineText}&rdquo;
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matches: Playlists */}
          {matchedPlaylists.length > 0 && (
            <div className="space-y-1">
              <div className="text-[10px] font-semibold text-[#8E92A6] uppercase tracking-wider px-2">
                Playlists ({matchedPlaylists.length})
              </div>
              <div className="space-y-0.5">
                {matchedPlaylists.map((pl) => (
                  <button
                    key={pl.id}
                    onClick={() => navigateTo(`/playlists/${pl.id}`)}
                    className="w-full p-2 px-3 rounded-lg hover:bg-[#12141D] flex items-center justify-between gap-3 text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Film className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-xs font-semibold text-white group-hover:text-[#00E5FF] truncate">
                        {pl.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#555869] shrink-0">
                      {pl.highlightRefs.length} clips
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matches: Alerts */}
          {matchedAlerts.length > 0 && (
            <div className="space-y-1">
              <div className="text-[10px] font-semibold text-[#8E92A6] uppercase tracking-wider px-2">
                Keyword Alerts ({matchedAlerts.length})
              </div>
              <div className="space-y-0.5">
                {matchedAlerts.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => navigateTo("/alerts")}
                    className="w-full p-2 px-3 rounded-lg hover:bg-[#12141D] flex items-center justify-between gap-3 text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Bell className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-xs font-semibold text-white group-hover:text-[#00E5FF] truncate">
                        #{a.keyword} · {a.name || "Alert"}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#555869] shrink-0">
                      {a.matches.length} matches
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {q &&
            matchedMeetings.length === 0 &&
            matchedTranscripts.length === 0 &&
            matchedPlaylists.length === 0 &&
            matchedAlerts.length === 0 && (
              <div className="p-8 text-center text-xs text-[#8E92A6]">
                No meetings, quotes, or playlists found matching &ldquo;{query}&rdquo;
              </div>
            )}
        </div>

        {/* Footer */}
        <div className="p-2.5 px-4 bg-[#07080D] border-t border-[#1A1D2E] flex items-center justify-between text-[11px] text-[#555869]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1 py-0.2 rounded bg-[#12141D] border border-[#1E2030] text-[9px] text-white">↑</kbd>{" "}
              <kbd className="px-1 py-0.2 rounded bg-[#12141D] border border-[#1E2030] text-[9px] text-white">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="px-1 py-0.2 rounded bg-[#12141D] border border-[#1E2030] text-[9px] text-white">↵</kbd> to select
            </span>
          </div>
          <span>Omni-Search</span>
        </div>
      </div>
    </div>
  );
}
