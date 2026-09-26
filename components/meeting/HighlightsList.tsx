"use client";

import React from "react";
import { Lock, Bookmark } from "lucide-react";
import { Highlight } from "@/lib/mock-data";

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
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-3 pt-3 border-t border-[#1A1D2E]">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-[11px] font-semibold text-[#8E92A6] uppercase tracking-wider">
          Highlights
        </h4>
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium text-[#555869] bg-[#12141D] border border-[#1E2030]">
          <Lock className="w-2.5 h-2.5" />
          Internal only
        </span>
      </div>

      {/* List of Annotations */}
      <div className="space-y-1.5">
        {highlights.map((h) => {
          const isActive = Math.abs(currentSeconds - h.timestampSeconds) < 15;

          return (
            <div
              key={h.id}
              onClick={() => onSeek(h.timestampSeconds)}
              className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
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
                    <span className="text-[10px] font-mono text-[#555869]">
                      {formatTime(h.timestampSeconds)}
                    </span>
                  </div>
                  <p className="text-xs leading-snug text-[#C5C8D8] line-clamp-2">
                    &ldquo;{h.quoteText}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
