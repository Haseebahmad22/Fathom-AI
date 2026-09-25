"use client";

import React from "react";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  searchQuery?: string;
  onClear?: () => void;
}

export default function EmptyState({ searchQuery, onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center max-w-sm mx-auto space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-[#141624] border border-[#252840] flex items-center justify-center text-white/40">
        <SearchX className="w-6 h-6 text-white/50" />
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-bold text-white">No meetings found</h3>
        <p className="text-xs text-white/50">
          {searchQuery
            ? `We couldn't find any recordings matching "${searchQuery}".`
            : "No meetings recorded in this view yet."}
        </p>
      </div>

      {searchQuery && onClear && (
        <button
          onClick={onClear}
          className="px-3.5 py-1.5 rounded-lg bg-[#181B2C] hover:bg-[#20253D] border border-[#2C3150] text-xs font-medium text-[#00A3FF] transition-all"
        >
          Clear search filter
        </button>
      )}
    </div>
  );
}
