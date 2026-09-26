"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  X,
  Sliders,
  Share2,
  BookOpen,
  Users,
  Check,
  Plus,
  Trash2,
  Sparkles,
  Shield,
  Radio,
  FileText,
  Mail,
  ExternalLink,
} from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Collaborator";
  avatarColor: string;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<"general" | "integrations" | "vocabulary" | "team">("general");

  // General settings state
  const [defaultTemplate, setDefaultTemplate] = useState("enhanced");
  const [botFreeLoopback, setBotFreeLoopback] = useState(true);
  const [autoJoinMeetings, setAutoJoinMeetings] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);

  // Integrations state
  const [integrations, setIntegrations] = useState<{ [key: string]: boolean }>({
    hubspot: true,
    salesforce: false,
    slack: true,
    notion: true,
    google_calendar: true,
  });

  // Custom vocabulary state
  const [vocabulary, setVocabulary] = useState<string[]>([
    "Fanthom",
    "SOC 2 Type II",
    "trigram",
    "MEDDPICC",
    "SPICED",
    "Sandler",
    "HubSpot",
    "LLM",
  ]);
  const [newWord, setNewWord] = useState("");

  // Team state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "u-1",
      name: "Haseeb Ahmad",
      email: "haseeb@fanthom.ai",
      role: "Owner",
      avatarColor: "#00E5FF",
    },
    {
      id: "u-2",
      name: "David Chen",
      email: "david@fanthom.ai",
      role: "Admin",
      avatarColor: "#7C3AED",
    },
    {
      id: "u-3",
      name: "Elena Rostova",
      email: "elena@fanthom.ai",
      role: "Collaborator",
      avatarColor: "#10B981",
    },
  ]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteFeedback, setInviteFeedback] = useState("");

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("fathom_settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.defaultTemplate) setDefaultTemplate(parsed.defaultTemplate);
        if (typeof parsed.botFreeLoopback === "boolean") setBotFreeLoopback(parsed.botFreeLoopback);
        if (typeof parsed.autoJoinMeetings === "boolean") setAutoJoinMeetings(parsed.autoJoinMeetings);
        if (typeof parsed.emailDigest === "boolean") setEmailDigest(parsed.emailDigest);
        if (parsed.integrations) setIntegrations(parsed.integrations);
        if (parsed.vocabulary) setVocabulary(parsed.vocabulary);
      }
    } catch {
      // Ignore fallback
    }
  }, []);

  const saveSettings = (updates: Record<string, any>) => {
    try {
      const current = JSON.parse(localStorage.getItem("fathom_settings") || "{}");
      const next = { ...current, ...updates };
      localStorage.setItem("fathom_settings", JSON.stringify(next));
    } catch {
      // Ignore
    }
  };

  const toggleIntegration = (key: string) => {
    const updated = { ...integrations, [key]: !integrations[key] };
    setIntegrations(updated);
    saveSettings({ integrations: updated });
  };

  const addVocabularyWord = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newWord.trim();
    if (!trimmed || vocabulary.includes(trimmed)) return;
    const updated = [...vocabulary, trimmed];
    setVocabulary(updated);
    setNewWord("");
    saveSettings({ vocabulary: updated });
  };

  const removeVocabularyWord = (word: string) => {
    const updated = vocabulary.filter((w) => w !== word);
    setVocabulary(updated);
    saveSettings({ vocabulary: updated });
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newMember: TeamMember = {
      id: `u-${Date.now()}`,
      name: inviteEmail.split("@")[0],
      email: inviteEmail.trim(),
      role: "Collaborator",
      avatarColor: "#EC4899",
    };

    setTeamMembers((prev) => [...prev, newMember]);
    setInviteEmail("");
    setInviteFeedback(`Invite sent to ${newMember.email}!`);
    setTimeout(() => setInviteFeedback(""), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-[#0A0C12] border border-[#1E2030] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-white"
      >
        {/* Header */}
        <div className="p-4 px-6 border-b border-[#1A1D2E] flex items-center justify-between bg-[#0E111A]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00E5FF]/20 to-[#7C3AED]/20 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Workspace Settings
              </h2>
              <p className="text-xs text-[#8E92A6]">
                Configure AI summary defaults, bot-free capture, integrations, and vocabulary
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6B6F82] hover:text-white hover:bg-[#12141D] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Left Tab Nav + Right Tab Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Tab Navigation */}
          <div className="w-48 border-r border-[#1A1D2E] bg-[#07080D] p-3 space-y-1 shrink-0">
            <button
              onClick={() => setActiveTab("general")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "general"
                  ? "bg-[#12141D] text-[#00E5FF] border border-[#00E5FF]/30 shadow-sm"
                  : "text-[#8E92A6] hover:text-white hover:bg-[#0E1018]"
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>General & AI</span>
            </button>

            <button
              onClick={() => setActiveTab("integrations")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "integrations"
                  ? "bg-[#12141D] text-[#00E5FF] border border-[#00E5FF]/30 shadow-sm"
                  : "text-[#8E92A6] hover:text-white hover:bg-[#0E1018]"
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span>Integrations</span>
            </button>

            <button
              onClick={() => setActiveTab("vocabulary")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "vocabulary"
                  ? "bg-[#12141D] text-[#00E5FF] border border-[#00E5FF]/30 shadow-sm"
                  : "text-[#8E92A6] hover:text-white hover:bg-[#0E1018]"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Vocabulary</span>
            </button>

            <button
              onClick={() => setActiveTab("team")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "team"
                  ? "bg-[#12141D] text-[#00E5FF] border border-[#00E5FF]/30 shadow-sm"
                  : "text-[#8E92A6] hover:text-white hover:bg-[#0E1018]"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Team & Members</span>
            </button>
          </div>

          {/* Tab Content Panel */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#0A0C12] custom-scrollbar">
            {/* 1. GENERAL TAB */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    AI Summary Default Template
                  </h3>
                  <p className="text-xs text-[#8E92A6] mb-3">
                    Choose the default methodology Fanthom uses to analyze your meetings
                  </p>
                  <select
                    value={defaultTemplate}
                    onChange={(e) => {
                      setDefaultTemplate(e.target.value);
                      saveSettings({ defaultTemplate: e.target.value });
                    }}
                    className="w-full max-w-sm px-3.5 py-2.5 bg-[#12141D] border border-[#1E2030] rounded-xl text-xs text-white focus:outline-none focus:border-[#00E5FF]/50"
                  >
                    <option value="enhanced">Enhanced (Universal Executive Summary)</option>
                    <option value="sales">Sales Discovery & Velocity</option>
                    <option value="sales-sandler">Sales - Sandler Selling System</option>
                    <option value="sales-spiced">Sales - SPICED Framework</option>
                    <option value="sales-meddpicc">Enterprise - MEDDPICC</option>
                    <option value="customer-success">Customer Success & Health Signals</option>
                    <option value="one-on-one">One-on-One Team Sync</option>
                    <option value="kickoff">Project Kick-Off & RACI</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-[#1A1D2E] space-y-4">
                  <h3 className="text-sm font-bold text-white">Capture & Privacy</h3>

                  {/* Toggle 1 */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#12141D] border border-[#1E2030]">
                    <div className="pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">
                          Passive Loopback Audio Capture (Bot-Free)
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold text-[#38EDFF] bg-gradient-to-r from-[#00E5FF]/15 to-[#00E5FF]/5 border border-[#00E5FF]/30 shadow-[0_0_8px_rgba(0,229,255,0.12)]">
                          <span className="w-1 h-1 rounded-full bg-[#00E5FF] shadow-[0_0_4px_#00E5FF]" />
                          <span>RECOMMENDED</span>
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8E92A6] mt-0.5">
                        Captures system audio locally without deploying visible AI bot avatars into client calls.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const val = !botFreeLoopback;
                        setBotFreeLoopback(val);
                        saveSettings({ botFreeLoopback: val });
                      }}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        botFreeLoopback ? "bg-[#00E5FF]" : "bg-[#1E2030]"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-[#050608] absolute top-1 transition-transform ${
                          botFreeLoopback ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Toggle 2 */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#12141D] border border-[#1E2030]">
                    <div className="pr-4">
                      <span className="text-xs font-semibold text-white">
                        Auto-Join Calendar Meetings
                      </span>
                      <p className="text-[11px] text-[#8E92A6] mt-0.5">
                        Automatically initialize recording whenever a scheduled Zoom or Google Meet event begins.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const val = !autoJoinMeetings;
                        setAutoJoinMeetings(val);
                        saveSettings({ autoJoinMeetings: val });
                      }}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        autoJoinMeetings ? "bg-[#00E5FF]" : "bg-[#1E2030]"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-[#050608] absolute top-1 transition-transform ${
                          autoJoinMeetings ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Toggle 3 */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#12141D] border border-[#1E2030]">
                    <div className="pr-4">
                      <span className="text-xs font-semibold text-white">
                        Daily Email Summary Digest
                      </span>
                      <p className="text-[11px] text-[#8E92A6] mt-0.5">
                        Receive a 5 PM recap of all completed meetings and outstanding action items.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const val = !emailDigest;
                        setEmailDigest(val);
                        saveSettings({ emailDigest: val });
                      }}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        emailDigest ? "bg-[#00E5FF]" : "bg-[#1E2030]"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-[#050608] absolute top-1 transition-transform ${
                          emailDigest ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. INTEGRATIONS TAB */}
            {activeTab === "integrations" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    Connected Apps & CRMs
                  </h3>
                  <p className="text-xs text-[#8E92A6]">
                    Automatically sync notes, recordings, and action items to your source of truth
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {/* HubSpot */}
                  <div className="p-4 rounded-xl bg-[#12141D] border border-[#1E2030] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FF7A59]/10 border border-[#FF7A59]/30 flex items-center justify-center font-bold text-[#FF7A59] text-sm">
                        HS
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-white">HubSpot CRM</h4>
                          {integrations.hubspot && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-emerald-300 bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.12)]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399]" />
                              <span>Active</span>
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#8E92A6]">
                          Sync call summaries, contacts, and deal timeline records
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleIntegration("hubspot")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        integrations.hubspot
                          ? "bg-[#1A1D2E] hover:bg-[#25283D] text-[#8E92A6] hover:text-white"
                          : "bg-[#00E5FF] text-[#050608] hover:bg-[#38EDFF]"
                      }`}
                    >
                      {integrations.hubspot ? "Disconnect" : "Connect"}
                    </button>
                  </div>

                  {/* Slack */}
                  <div className="p-4 rounded-xl bg-[#12141D] border border-[#1E2030] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#E01E5A]/10 border border-[#E01E5A]/30 flex items-center justify-center font-bold text-[#E01E5A] text-sm">
                        SL
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-white">Slack Workspace</h4>
                          {integrations.slack && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-emerald-300 bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.12)]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399]" />
                              <span>Active</span>
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#8E92A6]">
                          Post automated recaps to #sales-notes & #engineering
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleIntegration("slack")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        integrations.slack
                          ? "bg-[#1A1D2E] hover:bg-[#25283D] text-[#8E92A6] hover:text-white"
                          : "bg-[#00E5FF] text-[#050608] hover:bg-[#38EDFF]"
                      }`}
                    >
                      {integrations.slack ? "Disconnect" : "Connect"}
                    </button>
                  </div>

                  {/* Notion */}
                  <div className="p-4 rounded-xl bg-[#12141D] border border-[#1E2030] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-sm">
                        N
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-white">Notion Database</h4>
                          {integrations.notion && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-emerald-300 bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.12)]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399]" />
                              <span>Active</span>
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#8E92A6]">
                          Publish customer notes into your Team Meeting Wiki
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleIntegration("notion")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        integrations.notion
                          ? "bg-[#1A1D2E] hover:bg-[#25283D] text-[#8E92A6] hover:text-white"
                          : "bg-[#00E5FF] text-[#050608] hover:bg-[#38EDFF]"
                      }`}
                    >
                      {integrations.notion ? "Disconnect" : "Connect"}
                    </button>
                  </div>

                  {/* Salesforce */}
                  <div className="p-4 rounded-xl bg-[#12141D] border border-[#1E2030] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#00A1E0]/10 border border-[#00A1E0]/30 flex items-center justify-center font-bold text-[#00A1E0] text-sm">
                        SF
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-white">Salesforce</h4>
                          {integrations.salesforce && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-emerald-300 bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.12)]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399]" />
                              <span>Active</span>
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#8E92A6]">
                          Sync opportunities and qualification stages
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleIntegration("salesforce")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        integrations.salesforce
                          ? "bg-[#1A1D2E] hover:bg-[#25283D] text-[#8E92A6] hover:text-white"
                          : "bg-[#00E5FF] text-[#050608] hover:bg-[#38EDFF]"
                      }`}
                    >
                      {integrations.salesforce ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. VOCABULARY TAB */}
            {activeTab === "vocabulary" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    Custom Jargon & Vocabulary
                  </h3>
                  <p className="text-xs text-[#8E92A6]">
                    Teach the transcription model your company jargon, acronyms, and product names
                  </p>
                </div>

                <form onSubmit={addVocabularyWord} className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="e.g. Kubernetes, Trigram, Northwind..."
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    className="flex-1 px-3.5 py-2 bg-[#12141D] border border-[#1E2030] focus:border-[#00E5FF]/50 rounded-xl text-xs text-white placeholder-[#555869] focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!newWord.trim()}
                    className="px-4 py-2 rounded-xl bg-[#00E5FF] hover:bg-[#38EDFF] disabled:opacity-30 text-[#050608] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Word</span>
                  </button>
                </form>

                <div className="pt-2">
                  <div className="text-[11px] font-semibold text-[#8E92A6] uppercase tracking-wider mb-2">
                    Active Vocabulary Terms ({vocabulary.length})
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {vocabulary.map((word) => (
                      <span
                        key={word}
                        className="inline-flex items-center gap-2 pl-3 pr-2 py-1 rounded-full bg-gradient-to-r from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-[#00E5FF]/40 text-xs text-[#E1E4EA] hover:text-white transition-all group backdrop-blur-sm shadow-sm"
                      >
                        <span className="font-mono text-[11px] text-[#00E5FF]/80">#</span>
                        <span className="font-medium">{word}</span>
                        <button
                          type="button"
                          onClick={() => removeVocabularyWord(word)}
                          className="w-4 h-4 rounded-full flex items-center justify-center text-[#555869] group-hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title={`Remove ${word}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. TEAM TAB */}
            {activeTab === "team" && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    Team Members & Roles
                  </h3>
                  <p className="text-xs text-[#8E92A6]">
                    Invite collaborators to access shared call transcripts, summaries, and playlists
                  </p>
                </div>

                {/* Invite Teammate */}
                <form onSubmit={handleInvite} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="teammate@company.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="flex-1 px-3.5 py-2 bg-[#12141D] border border-[#1E2030] focus:border-[#00E5FF]/50 rounded-xl text-xs text-white placeholder-[#555869] focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!inviteEmail.trim()}
                      className="px-4 py-2 rounded-xl bg-[#00E5FF] hover:bg-[#38EDFF] disabled:opacity-30 text-[#050608] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send Invite</span>
                    </button>
                  </div>
                  {inviteFeedback && (
                    <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>{inviteFeedback}</span>
                    </div>
                  )}
                </form>

                {/* Member List */}
                <div className="divide-y divide-[#1A1D2E] rounded-xl border border-[#1E2030] overflow-hidden bg-[#12141D]/40">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="p-3.5 px-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{ backgroundColor: member.avatarColor }}
                        >
                          {member.name[0]?.toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">
                              {member.name}
                            </span>
                            <span className="text-[10px] text-[#555869]">·</span>
                            <span className="text-[11px] text-[#8E92A6]">
                              {member.email}
                            </span>
                          </div>
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                          member.role === "Owner"
                            ? "bg-gradient-to-r from-[#00E5FF]/15 to-[#00E5FF]/5 text-[#38EDFF] border-[#00E5FF]/35 shadow-[0_0_10px_rgba(0,229,255,0.15)]"
                            : member.role === "Admin"
                            ? "bg-gradient-to-r from-purple-500/15 to-purple-500/5 text-purple-300 border-purple-500/35 shadow-[0_0_10px_rgba(168,85,247,0.15)]"
                            : "bg-white/[0.04] text-[#A5A8B8] border-white/10"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            member.role === "Owner"
                              ? "bg-[#00E5FF] shadow-[0_0_4px_#00E5FF]"
                              : member.role === "Admin"
                              ? "bg-purple-400 shadow-[0_0_4px_#c084fc]"
                              : "bg-zinc-400"
                          }`}
                        />
                        <span>{member.role}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 px-6 border-t border-[#1A1D2E] flex items-center justify-between bg-[#0E111A]">
          <span className="text-xs text-[#555869]">
            Changes automatically persist locally
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#00E5FF] hover:bg-[#38EDFF] text-[#050608] text-xs font-semibold transition-all cursor-pointer shadow-sm shadow-[#00E5FF]/20"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
