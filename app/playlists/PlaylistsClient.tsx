"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ListMusic,
  Plus,
  Play,
  Film,
  Calendar,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";
import {
  Playlist,
  getStoredPlaylists,
  saveStoredPlaylist,
  mockMeetings,
} from "@/lib/mock-data";
import TopNav, { UserProfile } from "@/components/dashboard/TopNav";

interface PlaylistsClientProps {
  user: UserProfile;
}

export default function PlaylistsClient({ user }: PlaylistsClientProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("playlists");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistDesc, setNewPlaylistDesc] = useState("");

  useEffect(() => {
    setPlaylists(getStoredPlaylists());
  }, []);

  const handleCreatePlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;

    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      name: newPlaylistName.trim(),
      description: newPlaylistDesc.trim() || undefined,
      createdAt: new Date().toISOString(),
      highlightRefs: [],
    };

    const updated = saveStoredPlaylist(newPlaylist);
    setPlaylists(updated);
    setNewPlaylistName("");
    setNewPlaylistDesc("");
    setIsModalOpen(false);
  };

  const filteredPlaylists = playlists.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper to resolve meeting thumbnail for preview
  const getThumbnailForMeeting = (meetingId: string) => {
    const meeting = mockMeetings.find((m) => m.id === meetingId);
    if (meeting?.thumbnail) return meeting.thumbnail;
    if (meetingId === "meeting-2") return "/images/thumb_standup.jpg";
    if (meetingId === "meeting-3") return "/images/thumb_onboarding.jpg";
    if (meetingId === "meeting-4") return "/images/thumb_oneone.jpg";
    if (meetingId === "meeting-5") return "/images/thumb_planning.jpg";
    return "/images/thumb_sales.jpg";
  };

  return (
    <div className="h-screen w-screen bg-[#050608] text-white flex flex-col overflow-hidden font-sans select-none">
      {/* Top Navigation Bar */}
      <TopNav
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#050608] custom-scrollbar p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1A1D2E]">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Playlists
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-[#38EDFF] bg-gradient-to-r from-[#00E5FF]/15 to-[#00E5FF]/5 border border-[#00E5FF]/30 shadow-[0_0_12px_rgba(0,229,255,0.12)] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_6px_#00E5FF] animate-pulse" />
                  <Film className="w-3.5 h-3.5" />
                  <span>{playlists.length} Playlists</span>
                </span>
              </div>
              <p className="text-sm text-[#8E92A6] mt-1">
                Curated collections of meeting video clips and critical conversational moments
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="py-2.5 px-4 rounded-xl bg-[#00E5FF] hover:bg-[#38EDFF] text-[#050608] font-semibold text-xs flex items-center gap-2 transition-all shadow-md shadow-[#00E5FF]/20 hover:scale-102 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>New Playlist</span>
            </button>
          </div>

          {/* Playlists Grid */}
          {filteredPlaylists.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-[#0A0C12] border border-[#1A1D2E] max-w-md mx-auto my-12">
              <div className="w-12 h-12 rounded-xl bg-[#12141D] border border-[#1E2030] flex items-center justify-center text-[#555869] mb-4">
                <ListMusic className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-white">
                No playlists found
              </h3>
              <p className="text-xs text-[#8E92A6] mt-1">
                {searchQuery
                  ? "No playlists match your search terms."
                  : "Create your first playlist to organize key customer moments and team highlights."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPlaylists.map((pl) => {
                const previewThumbnails = pl.highlightRefs
                  .slice(0, 3)
                  .map((ref) => getThumbnailForMeeting(ref.meetingId));

                const formattedDate = new Date(pl.createdAt).toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric", year: "numeric" }
                );

                return (
                  <Link
                    key={pl.id}
                    href={`/playlists/${pl.id}`}
                    className="group flex flex-col p-4 rounded-xl bg-[#0A0C12] border border-[#1A1D2E] hover:border-[#00E5FF]/40 transition-all duration-200 hover:shadow-lg hover:shadow-[#00E5FF]/5 cursor-pointer relative"
                  >
                    {/* Thumbnail Stack / Preview Mosaic */}
                    <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-[#12141D] border border-[#1E2030] mb-3.5">
                      {previewThumbnails.length > 0 ? (
                        <div className="w-full h-full flex">
                          {previewThumbnails.map((thumb, idx) => (
                            <div
                              key={idx}
                              className="relative flex-1 h-full border-r border-[#1E2030] last:border-r-0 overflow-hidden"
                            >
                              <img
                                src={thumb}
                                alt=""
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-[#555869] gap-1.5">
                          <Film className="w-6 h-6 opacity-40" />
                          <span className="text-[11px]">Empty playlist</span>
                        </div>
                      )}

                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                      {/* Clip Count Badge */}
                      <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-semibold text-white border border-white/15 flex items-center gap-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                        <Play className="w-2.5 h-2.5 fill-current text-[#00E5FF]" />
                        <span>
                          {pl.highlightRefs.length}{" "}
                          {pl.highlightRefs.length === 1 ? "clip" : "clips"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-sm font-semibold text-white group-hover:text-[#00E5FF] transition-colors truncate">
                            {pl.name}
                          </h3>
                          <ChevronRight className="w-4 h-4 text-[#555869] group-hover:text-white transition-colors shrink-0" />
                        </div>

                        {pl.description && (
                          <p className="text-xs text-[#8E92A6] mt-1.5 line-clamp-2 leading-relaxed">
                            {pl.description}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#1A1D2E] flex items-center justify-between text-[11px] text-[#555869]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formattedDate}
                        </span>
                        <span className="text-[#00E5FF] text-[10px] font-semibold group-hover:underline">
                          View clips →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* New Playlist Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0A0C12] border border-[#1E2030] rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#1A1D2E]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00E5FF]/20 to-[#7C3AED]/20 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                  <Film className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  Create New Playlist
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#6B6F82] hover:text-white p-1 rounded-lg hover:bg-[#12141D] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePlaylist} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#8E92A6] mb-1.5 uppercase tracking-wider">
                  Playlist Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sales Objections, Product Feedback"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  autoFocus
                  required
                  className="w-full px-3.5 py-2.5 bg-[#12141D] border border-[#1E2030] focus:border-[#00E5FF]/50 rounded-xl text-sm text-white placeholder-[#555869] focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8E92A6] mb-1.5 uppercase tracking-wider">
                  Description (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="What is this collection of clips about?"
                  value={newPlaylistDesc}
                  onChange={(e) => setNewPlaylistDesc(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#12141D] border border-[#1E2030] focus:border-[#00E5FF]/50 rounded-xl text-xs text-white placeholder-[#555869] focus:outline-none transition-all resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#8E92A6] hover:text-white hover:bg-[#12141D] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newPlaylistName.trim()}
                  className="px-4 py-2 rounded-xl bg-[#00E5FF] hover:bg-[#38EDFF] disabled:opacity-30 text-[#050608] font-semibold text-xs transition-all shadow-md shadow-[#00E5FF]/20 cursor-pointer"
                >
                  Create Playlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
