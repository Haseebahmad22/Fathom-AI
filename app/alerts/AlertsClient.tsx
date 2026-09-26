"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  Plus,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Trash2,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldAlert,
  X,
  Volume2,
  Users,
  Globe,
  Radio,
} from "lucide-react";
import {
  Alert,
  getStoredAlerts,
  saveStoredAlert,
  deleteStoredAlert,
  mockMeetings,
  Meeting,
  TranscriptLine,
} from "@/lib/mock-data";
import TopNav, { UserProfile } from "@/components/dashboard/TopNav";

interface AlertsClientProps {
  user: UserProfile;
}

interface ResolvedMatch {
  meeting: Meeting;
  line: TranscriptLine;
}

export default function AlertsClient({ user }: AlertsClientProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("alerts");
  const [expandedAlertIds, setExpandedAlertIds] = useState<Record<string, boolean>>({
    "alert-1": true, // Default expand first alert for instant discovery
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");
  const [newName, setNewName] = useState("");
  const [newScope, setNewScope] = useState<"anyone" | "external" | "team">("anyone");
  const [notifyInApp, setNotifyInApp] = useState(true);
  const [notifySlack, setNotifySlack] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState(false);

  useEffect(() => {
    setAlerts(getStoredAlerts());
  }, []);

  const toggleExpand = (alertId: string) => {
    setExpandedAlertIds((prev) => ({
      ...prev,
      [alertId]: !prev[alertId],
    }));
  };

  const handleDeleteAlert = (e: React.MouseEvent, alertId: string) => {
    e.stopPropagation();
    const updated = deleteStoredAlert(alertId);
    setAlerts(updated);
  };

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedKeyword = newKeyword.trim();
    if (!trimmedKeyword) return;

    // Scan all transcript lines client-side for matches
    const lowerKeyword = trimmedKeyword.toLowerCase();
    const matches: { meetingId: string; transcriptLineId: string }[] = [];

    mockMeetings.forEach((meeting) => {
      meeting.transcript.forEach((line) => {
        if (line.text.toLowerCase().includes(lowerKeyword)) {
          matches.push({
            meetingId: meeting.id,
            transcriptLineId: line.id,
          });
        }
      });
    });

    const newAlert: Alert = {
      id: `alert-${Date.now()}`,
      keyword: trimmedKeyword,
      name: newName.trim() || `Keyword: "${trimmedKeyword}"`,
      scope: newScope,
      createdAt: new Date().toISOString(),
      matches,
    };

    const updated = saveStoredAlert(newAlert);
    setAlerts(updated);

    // If in-app notification enabled and matches found, record notification
    if (notifyInApp && matches.length > 0) {
      try {
        const notifRaw = localStorage.getItem("fathom_notifications");
        const notifs = notifRaw ? JSON.parse(notifRaw) : [];
        const newNotif = {
          id: `notif-${Date.now()}`,
          type: "alert",
          title: `Keyword Alert Triggered: #${trimmedKeyword}`,
          description: `Discovered ${matches.length} mention${matches.length === 1 ? "" : "s"} across recorded transcripts.`,
          timestamp: "Just now",
          isRead: false,
          link: "/alerts",
        };
        localStorage.setItem("fathom_notifications", JSON.stringify([newNotif, ...notifs]));
      } catch {
        // Ignore fallback
      }
    }

    // Auto expand newly created alert
    setExpandedAlertIds((prev) => ({
      ...prev,
      [newAlert.id]: true,
    }));

    // Reset and close
    setNewKeyword("");
    setNewName("");
    setNewScope("anyone");
    setIsModalOpen(false);
  };

  // Helper to format timestamp
  const formatSeconds = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder.toString().padStart(2, "0")}`;
  };

  // Resolve matches for an alert
  const getResolvedMatches = (alert: Alert): ResolvedMatch[] => {
    const results: ResolvedMatch[] = [];
    alert.matches.forEach((mRef) => {
      const meeting = mockMeetings.find((m) => m.id === mRef.meetingId);
      const line = meeting?.transcript.find((t) => t.id === mRef.transcriptLineId);
      if (meeting && line) {
        results.push({ meeting, line });
      }
    });
    return results;
  };

  // Helper to get meeting thumbnail
  const getThumbnail = (meeting: Meeting) => {
    if (meeting.thumbnail) return meeting.thumbnail;
    if (meeting.id === "meeting-2") return "/images/thumb_standup.jpg";
    if (meeting.id === "meeting-3") return "/images/thumb_onboarding.jpg";
    if (meeting.id === "meeting-4") return "/images/thumb_oneone.jpg";
    if (meeting.id === "meeting-5") return "/images/thumb_planning.jpg";
    return "/images/thumb_sales.jpg";
  };

  // Scope badge renderer
  const renderScopeBadge = (scope: "anyone" | "external" | "team") => {
    switch (scope) {
      case "external":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-amber-300 bg-gradient-to-r from-amber-500/15 to-amber-500/5 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.12)]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
            <Globe className="w-3 h-3 text-amber-400" />
            <span>External Calls</span>
          </span>
        );
      case "team":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-emerald-300 bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.12)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
            <Users className="w-3 h-3 text-emerald-400" />
            <span>Team Only</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-sky-300 bg-gradient-to-r from-sky-500/15 to-sky-500/5 border border-sky-500/30 shadow-[0_0_12px_rgba(14,165,233,0.12)]">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
            <Radio className="w-3 h-3 text-sky-400" />
            <span>All Calls</span>
          </span>
        );
    }
  };

  // Filter alerts by search query
  const filteredAlerts = alerts.filter((alert) => {
    const q = searchQuery.toLowerCase();
    if (!q) return true;
    if (alert.keyword.toLowerCase().includes(q)) return true;
    if (alert.name?.toLowerCase().includes(q)) return true;
    if (alert.scope.toLowerCase().includes(q)) return true;
    return false;
  });

  return (
    <div className="h-screen w-screen bg-[#050608] text-white flex flex-col overflow-hidden font-sans select-none">
      {/* Top Navigation */}
      <TopNav
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#050608] custom-scrollbar p-6 lg:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header & Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1A1D2E]">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Alerts & Keywords
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-[#00E5FF] bg-gradient-to-r from-[#00E5FF]/15 to-[#00E5FF]/5 border border-[#00E5FF]/30 shadow-[0_0_12px_rgba(0,229,255,0.12)] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_6px_#00E5FF] animate-pulse" />
                  <Bell className="w-3.5 h-3.5" />
                  <span>{alerts.length} Active</span>
                </span>
              </div>
              <p className="text-sm text-[#8E92A6] mt-1">
                Real-time keyword alerts across customer calls, competitor mentions, and key dialogue moments
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="py-2.5 px-4 rounded-xl bg-[#00E5FF] hover:bg-[#38EDFF] text-[#050608] font-semibold text-xs flex items-center gap-2 transition-all shadow-md shadow-[#00E5FF]/20 hover:scale-102 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Alert</span>
            </button>
          </div>

          {/* Alerts List */}
          {filteredAlerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-[#0A0C12] border border-[#1A1D2E] max-w-md mx-auto my-12">
              <div className="w-12 h-12 rounded-xl bg-[#12141D] border border-[#1E2030] flex items-center justify-center text-[#555869] mb-4">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-white">
                {searchQuery ? "No matching alerts" : "No alerts configured"}
              </h3>
              <p className="text-xs text-[#8E92A6] mt-1">
                {searchQuery
                  ? "Try searching for a different keyword or name."
                  : "Track competitor names, product objections, or pricing mentions automatically."}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4 px-4 py-2 rounded-xl bg-[#00E5FF] text-[#050608] font-semibold text-xs hover:bg-[#38EDFF] transition-all cursor-pointer"
                >
                  Create First Alert
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAlerts.map((alert) => {
                const isExpanded = !!expandedAlertIds[alert.id];
                const resolvedMatches = getResolvedMatches(alert);

                return (
                  <div
                    key={alert.id}
                    className="rounded-2xl bg-[#0A0C12] border border-[#1A1D2E] hover:border-[#2A2E44] transition-all overflow-hidden"
                  >
                    {/* Collapsible Header Row */}
                    <div
                      onClick={() => toggleExpand(alert.id)}
                      className="p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-[#0E111A] transition-colors"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                            isExpanded
                              ? "bg-[#00E5FF]/10 border-[#00E5FF]/40 text-[#00E5FF]"
                              : "bg-[#12141D] border-[#1E2030] text-[#6B6F82]"
                          }`}
                        >
                          <Bell className="w-4 h-4" />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-semibold text-white truncate">
                              {alert.name || alert.keyword}
                            </h3>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold text-[#38EDFF] bg-gradient-to-r from-[#00E5FF]/15 to-[#00E5FF]/5 border border-[#00E5FF]/30 shadow-[0_0_10px_rgba(0,229,255,0.12)]">
                              <span className="text-[#00E5FF]/60 font-sans text-xs">#</span>
                              <span>{alert.keyword}</span>
                            </span>
                            {renderScopeBadge(alert.scope)}
                          </div>

                          <div className="flex items-center gap-3 mt-1 text-xs text-[#8E92A6]">
                            <span>
                              Triggered in{" "}
                              <strong className="text-white font-medium">
                                {resolvedMatches.length}{" "}
                                {resolvedMatches.length === 1 ? "line" : "lines"}
                              </strong>
                            </span>
                            <span>·</span>
                            <span>Created {new Date(alert.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Match Counter Badge + Delete + Chevron */}
                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                            resolvedMatches.length > 0
                              ? "bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 text-emerald-300 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                              : "bg-[#12141D]/80 text-[#8E92A6] border-white/5"
                          }`}
                        >
                          {resolvedMatches.length > 0 && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                          )}
                          <span>
                            {resolvedMatches.length}{" "}
                            {resolvedMatches.length === 1 ? "Match" : "Matches"}
                          </span>
                        </span>

                        <button
                          onClick={(e) => handleDeleteAlert(e, alert.id)}
                          className="p-1.5 rounded-lg text-[#555869] hover:text-rose-400 hover:bg-[#12141D] transition-colors cursor-pointer"
                          title="Delete alert"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="p-1 rounded-lg text-[#6B6F82]">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-white" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Matches View */}
                    {isExpanded && (
                      <div className="border-t border-[#1A1D2E] bg-[#07080D] p-5 space-y-3">
                        <div className="text-[11px] font-semibold text-[#8E92A6] uppercase tracking-wider px-1">
                          Transcript Mentions ({resolvedMatches.length})
                        </div>

                        {resolvedMatches.length === 0 ? (
                          <div className="p-6 rounded-xl bg-[#0A0C12] border border-[#1A1D2E] text-center text-xs text-[#8E92A6]">
                            No dialogue matches found for &ldquo;{alert.keyword}&rdquo; across current call transcripts.
                          </div>
                        ) : (
                          resolvedMatches.map(({ meeting, line }, idx) => (
                            <div
                              key={`${meeting.id}-${line.id}-${idx}`}
                              className="p-4 rounded-xl bg-[#0A0C12] border border-[#1A1D2E] hover:border-[#2C3048] transition-all space-y-2.5"
                            >
                              {/* Source Meeting and Speaker Info */}
                              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                                <div className="flex items-center gap-2.5">
                                  <Link
                                    href={`/meeting/${meeting.id}`}
                                    className="flex items-center gap-2 group/meet hover:text-white"
                                  >
                                    <img
                                      src={getThumbnail(meeting)}
                                      alt=""
                                      className="w-5 h-4 rounded object-cover border border-[#1E2030]"
                                    />
                                    <span className="font-semibold text-white group-hover/meet:text-[#00E5FF] transition-colors truncate max-w-[200px] sm:max-w-sm">
                                      {meeting.title}
                                    </span>
                                    <ExternalLink className="w-3 h-3 text-[#555869] group-hover/meet:text-[#00E5FF]" />
                                  </Link>

                                  <span className="text-[#555869]">·</span>

                                  <span className="text-[#8E92A6]">
                                    {new Date(meeting.date).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 text-[11px]">
                                  <span className="text-white font-medium">
                                    {line.speakerName}
                                  </span>
                                  <span className="inline-flex items-center gap-1 font-mono text-[#00E5FF] bg-gradient-to-r from-[#00E5FF]/15 to-[#00E5FF]/5 border border-[#00E5FF]/25 px-2 py-0.5 rounded-full text-[10px] shadow-[0_0_8px_rgba(0,229,255,0.1)]">
                                    <Clock className="w-2.5 h-2.5 opacity-80" />
                                    <span>{formatSeconds(line.timestampSeconds)}</span>
                                  </span>
                                </div>
                              </div>

                              {/* Highlighted Transcript Quote */}
                              <div className="text-xs text-[#D8DAE5] leading-relaxed pl-2 border-l-2 border-[#00E5FF]/50">
                                <HighlightedText
                                  text={line.text}
                                  keyword={alert.keyword}
                                />
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Add Alert Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0A0C12] border border-[#1E2030] rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#1A1D2E]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00E5FF]/20 to-[#7C3AED]/20 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                  <Bell className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  Add Keyword Alert
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#6B6F82] hover:text-white p-1 rounded-lg hover:bg-[#12141D] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAlert} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#8E92A6] mb-1.5 uppercase tracking-wider">
                  Keyword or Phrase *
                </label>
                <input
                  type="text"
                  placeholder="e.g. pricing, competitor, discount, bug"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  autoFocus
                  required
                  className="w-full px-3.5 py-2.5 bg-[#12141D] border border-[#1E2030] focus:border-[#00E5FF]/50 rounded-xl text-sm text-white placeholder-[#555869] focus:outline-none transition-all"
                />
                <p className="text-[11px] text-[#555869] mt-1">
                  We will scan all existing and future meeting transcripts for this term.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8E92A6] mb-1.5 uppercase tracking-wider">
                  Alert Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pricing Objections, Competitor Intel"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#12141D] border border-[#1E2030] focus:border-[#00E5FF]/50 rounded-xl text-sm text-white placeholder-[#555869] focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8E92A6] mb-2 uppercase tracking-wider">
                  Tracking Scope
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewScope("anyone")}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      newScope === "anyone"
                        ? "bg-[#00E5FF]/10 border-[#00E5FF]/50 text-white shadow-sm shadow-[#00E5FF]/10"
                        : "bg-[#12141D] border-[#1E2030] text-[#8E92A6] hover:bg-[#181A26]"
                    }`}
                  >
                    <Radio className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>All Calls</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewScope("external")}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      newScope === "external"
                        ? "bg-[#00E5FF]/10 border-[#00E5FF]/50 text-white shadow-sm shadow-[#00E5FF]/10"
                        : "bg-[#12141D] border-[#1E2030] text-[#8E92A6] hover:bg-[#181A26]"
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5 text-amber-400" />
                    <span>External</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewScope("team")}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      newScope === "team"
                        ? "bg-[#00E5FF]/10 border-[#00E5FF]/50 text-white shadow-sm shadow-[#00E5FF]/10"
                        : "bg-[#12141D] border-[#1E2030] text-[#8E92A6] hover:bg-[#181A26]"
                    }`}
                  >
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Team Only</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8E92A6] mb-1.5 uppercase tracking-wider">
                  Notification Destinations
                </label>
                <div className="space-y-1.5 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-[#12141D] border border-[#1E2030] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifyInApp}
                      onChange={(e) => setNotifyInApp(e.target.checked)}
                      className="accent-[#00E5FF] w-3.5 h-3.5"
                    />
                    <span className="text-white">In-App Notification Bell & Tray</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-lg bg-[#12141D] border border-[#1E2030] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifySlack}
                      onChange={(e) => setNotifySlack(e.target.checked)}
                      className="accent-[#00E5FF] w-3.5 h-3.5"
                    />
                    <span className="text-[#8E92A6]">Slack Channel (#sales-alerts)</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-lg bg-[#12141D] border border-[#1E2030] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.checked)}
                      className="accent-[#00E5FF] w-3.5 h-3.5"
                    />
                    <span className="text-[#8E92A6]">Daily 5 PM Email Digest</span>
                  </label>
                </div>
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
                  disabled={!newKeyword.trim()}
                  className="px-4 py-2 rounded-xl bg-[#00E5FF] hover:bg-[#38EDFF] disabled:opacity-30 text-[#050608] font-semibold text-xs transition-all shadow-md shadow-[#00E5FF]/20 cursor-pointer"
                >
                  Save & Scan Calls
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Subcomponent to bold and highlight matched keywords
function HighlightedText({ text, keyword }: { text: string; keyword: string }) {
  if (!keyword.trim()) return <span>{text}</span>;

  try {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === keyword.toLowerCase() ? (
            <mark
              key={i}
              className="bg-[#00E5FF]/25 text-[#00E5FF] font-bold px-1 py-0.5 rounded border border-[#00E5FF]/40"
            >
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  } catch {
    return <span>{text}</span>;
  }
}
