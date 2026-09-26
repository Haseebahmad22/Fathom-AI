"use client";

import React from "react";
import { SearchX, Video } from "lucide-react";

interface EmptyStateProps {
  searchQuery?: string;
  onClear?: () => void;
}

export default function EmptyState({ searchQuery, onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-center max-w-md mx-auto space-y-5">
      <div className="w-16 h-16 rounded-2xl bg-[#12141D] border border-[#1E2030] flex items-center justify-center">
        {searchQuery ? (
          <SearchX className="w-7 h-7 text-[#555869]" />
        ) : (
          <Video className="w-7 h-7 text-[#555869]" />
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-semibold text-white">
          {searchQuery ? "No meetings found" : "No meetings yet"}
        </h3>
        <p className="text-sm text-[#8E92A6] leading-relaxed">
          {searchQuery
            ? `No recordings matched "${searchQuery}". Try a different search term.`
            : "Start your first meeting and Fathom will automatically capture, transcribe, and summarize it for you."}
        </p>
      </div>

      {searchQuery && onClear && (
        <button
          onClick={onClear}
          className="px-5 py-2.5 rounded-xl bg-[#12141D] border border-[#1E2030] hover:bg-[#1C1E2A] hover:border-[#353950] text-sm font-medium text-white transition-all"
        >
          Clear search
        </button>
      )}
    </div>
  );
}
