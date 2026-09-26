"use client";

import React from "react";

export type TagVariant =
  | "cyan"
  | "emerald"
  | "amber"
  | "purple"
  | "rose"
  | "neutral"
  | "glass";

export type TagSize = "xs" | "sm" | "md";

interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
  size?: TagSize;
  icon?: React.ReactNode;
  dot?: boolean;
  pulseDot?: boolean;
  className?: string;
  onRemove?: () => void;
}

const variantStyles: Record<TagVariant, { container: string; dot: string }> = {
  cyan: {
    container:
      "bg-gradient-to-r from-[#00E5FF]/15 via-[#00E5FF]/10 to-[#00E5FF]/5 text-[#38EDFF] border border-[#00E5FF]/30 shadow-[0_0_12px_rgba(0,229,255,0.12)]",
    dot: "bg-[#00E5FF] shadow-[0_0_6px_#00E5FF]",
  },
  emerald: {
    container:
      "bg-gradient-to-r from-emerald-500/15 via-emerald-500/10 to-emerald-500/5 text-emerald-300 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.12)]",
    dot: "bg-emerald-400 shadow-[0_0_6px_#34d399]",
  },
  amber: {
    container:
      "bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-amber-500/5 text-amber-300 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.12)]",
    dot: "bg-amber-400 shadow-[0_0_6px_#fbbf24]",
  },
  purple: {
    container:
      "bg-gradient-to-r from-purple-500/15 via-purple-500/10 to-purple-500/5 text-purple-300 border border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.12)]",
    dot: "bg-purple-400 shadow-[0_0_6px_#c084fc]",
  },
  rose: {
    container:
      "bg-gradient-to-r from-rose-500/15 via-rose-500/10 to-rose-500/5 text-rose-300 border border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.12)]",
    dot: "bg-rose-400 shadow-[0_0_6px_#fb7185]",
  },
  neutral: {
    container:
      "bg-gradient-to-b from-white/[0.07] to-white/[0.02] text-[#D8DAE5] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
    dot: "bg-[#8E92A6]",
  },
  glass: {
    container:
      "bg-black/60 backdrop-blur-md text-white border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.12)]",
    dot: "bg-white",
  },
};

const sizeStyles: Record<TagSize, string> = {
  xs: "px-2 py-0.5 text-[10px] gap-1",
  sm: "px-2.5 py-1 text-[11px] gap-1.5",
  md: "px-3 py-1.5 text-xs gap-2",
};

export default function Tag({
  children,
  variant = "neutral",
  size = "xs",
  icon,
  dot,
  pulseDot,
  className = "",
  onRemove,
}: TagProps) {
  const v = variantStyles[variant] || variantStyles.neutral;
  const s = sizeStyles[size] || sizeStyles.xs;

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium tracking-tight select-none transition-all duration-200 ${v.container} ${s} ${className}`}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5 items-center justify-center">
          {pulseDot && (
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${v.dot}`}
            />
          )}
          <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${v.dot}`} />
        </span>
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate leading-none">{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 rounded-full p-0.5 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
        >
          <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none">
            <path
              d="M3 3L9 9M9 3L3 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </span>
  );
}
