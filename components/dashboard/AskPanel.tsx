"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowUp,
  Gift,
  ChevronDown,
  Sidebar,
  Bot,
  MessageSquare,
} from "lucide-react";

export default function AskPanel() {
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState("All Meetings");
  const [showScopeDropdown, setShowScopeDropdown] = useState(false);

  const suggestedPrompts = [
    "List my action items for this week",
    "Summarize my meetings from this week",
    "Who did I speak to about pricing?",
    "Find meetings where SOC 2 was discussed",
  ];

  const handleSelectPrompt = (promptText: string) => {
    setQuery(promptText);
  };

  return (
    <div className="flex flex-col h-full bg-[#0E0F1A] border-l border-[#1A1C2C] text-white">
      {/* Header matching Screenshot: "✨ ASK FATHOM" */}
      <div className="h-12 px-4 border-b border-[#1A1C2C] flex items-center justify-between bg-[#0B0C15] shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#00A3FF]" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Ask Fanthom
          </span>
        </div>

        <button className="text-white/40 hover:text-white transition-colors">
          <Sidebar className="w-4 h-4" />
        </button>
      </div>

      {/* Account-level Announcement Banner from Screenshot */}
      <div className="p-3 bg-[#1B1910] border-b border-amber-500/20 text-amber-300 text-[11px] leading-relaxed flex items-start gap-2 shrink-0">
        <Gift className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-amber-200">
            Account-level Ask Fanthom is here!{" "}
          </span>
          <span>We're gifting you unlimited use until Oct 1. </span>
          <span className="underline hover:text-amber-100 cursor-pointer font-medium">
            Learn More
          </span>
        </div>
      </div>

      {/* Suggested Prompt Chips near top */}
      <div className="p-4 border-b border-[#1A1C2C] bg-[#0E0F1A]/80 shrink-0">
        <div className="text-[10.5px] font-bold uppercase tracking-wider text-white/40 mb-2.5">
          Suggested Queries
        </div>
        <div className="flex flex-wrap gap-1.5">
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPrompt(p)}
              className="text-left text-[11px] px-2.5 py-1.5 rounded-lg bg-[#151726] hover:bg-[#1E2238] border border-[#232742] text-white/80 hover:text-white transition-all duration-150 leading-snug"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chat-style scrollable message area (empty placeholder for now, ready for Prompt 6) */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center text-center space-y-3">
        <div className="w-10 h-10 rounded-full bg-[#151726] border border-[#232742] flex items-center justify-center text-[#00A3FF]">
          <Bot className="w-5 h-5 text-[#00A3FF]" />
        </div>
        <div className="space-y-1 max-w-[240px]">
          <p className="text-xs font-semibold text-white/90">
            Cross-Meeting AI Search
          </p>
          <p className="text-[11px] text-white/50 leading-relaxed">
            Query across your transcripts, recaps, and action items in natural
            language.
          </p>
        </div>
      </div>

      {/* Pinned Input Box at bottom */}
      <div className="p-3.5 border-t border-[#1A1C2C] bg-[#0B0C15] space-y-2 shrink-0">
        {/* Scope selector dropdown */}
        <div className="relative inline-block">
          <button
            onClick={() => setShowScopeDropdown(!showScopeDropdown)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#161829] hover:bg-[#1C1F33] border border-[#252840] text-[11px] font-medium text-white/70 hover:text-white transition-colors"
          >
            <span>{scope}</span>
            <ChevronDown className="w-3 h-3 text-white/40" />
          </button>

          {showScopeDropdown && (
            <div className="absolute bottom-full left-0 mb-1.5 w-36 bg-[#161829] border border-[#2B2F4C] rounded-lg shadow-xl py-1 z-20 text-[11px]">
              {["All Meetings", "My Calls", "This Week"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setScope(item);
                    setShowScopeDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-white/5 ${
                    scope === item ? "text-[#00A3FF] font-semibold" : "text-white/80"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!query.trim()) return;
            // Stubbed for Prompt 6 as requested
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            placeholder="Ask anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-3 pr-10 py-2.5 bg-[#141626] border border-[#24273E] rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#00A3FF] transition-all"
          />
          <button
            type="submit"
            disabled={!query.trim()}
            className="absolute right-2 p-1.5 rounded-lg bg-[#00A3FF] hover:bg-[#0092E6] disabled:opacity-20 text-white transition-all shadow-sm"
          >
            <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </form>
      </div>
    </div>
  );
}
