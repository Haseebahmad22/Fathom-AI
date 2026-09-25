"use client";

import React, { useState } from "react";
import { Search, Copy, Check, Bookmark, Plus } from "lucide-react";
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
    <div className="flex flex-col h-full bg-app text-text-primary">
      {/* Top action bar: Search & Copy */}
      <div className="px-6 py-3 flex items-center justify-between gap-4 border-b border-border-subtle bg-surface">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search transcript..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-surface-elevated border border-border-muted rounded-md text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        <button
          onClick={copyFullTranscript}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-surface-elevated hover:bg-surface-active border border-border-muted text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-text-primary" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-text-muted" />
              <span>Copy transcript</span>
            </>
          )}
        </button>
      </div>

      {/* Transcript Dense Stream */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
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
            <div key={line.id} className="space-y-1.5">
              {/* Inline Bookmark banner if highlight matches */}
              {matchedHighlight && idx % 4 === 1 && (
                <div
                  onClick={() => onSeek(matchedHighlight.timestampSeconds)}
                  className="my-2 py-1.5 px-3 rounded-md bg-surface-elevated border border-border-muted flex items-center gap-2 cursor-pointer hover:border-border-strong transition-colors text-xs"
                >
                  <Bookmark className="w-3.5 h-3.5 text-text-muted shrink-0" />
                  <span className="font-medium text-text-primary">Bookmark:</span>
                  <span className="text-text-secondary truncate">
                    {matchedHighlight.quoteText}
                  </span>
                  <span className="text-[11px] font-mono text-text-muted ml-auto shrink-0">
                    @{formatTime(matchedHighlight.timestampSeconds)}
                  </span>
                </div>
              )}

              {/* Speaker Row Container */}
              <div
                onClick={() => onSeek(line.timestampSeconds)}
                className={`p-3 rounded-md border transition-colors cursor-pointer group ${
                  isCurrent
                    ? "bg-surface-elevated border-accent text-text-primary"
                    : "bg-surface border-border-subtle hover:border-border-muted text-text-secondary"
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`font-medium ${isCurrent ? "text-text-primary" : "text-text-secondary"}`}>
                    {line.speakerName} {isHost ? "(Host)" : ""}
                  </span>
                  <span className="font-mono text-[11px] text-text-muted">
                    {formatTime(line.timestampSeconds)}
                  </span>
                </div>

                <div className="text-xs leading-normal text-text-primary">
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
