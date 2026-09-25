"use client";

import React, { useState } from "react";
import { Search, Copy, Check, Bookmark, Plus, MoreHorizontal } from "lucide-react";
import { TranscriptLine, Highlight } from "@/lib/mock-data";

interface TranscriptPanelProps {
  transcript: TranscriptLine[];
  highlights: Highlight[];
  currentSeconds: number;
  onSeek: (seconds: number) => void;
  hostName?: string;
}

export default function TranscriptPanel({
  transcript,
  highlights,
  currentSeconds,
  onSeek,
  hostName,
}: TranscriptPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder.toString().padStart(2, "0")}`;
  };

  const filteredLines = transcript.filter((line) =>
    line.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    line.speakerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyFullTranscript = () => {
    const fullText = transcript
      .map((l) => `[${formatTime(l.timestampSeconds)}] ${l.speakerName}: ${l.text}`)
      .join("\n\n");
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const primaryHost = hostName || transcript[0]?.speakerName || "Host";

  return (
    <div className="flex flex-col h-full bg-[#0E0F1A] text-white">
      {/* Top action bar: Search & Copy */}
      <div className="px-6 py-4 flex items-center justify-between gap-4 border-b border-[#1A1C2E]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search Transcript"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1A1C2E] border border-[#2B2E46] rounded-full text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#00A3FF] transition-all"
          />
        </div>

        <button
          onClick={copyFullTranscript}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141625] hover:bg-[#1E2138] border border-[#2B2E46] text-xs font-medium text-[#00A3FF] transition-all"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Transcript</span>
            </>
          )}
        </button>
      </div>

      {/* Transcript Chat Stream */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {filteredLines.map((line, idx) => {
          const isHost = line.speakerName === primaryHost;
          const isCurrent =
            currentSeconds >= line.timestampSeconds &&
            (idx === filteredLines.length - 1 ||
              currentSeconds < filteredLines[idx + 1].timestampSeconds);

          // Find if there's a highlight/bookmark near this timestamp
          const matchedHighlight = highlights.find(
            (h) => Math.abs(h.timestampSeconds - line.timestampSeconds) < 25
          );

          return (
            <div key={line.id} className="space-y-2">
              {/* Inline Bookmark banner if highlight matches */}
              {matchedHighlight && idx % 4 === 1 && (
                <div
                  onClick={() => onSeek(matchedHighlight.timestampSeconds)}
                  className="my-3 py-2 px-3 rounded-lg bg-[#161B2E] border border-[#00A3FF]/30 flex items-center gap-2 cursor-pointer hover:bg-[#1A223B] transition-colors"
                >
                  <Bookmark className="w-3.5 h-3.5 text-[#00A3FF] fill-current" />
                  <span className="text-xs font-semibold text-[#00A3FF]">BOOKMARK</span>
                  <span className="text-xs text-white/60">...</span>
                  <span className="text-xs text-white/90 font-medium">
                    {matchedHighlight.quoteText.slice(0, 60)}...
                  </span>
                  <span className="text-[11px] text-white/40 ml-auto font-mono">
                    @{formatTime(matchedHighlight.timestampSeconds)}
                  </span>
                </div>
              )}

              {/* Speaker Bubble Container */}
              <div
                className={`flex flex-col group ${
                  isHost ? "items-end" : "items-start"
                }`}
              >
                {/* Speaker Label */}
                <div
                  className={`flex items-center gap-2 mb-1 px-1 text-[12px] font-medium text-white/60 ${
                    isHost ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <span className="hover:text-white transition-colors">
                    {line.speakerName}
                  </span>
                  <span className="text-[11px] font-mono text-white/30">
                    {formatTime(line.timestampSeconds)}
                  </span>
                </div>

                {/* Bubble with hover actions */}
                <div
                  className={`relative flex items-center gap-2 max-w-[80%] ${
                    isHost ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    onClick={() => onSeek(line.timestampSeconds)}
                    className={`p-3.5 rounded-2xl text-[13.5px] leading-relaxed cursor-pointer transition-all duration-200 ${
                      isHost
                        ? "bg-[#202336] hover:bg-[#272B42] text-white/95 rounded-tr-sm"
                        : "bg-[#181A2B] hover:bg-[#202238] text-white/90 rounded-tl-sm border border-[#252840]"
                    } ${
                      isCurrent
                        ? "ring-2 ring-[#00A3FF] shadow-lg shadow-[#00A3FF]/10"
                        : ""
                    }`}
                  >
                    {line.text}
                  </div>

                  {/* Hover tool buttons */}
                  <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                    <button
                      onClick={() => onSeek(line.timestampSeconds)}
                      title="Bookmark moment"
                      className="p-1 rounded-full text-white/40 hover:text-[#00A3FF] hover:bg-white/10 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      title="More options"
                      className="p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
