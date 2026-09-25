"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowUp,
  Gift,
  ChevronDown,
  Sidebar,
  Bot,
  ExternalLink,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { mockMeetings } from "@/lib/mock-data";

interface ChatExchange {
  id: string;
  question: string;
  answer: string;
  sourceMeetingTitle?: string;
  sourceMeetingId?: string;
  isError?: boolean;
}

export default function AskPanel() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [exchanges, setExchanges] = useState<ChatExchange[]>([]);
  const [scope, setScope] = useState("My Calls");
  const [showScopeDropdown, setShowScopeDropdown] = useState(false);

  // 3 suggested prompt chips stacked above input box per spec
  const suggestedPrompts = [
    "Surprise me with an insight",
    "List my action items for this week",
    "Summarize my meetings from this week",
  ];

  const resolveMeetingId = (title?: string) => {
    if (!title) return undefined;
    const match = mockMeetings.find(
      (m) =>
        m.title.toLowerCase() === title.toLowerCase() ||
        m.title.toLowerCase().includes(title.toLowerCase()) ||
        title.toLowerCase().includes(m.title.toLowerCase())
    );
    return match?.id;
  };

  const handleAsk = async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || isLoading) return;

    setInput(trimmed);
    setIsLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const meetingId = resolveMeetingId(data.sourceMeetingTitle);

      const newExchange: ChatExchange = {
        id: Date.now().toString(),
        question: trimmed,
        answer: data.answer || "I don't see that in your meetings.",
        sourceMeetingTitle: data.sourceMeetingTitle,
        sourceMeetingId: meetingId,
      };

      setExchanges((prev) => [...prev, newExchange]);
      setInput("");
    } catch (err: any) {
      console.error("Ask panel error:", err);
      const errorExchange: ChatExchange = {
        id: Date.now().toString(),
        question: trimmed,
        answer: "Something went wrong, try again.",
        isError: true,
      };
      setExchanges((prev) => [...prev, errorExchange]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0E0F1A] border-l border-[#1A1C2C] text-white">
      {/* Header: "✨ ASK FATHOM" */}
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

      {/* Chat-style scrollable message area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {exchanges.length === 0 && !isLoading ? (
          /* Initial Empty state */
          <div className="h-full flex flex-col items-center justify-center text-center space-y-3 p-4 my-auto">
            <div className="w-10 h-10 rounded-full bg-[#151726] border border-[#232742] flex items-center justify-center text-[#00A3FF]">
              <Bot className="w-5 h-5 text-[#00A3FF]" />
            </div>
            <div className="space-y-1 max-w-[260px]">
              <p className="text-xs font-semibold text-white/90">
                Ask Fanthom Anything
              </p>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Powered by Gemini. Answers are synthesized directly from your
                call transcripts and summaries.
              </p>
            </div>
          </div>
        ) : (
          /* Exchanges thread */
          <>
            {exchanges.map((ex) => (
              <div key={ex.id} className="space-y-2.5 animate-in fade-in duration-200">
                {/* User Question Bubble */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#00A3FF] text-white px-3.5 py-2.5 text-xs font-medium leading-relaxed shadow-sm">
                    {ex.question}
                  </div>
                </div>

                {/* AI Answer Bubble */}
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#151726] border border-[#232742] flex items-center justify-center shrink-0 mt-0.5">
                    {ex.isError ? (
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 text-[#00A3FF]" />
                    )}
                  </div>

                  <div className="max-w-[85%] space-y-2">
                    <div
                      className={`rounded-2xl rounded-tl-sm p-3.5 text-xs leading-relaxed ${
                        ex.isError
                          ? "bg-rose-950/30 border border-rose-800/40 text-rose-200"
                          : "bg-[#141625] border border-[#232742] text-white/90"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{ex.answer}</div>
                    </div>

                    {/* Source Meeting Chip */}
                    {ex.sourceMeetingTitle && (
                      <div className="pl-1">
                        {ex.sourceMeetingId ? (
                          <Link
                            href={`/meeting/${ex.sourceMeetingId}`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#161B2E] text-[#00A3FF] hover:bg-[#1E2540] border border-[#00A3FF]/30 transition-all group"
                          >
                            <span>From: {ex.sourceMeetingTitle}</span>
                            <ExternalLink className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#161B2E] text-white/60 border border-[#232742]">
                            From: {ex.sourceMeetingTitle}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2.5 animate-in fade-in">
                <div className="w-6 h-6 rounded-full bg-[#151726] border border-[#232742] flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-[#00A3FF]" />
                </div>
                <div className="bg-[#141625] border border-[#232742] rounded-2xl rounded-tl-sm px-3.5 py-2.5 flex items-center gap-2 text-xs text-white/60">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00A3FF]" />
                  <span>Searching call archives with Gemini...</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Suggested Prompt Chips: 2-3 chips stacked directly above the input box */}
      <div className="px-3.5 py-2 border-t border-[#1A1C2C]/80 bg-[#0B0C15]/60 flex flex-col gap-1.5 shrink-0">
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            disabled={isLoading}
            onClick={() => handleAsk(p)}
            className="w-full text-left text-[11px] px-3 py-1.5 rounded-full bg-[#141626] hover:bg-[#1C2036] border border-[#22263D] hover:border-[#00A3FF]/40 text-white/70 hover:text-white transition-all truncate disabled:opacity-50"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Pinned Input Row matching Reference Screenshot */}
      <div className="p-3.5 border-t border-[#1A1C2C] bg-[#0B0C15] space-y-2 shrink-0">
        {/* Scope selector on bottom-left: labeled "My Calls" */}
        <div className="relative inline-block">
          <button
            onClick={() => setShowScopeDropdown(!showScopeDropdown)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#161829] hover:bg-[#1C1F33] border border-[#252840] text-[11px] font-medium text-white/70 hover:text-white transition-colors"
          >
            <span>{scope}</span>
            <ChevronDown className="w-3 h-3 text-white/40" />
          </button>

          {showScopeDropdown && (
            <div className="absolute bottom-full left-0 mb-1.5 w-32 bg-[#161829] border border-[#2B2F4C] rounded-lg shadow-xl py-1 z-20 text-[11px]">
              {["My Calls", "All Meetings", "This Week"].map((item) => (
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

        {/* Input Bar with Circular Submit Arrow on bottom-right */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(input);
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            placeholder="Ask anything..."
            value={input}
            disabled={isLoading}
            onChange={(e) => setInput(e.target.value)}
            className="w-full pl-3.5 pr-11 py-2.5 bg-[#141626] border border-[#24273E] rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#00A3FF] transition-all disabled:opacity-50"
          />

          {/* Circular submit button: disabled/greyed until text is in the input */}
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`absolute right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              input.trim() && !isLoading
                ? "bg-[#00A3FF] hover:bg-[#0092E6] text-white shadow-md cursor-pointer"
                : "bg-[#1E2235] text-white/20 cursor-not-allowed"
            }`}
          >
            <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </form>
      </div>
    </div>
  );
}
