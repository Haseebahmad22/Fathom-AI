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
    <div className="space-y-3 pt-4 border-t border-border-subtle">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-text-secondary">
          Annotations & highlights
        </h4>
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-mono text-text-muted bg-surface-elevated border border-border-subtle">
          <Lock className="w-2.5 h-2.5" />
          Internal only
        </span>
      </div>

      {/* List of Annotations */}
      <div className="space-y-2">
        {highlights.map((h) => {
          const isActive = Math.abs(currentSeconds - h.timestampSeconds) < 15;

          return (
            <div
              key={h.id}
              onClick={() => onSeek(h.timestampSeconds)}
              className={`p-2.5 rounded-md border cursor-pointer transition-colors ${
                isActive
                  ? "bg-surface-elevated border-accent text-text-primary"
                  : "bg-surface border-border-muted hover:border-border-strong text-text-secondary"
              }`}
            >
              <div className="flex items-start gap-2">
                <Bookmark className="w-3.5 h-3.5 text-text-muted shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[11px] font-medium text-text-primary truncate">
                      {h.speakerName}
                    </span>
                    <span className="text-[10px] font-mono text-text-muted">
                      {formatTime(h.timestampSeconds)}
                    </span>
                  </div>
                  <p className="text-xs leading-normal text-text-secondary line-clamp-2">
                    "{h.quoteText}"
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
