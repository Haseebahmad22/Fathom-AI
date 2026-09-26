"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUp,
  ChevronDown,
  Sparkles,
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
  const [scope, setScope] = useState("My calls");
  const [showScopeDropdown, setShowScopeDropdown] = useState(false);

  // Suggested prompt chips stacked above input box
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

      const data = await res.json();

      if (!res.ok) {
        setExchanges((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            question: trimmed,
            answer:
              data.error ||
              "Could not complete query. Please ensure GEMINI_API_KEY is configured.",
            isError: true,
          },
        ]);
      } else {
        const inferredId = resolveMeetingId(data.sourceMeetingTitle);
        setExchanges((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            question: trimmed,
            answer: data.answer,
            sourceMeetingTitle: data.sourceMeetingTitle,
            sourceMeetingId: inferredId,
          },
        ]);
      }
    } catch {
      setExchanges((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          question: trimmed,
          answer: "Network error communicating with the intelligence service.",
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0A0C12] text-white">
      {/* Top Header Bar */}
      <div className="h-14 px-5 border-b border-[#1A1D2E] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00E5FF]/20 to-[#7C3AED]/20 border border-[#00E5FF]/30 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
          </div>
          <span className="text-sm font-semibold text-white">
            Ask Fathom
          </span>
        </div>

        <span className="text-[10px] text-[#555869] bg-[#12141D] border border-[#1E2030] rounded-md px-2 py-0.5 font-medium">
          AI
        </span>
      </div>

      {/* Account-level Notice Banner */}
      <div className="px-5 py-3 bg-[#0D0F14] border-b border-[#1A1D2E] text-[#8E92A6] text-xs leading-relaxed shrink-0">
        <p>
          <span className="font-medium text-[#C5C8D8]">Account-level search:</span>{" "}
          Synthesizing insights across all meeting transcripts and summaries.
        </p>
      </div>

      {/* Chat scrollable message area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {exchanges.length === 0 && !isLoading ? (
          /* Empty state */
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-4 my-auto">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00E5FF]/10 to-[#7C3AED]/10 border border-[#1E2030] flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#00E5FF]" />
            </div>
            <div className="space-y-1.5 max-w-[260px]">
              <p className="text-sm font-semibold text-white">
                Ask anything across calls
              </p>
              <p className="text-xs text-[#8E92A6] leading-relaxed">
                Answers are synthesized from your call transcripts with citations.
              </p>
            </div>
          </div>
        ) : (
          /* Exchanges thread */
          <>
            {exchanges.map((ex) => (
              <div key={ex.id} className="space-y-3">
                {/* User Question Bubble */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#00E5FF] text-[#050608] px-4 py-2.5 text-sm font-medium leading-relaxed">
                    {ex.question}
                  </div>
                </div>

                {/* AI Answer Bubble */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#12141D] border border-[#1E2030] flex items-center justify-center shrink-0 mt-0.5">
                    {ex.isError ? (
                      <AlertCircle className="w-3.5 h-3.5 text-[#FB7185]" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 text-[#00E5FF]" />
                    )}
                  </div>

                  <div className="max-w-[85%] space-y-2">
                    <div
                      className={`rounded-2xl rounded-tl-sm p-4 text-sm leading-relaxed ${
                        ex.isError
                          ? "bg-[#1A1012] border border-[#3A1520] text-[#FB7185]"
                          : "bg-[#12141D] border border-[#1E2030] text-[#E4E5EB]"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{ex.answer}</div>
                    </div>

                    {/* Source Meeting Chip */}
                    {ex.sourceMeetingTitle && (
                      <div>
                        {ex.sourceMeetingId ? (
                          <Link
                            href={`/meeting/${ex.sourceMeetingId}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-[#12141D] text-[#8E92A6] hover:text-[#00E5FF] border border-[#1E2030] hover:border-[#00E5FF]/30 transition-all"
                          >
                            <span>From: {ex.sourceMeetingTitle}</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-[#12141D] text-[#555869] border border-[#1A1D2E]">
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
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#12141D] border border-[#1E2030] flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-[#00E5FF]" />
                </div>
                <div className="bg-[#12141D] border border-[#1E2030] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2.5 text-sm text-[#8E92A6]">
                  <Loader2 className="w-4 h-4 animate-spin text-[#00E5FF]" />
                  <span>Searching archives...</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-4 py-3 border-t border-[#1A1D2E] bg-[#0A0C12] flex flex-col gap-1.5 shrink-0">
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            disabled={isLoading}
            onClick={() => handleAsk(p)}
            className="w-full text-left text-xs px-3 py-2 rounded-lg bg-[#12141D] hover:bg-[#1C1E2A] border border-[#1E2030] hover:border-[#353950] text-[#8E92A6] hover:text-white transition-all truncate disabled:opacity-50"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Pinned Input Row */}
      <div className="p-4 border-t border-[#1A1D2E] bg-[#0A0C12] space-y-2.5 shrink-0">
        <div className="relative inline-block">
          <button
            onClick={() => setShowScopeDropdown(!showScopeDropdown)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#12141D] border border-[#1E2030] text-xs font-medium text-[#8E92A6] hover:text-white hover:border-[#353950] transition-all"
          >
            <span>{scope}</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {showScopeDropdown && (
            <div className="absolute bottom-full left-0 mb-1.5 w-36 bg-[#12141D] border border-[#353950] rounded-xl py-1.5 z-20 text-xs shadow-xl shadow-black/40">
              {["My calls", "All meetings", "This week"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setScope(item);
                    setShowScopeDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 hover:bg-[#1C1E2A] rounded-lg mx-0.5 transition-colors ${
                    scope === item ? "text-white font-medium" : "text-[#8E92A6]"
                  }`}
                  style={{ width: "calc(100% - 4px)" }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input Bar with Submit Arrow */}
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
            className="w-full pl-4 pr-12 py-3 bg-[#12141D] border border-[#1E2030] rounded-xl text-sm text-white placeholder:text-[#555869] focus:outline-none focus:border-[#00E5FF]/50 transition-all disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`absolute right-2 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              input.trim() && !isLoading
                ? "bg-[#00E5FF] hover:bg-[#38EDFF] text-[#050608] cursor-pointer shadow-md shadow-[#00E5FF]/20"
                : "bg-[#1A1D2E] text-[#555869] cursor-not-allowed"
            }`}
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>
      </div>
    </div>
  );
}
