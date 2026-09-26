"use client";

import React, { useState } from "react";
import { Search, Copy, Check, Bookmark } from "lucide-react";
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

  const filteredLines = transcript.filter(
    (line) =>
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
    <div className="flex flex-col h-full bg-[#050608] text-white">
      {/* Top action bar: Search & Copy */}
      <div className="px-6 py-3.5 flex items-center justify-between gap-4 border-b border-[#1A1D2E] bg-[#0A0C12]">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555869]" />
          <input
            type="text"
            placeholder="Search transcript..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#12141D] border border-[#1E2030] rounded-xl text-sm text-white placeholder:text-[#555869] focus:outline-none focus:border-[#00E5FF]/50 transition-all"
          />
        </div>

        <button
          onClick={copyFullTranscript}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#12141D] hover:bg-[#1C1E2A] border border-[#1E2030] hover:border-[#353950] text-xs font-medium text-[#8E92A6] hover:text-white transition-all"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy transcript</span>
            </>
          )}
        </button>
      </div>

      {/* Transcript Dense Stream */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
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
                  className="my-2 py-2 px-3.5 rounded-xl bg-[#12141D] border border-[#00E5FF]/20 flex items-center gap-2.5 cursor-pointer hover:border-[#00E5FF]/40 transition-all text-xs"
                >
                  <Bookmark className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                  <span className="font-semibold text-white">Highlight:</span>
                  <span className="text-[#C5C8D8] truncate">
                    {matchedHighlight.quoteText}
                  </span>
                  <span className="text-[11px] font-mono text-[#555869] ml-auto shrink-0">
                    @{formatTime(matchedHighlight.timestampSeconds)}
                  </span>
                </div>
              )}

              {/* Speaker Row Container */}
              <div
                onClick={() => onSeek(line.timestampSeconds)}
                className={`p-4 rounded-xl border transition-all cursor-pointer group ${
                  isCurrent
                    ? "bg-[#12141D] border-[#00E5FF]/30 shadow-md shadow-[#00E5FF]/5"
                    : "bg-[#0A0C12] border-[#1A1D2E] hover:bg-[#12141D] hover:border-[#353950]"
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className={`font-semibold ${isCurrent ? "text-[#00E5FF]" : "text-[#C5C8D8]"}`}>
                    {line.speakerName} {isHost ? "(Host)" : ""}
                  </span>
                  <span className="font-mono text-[11px] text-[#555869]">
                    {formatTime(line.timestampSeconds)}
                  </span>
                </div>

                <div className="text-sm leading-relaxed text-[#E4E5EB]">
                  {line.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
