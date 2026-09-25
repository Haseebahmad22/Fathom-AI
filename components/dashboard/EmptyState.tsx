"use client";

import React from "react";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  searchQuery?: string;
  onClear?: () => void;
}

export default function EmptyState({ searchQuery, onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center max-w-sm mx-auto space-y-3">
      <div className="w-10 h-10 rounded-md bg-surface border border-border-muted flex items-center justify-center text-text-muted">
        <SearchX className="w-5 h-5" />
      </div>

      <div className="space-y-1">
        <h3 className="text-xs font-semibold text-text-primary">No meetings found</h3>
        <p className="text-xs text-text-secondary">
          {searchQuery
            ? `No recordings matched "${searchQuery}".`
            : "No meetings recorded in this view yet."}
        </p>
      </div>

      {searchQuery && onClear && (
        <button
          onClick={onClear}
          className="px-3 py-1.5 rounded-md bg-surface border border-border-muted hover:bg-surface-elevated text-xs font-medium text-text-primary transition-colors"
        >
          Clear search filter
        </button>
      )}
    </div>
  );
}
