"use client";

import React from "react";
import {
  HelpCircle,
  X,
  Keyboard,
  Command,
  BookOpen,
  MessageCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface ShortcutsHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShortcutsHelpModal({
  isOpen,
  onClose,
}: ShortcutsHelpModalProps) {
  if (!isOpen) return null;

  const shortcutGroups = [
    {
      category: "Playback & Video",
      items: [
        { keys: ["Space"], desc: "Play or pause video/audio" },
        { keys: ["J"], desc: "Skip backward 10 seconds" },
        { keys: ["L"], desc: "Skip forward 10 seconds" },
        { keys: ["M"], desc: "Toggle audio mute" },
        { keys: ["1", "2", "3", "4"], desc: "Set speed (1x, 1.25x, 1.5x, 2x)" },
      ],
    },
    {
      category: "Global & Navigation",
      items: [
        { keys: ["⌘", "K"], desc: "Open Command Palette / Omni-Search" },
        { keys: ["/"], desc: "Focus search in any list" },
        { keys: ["Esc"], desc: "Close active modal or tray" },
        { keys: ["G", "D"], desc: "Navigate to Dashboard" },
        { keys: ["G", "T"], desc: "Navigate to Team Calls" },
        { keys: ["G", "P"], desc: "Navigate to Playlists" },
        { keys: ["G", "A"], desc: "Navigate to Alerts" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[#0A0C12] border border-[#1E2030] rounded-2xl shadow-2xl overflow-hidden flex flex-col text-white"
      >
        {/* Header */}
        <div className="p-4 px-6 border-b border-[#1A1D2E] flex items-center justify-between bg-[#0E111A]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00E5FF]/20 to-[#7C3AED]/20 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Keyboard Shortcuts & Help
              </h2>
              <p className="text-xs text-[#8E92A6]">
                Master hotkeys to fly through call reviews and actions
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6B6F82] hover:text-white hover:bg-[#12141D] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcuts Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6 custom-scrollbar bg-[#0A0C12]">
          {shortcutGroups.map((group, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-xs font-semibold text-[#8E92A6] uppercase tracking-wider">
                {group.category}
              </h3>
              <div className="rounded-xl border border-[#1E2030] divide-y divide-[#1A1D2E] overflow-hidden bg-[#12141D]/30">
                {group.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="p-2.5 px-3.5 flex items-center justify-between gap-4 text-xs"
                  >
                    <span className="text-[#C5C8D8]">{item.desc}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      {item.keys.map((k, kIdx) => (
                        <kbd
                          key={kIdx}
                          className="px-2 py-0.5 rounded-md bg-[#12141D] border border-[#2A2E44] text-[11px] font-mono font-bold text-white shadow-sm"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Help Links */}
          <div className="pt-2">
            <h3 className="text-xs font-semibold text-[#8E92A6] uppercase tracking-wider mb-2.5">
              Resources & Support
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://fathom.video"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-[#12141D] border border-[#1E2030] hover:border-[#00E5FF]/40 transition-colors flex items-center justify-between text-xs group"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#00E5FF]" />
                  <span className="font-semibold text-white">Documentation</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#555869] group-hover:text-white" />
              </a>

              <div className="p-3 rounded-xl bg-[#12141D] border border-[#1E2030] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-white">Support Available</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-emerald-300 bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.15)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399]" />
                  <span>24/7</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 px-6 border-t border-[#1A1D2E] flex items-center justify-between bg-[#0E111A]">
          <span className="text-xs text-[#555869]">
            Press <kbd className="px-1.5 py-0.2 rounded bg-[#12141D] border border-[#1E2030] text-[10px] text-white">?</kbd> anywhere to open
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#00E5FF] hover:bg-[#38EDFF] text-[#050608] text-xs font-semibold transition-all cursor-pointer shadow-sm shadow-[#00E5FF]/20"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
