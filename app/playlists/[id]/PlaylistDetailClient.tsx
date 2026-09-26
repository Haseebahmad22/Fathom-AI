"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Bookmark,
  Calendar,
  Clock,
  ExternalLink,
  Trash2,
  Check,
  Film,
  Sparkles,
  Volume2,
  Edit2,
  Share2,
  ChevronUp,
  ChevronDown,
  Save,
  Link as LinkIcon,
} from "lucide-react";
import {
  Playlist,
  getStoredPlaylists,
  saveStoredPlaylist,
  mockMeetings,
  Highlight,
  Meeting,
} from "@/lib/mock-data";
import TopNav, { UserProfile } from "@/components/dashboard/TopNav";

interface PlaylistDetailClientProps {
  playlistId: string;
  user: UserProfile;
}

interface ResolvedClip {
  meeting: Meeting;
  highlight: Highlight;
}

export default function PlaylistDetailClient({
  playlistId,
  user,
}: PlaylistDetailClientProps) {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [resolvedClips, setResolvedClips] = useState<ResolvedClip[]>([]);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [activeClipIndex, setActiveClipIndex] = useState<number | null>(null);
  const [playProgress, setPlayProgress] = useState(0);

  // Edit & Share state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const allPlaylists = getStoredPlaylists();
    const found = allPlaylists.find((p) => p.id === playlistId);
    if (found) {
      setPlaylist(found);
      setEditName(found.name);
      setEditDesc(found.description || "");
      const clips: ResolvedClip[] = [];
      for (const ref of found.highlightRefs) {
        const meeting = mockMeetings.find((m) => m.id === ref.meetingId);
        const highlight = meeting?.highlights.find((h) => h.id === ref.highlightId);
        if (meeting && highlight) {
          clips.push({ meeting, highlight });
        }
      }
      setResolvedClips(clips);
    }
  }, [playlistId]);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playlist || !editName.trim()) return;
    const updated: Playlist = {
      ...playlist,
      name: editName.trim(),
      description: editDesc.trim() || undefined,
    };
    saveStoredPlaylist(updated);
    setPlaylist(updated);
    setIsEditing(false);
  };

  const handleSharePlaylist = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleMoveClip = (index: number, direction: "up" | "down") => {
    if (!playlist) return;
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= playlist.highlightRefs.length) return;

    const newRefs = [...playlist.highlightRefs];
    const tempRef = newRefs[index];
    newRefs[index] = newRefs[targetIdx];
    newRefs[targetIdx] = tempRef;

    const newClips = [...resolvedClips];
    const tempClip = newClips[index];
    newClips[index] = newClips[targetIdx];
    newClips[targetIdx] = tempClip;

    const updated = { ...playlist, highlightRefs: newRefs };
    saveStoredPlaylist(updated);
    setPlaylist(updated);
    setResolvedClips(newClips);

    if (activeClipIndex === index) {
      setActiveClipIndex(targetIdx);
    } else if (activeClipIndex === targetIdx) {
      setActiveClipIndex(index);
    }
  };

  // Sequential Play All simulation timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAll && activeClipIndex !== null) {
      interval = setInterval(() => {
        setPlayProgress((prev) => {
          if (prev >= 100) {
            // Advance to next clip or loop
            if (activeClipIndex + 1 < resolvedClips.length) {
              setActiveClipIndex((curr) => (curr !== null ? curr + 1 : 0));
              return 0;
            } else {
              setIsPlayingAll(false);
              return 0;
            }
          }
          return prev + 5;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlayingAll, activeClipIndex, resolvedClips.length]);

  const handleStartPlayAll = () => {
    if (resolvedClips.length === 0) return;
    if (isPlayingAll) {
      setIsPlayingAll(false);
    } else {
      setIsPlayingAll(true);
      if (activeClipIndex === null) {
        setActiveClipIndex(0);
        setPlayProgress(0);
      }
    }
  };

  const handleNextClip = () => {
    if (activeClipIndex !== null && activeClipIndex + 1 < resolvedClips.length) {
      setActiveClipIndex(activeClipIndex + 1);
      setPlayProgress(0);
    }
  };

  const handlePrevClip = () => {
    if (activeClipIndex !== null && activeClipIndex > 0) {
      setActiveClipIndex(activeClipIndex - 1);
      setPlayProgress(0);
    }
  };

  const handleRemoveClip = (meetingId: string, highlightId: string) => {
    if (!playlist) return;
    const updatedRefs = playlist.highlightRefs.filter(
      (ref) => !(ref.meetingId === meetingId && ref.highlightId === highlightId)
    );
    const updatedPlaylist = { ...playlist, highlightRefs: updatedRefs };

    const allPlaylists = getStoredPlaylists();
    const updatedAll = allPlaylists.map((p) =>
      p.id === playlist.id ? updatedPlaylist : p
    );
    localStorage.setItem("fathom_playlists", JSON.stringify(updatedAll));
    setPlaylist(updatedPlaylist);
    setResolvedClips((prev) =>
      prev.filter(
        (c) => !(c.meeting.id === meetingId && c.highlight.id === highlightId)
      )
    );
    if (activeClipIndex !== null && activeClipIndex >= updatedRefs.length) {
      setActiveClipIndex(null);
      setIsPlayingAll(false);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder.toString().padStart(2, "0")}`;
  };

  const getThumbnail = (meeting: Meeting) => {
    if (meeting.thumbnail) return meeting.thumbnail;
    if (meeting.id === "meeting-2") return "/images/thumb_standup.jpg";
    if (meeting.id === "meeting-3") return "/images/thumb_onboarding.jpg";
    if (meeting.id === "meeting-4") return "/images/thumb_oneone.jpg";
    if (meeting.id === "meeting-5") return "/images/thumb_planning.jpg";
    return "/images/thumb_sales.jpg";
  };

  if (!playlist) {
    return (
      <div className="h-screen w-screen bg-[#050608] text-white flex flex-col items-center justify-center p-6 select-none font-sans">
        <Film className="w-10 h-10 text-[#555869] mb-3 animate-pulse" />
        <h2 className="text-lg font-semibold text-white">Playlist not found</h2>
        <Link
          href="/playlists"
          className="mt-4 px-4 py-2 rounded-xl bg-[#12141D] hover:bg-[#1C1E2A] border border-[#1E2030] text-xs font-medium text-[#00E5FF] transition-all"
        >
          ← Back to Playlists
        </Link>
      </div>
    );
  }

  const activeClip =
    activeClipIndex !== null ? resolvedClips[activeClipIndex] : null;

  return (
    <div className="h-screen w-screen bg-[#050608] text-white flex flex-col overflow-hidden font-sans select-none">
      {/* Top Navigation */}
      <TopNav
        user={user}
        searchQuery=""
        onSearchChange={() => {}}
        activeTab="playlists"
        onTabChange={() => {}}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#050608] custom-scrollbar p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center gap-2 text-xs text-[#8E92A6]">
            <Link
              href="/playlists"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Playlists</span>
            </Link>
            <span>/</span>
            <span className="text-white font-medium truncate">
              {playlist.name}
            </span>
          </div>

          {/* Header Card */}
          <div className="p-6 rounded-2xl bg-[#0A0C12] border border-[#1A1D2E] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <form onSubmit={handleSaveEdit} className="space-y-2 max-w-xl">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Playlist name"
                      autoFocus
                      required
                      className="w-full px-3 py-1.5 bg-[#12141D] border border-[#00E5FF]/40 rounded-xl text-base font-bold text-white focus:outline-none"
                    />
                    <textarea
                      rows={2}
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      placeholder="Playlist description"
                      className="w-full px-3 py-1.5 bg-[#12141D] border border-[#1E2030] rounded-xl text-xs text-white placeholder-[#555869] focus:outline-none resize-none"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-3 py-1 text-xs text-[#8E92A6] hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-3.5 py-1 rounded-lg bg-[#00E5FF] text-[#050608] font-semibold text-xs flex items-center gap-1 shadow-sm shadow-[#00E5FF]/20 cursor-pointer"
                      >
                        <Save className="w-3 h-3" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h1 className="text-2xl font-bold text-white tracking-tight truncate">
                        {playlist.name}
                      </h1>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-1 rounded-md text-[#555869] hover:text-white hover:bg-[#12141D] transition-colors cursor-pointer"
                        title="Edit title & description"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/20 shrink-0">
                        {resolvedClips.length}{" "}
                        {resolvedClips.length === 1 ? "Clip" : "Clips"}
                      </span>
                    </div>

                    {playlist.description && (
                      <p className="text-sm text-[#8E92A6] mt-1.5 leading-relaxed max-w-2xl">
                        {playlist.description}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Actions: Share & Play All Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSharePlaylist}
                  className="py-2.5 px-3.5 rounded-xl bg-[#12141D] hover:bg-[#1C1E2A] border border-[#1E2030] hover:border-[#353950] text-xs font-semibold text-white flex items-center gap-2 transition-all cursor-pointer"
                  title="Share playlist reel"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Link copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-[#00E5FF]" />
                      <span>Share Reel</span>
                    </>
                  )}
                </button>

                {resolvedClips.length > 0 && (
                  <button
                    onClick={handleStartPlayAll}
                    className="py-2.5 px-4 rounded-xl bg-[#00E5FF] hover:bg-[#38EDFF] text-[#050608] font-semibold text-xs flex items-center gap-2 transition-all shadow-md shadow-[#00E5FF]/20 hover:scale-102 cursor-pointer shrink-0"
                  >
                    {isPlayingAll ? (
                      <>
                        <Pause className="w-4 h-4 fill-current" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>Play All</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Sequential Playback Player Card (When Active) */}
            {activeClipIndex !== null && activeClip && (
              <div className="p-4 rounded-xl bg-[#12141D] border border-[#00E5FF]/40 shadow-lg shadow-[#00E5FF]/5 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#00E5FF] font-semibold">
                    <Volume2 className="w-4 h-4 animate-pulse" />
                    <span>
                      Now Playing Clip {activeClipIndex + 1} of{" "}
                      {resolvedClips.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrevClip}
                      disabled={activeClipIndex === 0}
                      className="p-1 rounded text-[#8E92A6] hover:text-white disabled:opacity-20 cursor-pointer"
                      title="Previous clip"
                    >
                      <SkipBack className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setIsPlayingAll(!isPlayingAll)}
                      className="p-1.5 rounded-lg bg-[#00E5FF] text-[#050608] hover:bg-[#38EDFF] cursor-pointer"
                      title={isPlayingAll ? "Pause" : "Play"}
                    >
                      {isPlayingAll ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current" />
                      )}
                    </button>
                    <button
                      onClick={handleNextClip}
                      disabled={activeClipIndex === resolvedClips.length - 1}
                      className="p-1 rounded text-[#8E92A6] hover:text-white disabled:opacity-20 cursor-pointer"
                      title="Next clip"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1 bg-[#1E2030] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00E5FF] transition-all duration-300"
                    style={{ width: `${playProgress}%` }}
                  />
                </div>

                <div className="flex items-start justify-between gap-4 pt-1">
                  <div>
                    <p className="text-sm font-medium text-white italic">
                      &ldquo;{activeClip.highlight.quoteText}&rdquo;
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-[#8E92A6]">
                      <span className="font-semibold text-white">
                        {activeClip.highlight.speakerName}
                      </span>
                      <span>·</span>
                      <span>From {activeClip.meeting.title}</span>
                      <span>·</span>
                      <span className="font-mono text-[#00E5FF]">
                        @{formatTime(activeClip.highlight.timestampSeconds)}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/meeting/${activeClip.meeting.id}`}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-[#0A0C12] hover:bg-[#1A1D2E] border border-[#1E2030] text-xs font-medium text-white flex items-center gap-1.5 transition-colors"
                  >
                    <span>Open call</span>
                    <ExternalLink className="w-3 h-3 text-[#00E5FF]" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Highlights List In Order */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-[#8E92A6] uppercase tracking-wider px-1">
              Playlist Highlights ({resolvedClips.length})
            </div>

            {resolvedClips.length === 0 ? (
              <div className="p-8 rounded-xl bg-[#0A0C12] border border-[#1A1D2E] text-center space-y-2">
                <Bookmark className="w-8 h-8 text-[#555869] mx-auto opacity-50" />
                <h4 className="text-sm font-semibold text-white">
                  No highlights in this playlist yet
                </h4>
                <p className="text-xs text-[#8E92A6] max-w-sm mx-auto">
                  Go to any meeting detail page, find key quotes in the Highlights section, and click &ldquo;Add to Playlist&rdquo; to add them here.
                </p>
                <div className="pt-2">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#12141D] hover:bg-[#1C1E2A] border border-[#1E2030] text-xs font-medium text-[#00E5FF] transition-all"
                  >
                    Browse meetings →
                  </Link>
                </div>
              </div>
            ) : (
              resolvedClips.map((clip, idx) => {
                const isActive = activeClipIndex === idx;

                return (
                  <div
                    key={`${clip.meeting.id}-${clip.highlight.id}`}
                    className={`p-4 rounded-xl border transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isActive
                        ? "bg-[#12141D] border-[#00E5FF]/50 shadow-md shadow-[#00E5FF]/10 ring-1 ring-[#00E5FF]/30"
                        : "bg-[#0A0C12] border-[#1A1D2E] hover:border-[#353950]"
                    }`}
                  >
                    {/* Left: Index badge + Quote content */}
                    <div className="flex items-start gap-3.5 flex-1 min-w-0">
                      <div
                        onClick={() => {
                          setActiveClipIndex(idx);
                          setIsPlayingAll(true);
                          setPlayProgress(0);
                        }}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 cursor-pointer transition-all ${
                          isActive
                            ? "bg-[#00E5FF] text-[#050608]"
                            : "bg-[#12141D] text-[#8E92A6] hover:bg-[#00E5FF]/20 hover:text-[#00E5FF]"
                        }`}
                        title="Click to play this clip"
                      >
                        {isActive && isPlayingAll ? (
                          <Pause className="w-3.5 h-3.5 fill-current" />
                        ) : (
                          <span>#{idx + 1}</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <p className="text-xs font-medium text-white leading-relaxed">
                          &ldquo;{clip.highlight.quoteText}&rdquo;
                        </p>

                        <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-[#8E92A6]">
                          <span className="font-semibold text-white">
                            {clip.highlight.speakerName}
                          </span>
                          <span>·</span>
                          <span className="font-mono text-[#00E5FF]">
                            @{formatTime(clip.highlight.timestampSeconds)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Source Meeting Link & Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      {/* Reorder Buttons */}
                      <div className="flex items-center bg-[#12141D] border border-[#1E2030] rounded-lg p-0.5">
                        <button
                          onClick={() => handleMoveClip(idx, "up")}
                          disabled={idx === 0}
                          className="p-1 text-[#6B6F82] hover:text-white disabled:opacity-20 transition-colors cursor-pointer"
                          title="Move up"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveClip(idx, "down")}
                          disabled={idx === resolvedClips.length - 1}
                          className="p-1 text-[#6B6F82] hover:text-white disabled:opacity-20 transition-colors cursor-pointer"
                          title="Move down"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <Link
                        href={`/meeting/${clip.meeting.id}`}
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#12141D] hover:bg-[#1C1E2A] border border-[#1E2030] hover:border-[#353950] text-xs text-[#C5C8D8] hover:text-white transition-all group/meet"
                      >
                        <img
                          src={getThumbnail(clip.meeting)}
                          alt=""
                          className="w-5 h-4 rounded object-cover border border-[#1E2030]"
                        />
                        <span className="truncate max-w-[130px] text-[11px]">
                          {clip.meeting.title}
                        </span>
                        <ExternalLink className="w-3 h-3 text-[#555869] group-hover/meet:text-[#00E5FF]" />
                      </Link>

                      <button
                        onClick={() =>
                          handleRemoveClip(clip.meeting.id, clip.highlight.id)
                        }
                        className="p-2 rounded-lg text-[#555869] hover:text-rose-400 hover:bg-[#12141D] transition-colors cursor-pointer"
                        title="Remove clip from playlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
