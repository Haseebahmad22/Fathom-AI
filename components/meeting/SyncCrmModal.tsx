"use client";

import React, { useState } from "react";
import {
  Share2,
  X,
  Check,
  Loader2,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Building,
  CheckCircle2,
} from "lucide-react";
import { Meeting } from "@/lib/mock-data";

interface SyncCrmModalProps {
  meeting: Meeting;
  isOpen: boolean;
  onClose: () => void;
}

export default function SyncCrmModal({
  meeting,
  isOpen,
  onClose,
}: SyncCrmModalProps) {
  const [platform, setPlatform] = useState<"hubspot" | "salesforce" | "slack" | "notion">("hubspot");
  const [slackChannel, setSlackChannel] = useState("#sales-notes");
  const [syncSummary, setSyncSummary] = useState(true);
  const [syncActions, setSyncActions] = useState(true);
  const [syncHighlights, setSyncHighlights] = useState(true);
  const [syncTranscript, setSyncTranscript] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSync = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);

    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);
      setTimeout(() => {
        setSyncSuccess(false);
        onClose();
      }, 1800);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#0A0C12] border border-[#1E2030] rounded-2xl shadow-2xl overflow-hidden flex flex-col text-white"
      >
        {/* Header */}
        <div className="p-4 px-6 border-b border-[#1A1D2E] flex items-center justify-between bg-[#0E111A]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00E5FF]/20 to-[#7C3AED]/20 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Sync to CRM & Team Slack
              </h2>
              <p className="text-xs text-[#8E92A6]">
                Push structured recap, action items, and notes automatically
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

        {/* Form Body */}
        {syncSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">
              Successfully Synced!
            </h3>
            <p className="text-xs text-[#8E92A6]">
              {platform === "slack"
                ? `Recap posted to ${slackChannel}`
                : `Notes and tasks logged to ${platform.toUpperCase()}`}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSync} className="p-6 space-y-4">
            {/* Platform Selection */}
            <div>
              <label className="block text-xs font-semibold text-[#8E92A6] mb-2 uppercase tracking-wider">
                Target Platform
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPlatform("hubspot")}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                    platform === "hubspot"
                      ? "bg-[#FF7A59]/10 border-[#FF7A59]/50 text-white"
                      : "bg-[#12141D] border-[#1E2030] text-[#8E92A6] hover:bg-[#1A1D2E]"
                  }`}
                >
                  <div className="w-5 h-5 rounded bg-[#FF7A59] text-white font-bold flex items-center justify-center text-[10px]">
                    HS
                  </div>
                  <span>HubSpot CRM</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPlatform("slack")}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                    platform === "slack"
                      ? "bg-[#E01E5A]/10 border-[#E01E5A]/50 text-white"
                      : "bg-[#12141D] border-[#1E2030] text-[#8E92A6] hover:bg-[#1A1D2E]"
                  }`}
                >
                  <div className="w-5 h-5 rounded bg-[#E01E5A] text-white font-bold flex items-center justify-center text-[10px]">
                    SL
                  </div>
                  <span>Slack Channel</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPlatform("notion")}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                    platform === "notion"
                      ? "bg-white/10 border-white/50 text-white"
                      : "bg-[#12141D] border-[#1E2030] text-[#8E92A6] hover:bg-[#1A1D2E]"
                  }`}
                >
                  <div className="w-5 h-5 rounded bg-white text-black font-bold flex items-center justify-center text-[10px]">
                    N
                  </div>
                  <span>Notion Wiki</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPlatform("salesforce")}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                    platform === "salesforce"
                      ? "bg-[#00A1E0]/10 border-[#00A1E0]/50 text-white"
                      : "bg-[#12141D] border-[#1E2030] text-[#8E92A6] hover:bg-[#1A1D2E]"
                  }`}
                >
                  <div className="w-5 h-5 rounded bg-[#00A1E0] text-white font-bold flex items-center justify-center text-[10px]">
                    SF
                  </div>
                  <span>Salesforce</span>
                </button>
              </div>
            </div>

            {/* If Slack: Channel Picker */}
            {platform === "slack" && (
              <div>
                <label className="block text-xs font-semibold text-[#8E92A6] mb-1.5 uppercase tracking-wider">
                  Post to Channel
                </label>
                <select
                  value={slackChannel}
                  onChange={(e) => setSlackChannel(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#12141D] border border-[#1E2030] focus:border-[#00E5FF]/50 rounded-xl text-xs text-white focus:outline-none"
                >
                  <option value="#sales-notes">#sales-notes</option>
                  <option value="#engineering-updates">#engineering-updates</option>
                  <option value="#general">#general</option>
                  <option value="#client-acme-corp">#client-acme-corp</option>
                </select>
              </div>
            )}

            {/* Payload Toggles */}
            <div>
              <label className="block text-xs font-semibold text-[#8E92A6] mb-2 uppercase tracking-wider">
                Include in Payload
              </label>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#12141D] border border-[#1E2030] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={syncSummary}
                    onChange={(e) => setSyncSummary(e.target.checked)}
                    className="accent-[#00E5FF] w-4 h-4 rounded"
                  />
                  <span>AI Executive Summary & Categorized Notes</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#12141D] border border-[#1E2030] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={syncActions}
                    onChange={(e) => setSyncActions(e.target.checked)}
                    className="accent-[#00E5FF] w-4 h-4 rounded"
                  />
                  <span>Action Items & Assignees</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#12141D] border border-[#1E2030] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={syncHighlights}
                    onChange={(e) => setSyncHighlights(e.target.checked)}
                    className="accent-[#00E5FF] w-4 h-4 rounded"
                  />
                  <span>Key Highlight Quote Clips</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#12141D] border border-[#1E2030] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={syncTranscript}
                    onChange={(e) => setSyncTranscript(e.target.checked)}
                    className="accent-[#00E5FF] w-4 h-4 rounded"
                  />
                  <span className="text-[#8E92A6]">Full Verbatim Transcript</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#1A1D2E]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#8E92A6] hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSyncing}
                className="px-4 py-2 rounded-xl bg-[#00E5FF] hover:bg-[#38EDFF] disabled:opacity-50 text-[#050608] font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#00E5FF]/20 cursor-pointer"
              >
                {isSyncing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Syncing...</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Sync Now</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
