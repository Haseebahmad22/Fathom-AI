"use client";

import React from "react";
import { Lock, Bookmark, PlayCircle } from "lucide-react";
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
    <div className="space-y-4 pt-4 border-t border-[#1C1F33]">
      {/* Section Header with Lock Badge from Screenshot */}
      <div className="flex items-center gap-2">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-white/50">
          Annotations
        </h4>
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-bold uppercase bg-amber-500/15 text-amber-400 border border-amber-500/30 tracking-wider">
          <Lock className="w-2.5 h-2.5" />
          Internal Team Only
        </span>
      </div>

      {/* List of Annotations */}
      <div className="space-y-3">
        {highlights.map((h, idx) => {
          const isBookmark = idx % 2 === 0;
          const isActive = Math.abs(currentSeconds - h.timestampSeconds) < 15;

          return (
            <div
              key={h.id}
              onClick={() => onSeek(h.timestampSeconds)}
              className={`p-3 rounded-xl border cursor-pointer transition-all duration-150 group ${
                isActive
                  ? "bg-[#181D33] border-[#00A3FF] shadow-sm shadow-[#00A3FF]/20"
                  : "bg-[#141625] border-[#22253B] hover:border-[#383D60] hover:bg-[#1A1D30]"
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 shrink-0 text-[#00A3FF] group-hover:scale-110 transition-transform">
                  {isBookmark ? (
                    <Bookmark className="w-3.5 h-3.5 fill-[#00A3FF]/20" />
                  ) : (
                    <PlayCircle className="w-3.5 h-3.5 fill-[#00A3FF]/20" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-semibold text-[#00A3FF] group-hover:underline line-clamp-1">
                      {h.quoteText.slice(0, 48)}...
                    </span>
                    <span className="text-[10px] font-mono text-white/40 shrink-0">
                      @{formatTime(h.timestampSeconds)}
                    </span>
                  </div>

                  <p className="text-[11.5px] leading-relaxed text-white/70 line-clamp-2">
                    {h.quoteText}
                  </p>

                  {h.speakerName && (
                    <span className="inline-block mt-1 text-[10px] text-white/40">
                      — {h.speakerName}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
