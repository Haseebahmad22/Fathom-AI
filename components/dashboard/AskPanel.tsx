"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUp,
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
    <div className="h-full flex flex-col bg-surface text-text-primary">
      {/* Top Header Bar */}
      <div className="h-12 px-4 border-b border-border-subtle flex items-center justify-between bg-surface shrink-0">
        <div className="flex items-center gap-2">
          <Bot className="w-3.5 h-3.5 text-text-muted" />
          <span className="text-xs font-semibold text-text-primary">
            Ask Fanthom
          </span>
        </div>

        <button className="text-text-muted hover:text-text-primary transition-colors">
          <Sidebar className="w-4 h-4" />
        </button>
      </div>

      {/* Account-level Notice Banner */}
      <div className="p-3 bg-surface-elevated border-b border-border-subtle text-text-secondary text-xs leading-normal shrink-0">
        <p>
          <span className="font-medium text-text-primary">Account-level search: </span>
          Synthesizing insights across all meeting transcripts and summaries.
        </p>
      </div>

      {/* Chat scrollable message area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {exchanges.length === 0 && !isLoading ? (
          /* Empty state */
          <div className="h-full flex flex-col items-center justify-center text-center space-y-2.5 p-4 my-auto">
            <div className="w-8 h-8 rounded-md bg-surface-elevated border border-border-muted flex items-center justify-center text-text-muted">
              <Bot className="w-4 h-4" />
            </div>
            <div className="space-y-1 max-w-[240px]">
              <p className="text-xs font-medium text-text-primary">
                Ask anything across calls
              </p>
              <p className="text-[11px] text-text-muted leading-normal">
                Answers are synthesized directly from your call transcripts with citations.
              </p>
            </div>
          </div>
        ) : (
          /* Exchanges thread */
          <>
            {exchanges.map((ex) => (
              <div key={ex.id} className="space-y-2">
                {/* User Question Bubble */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-md bg-accent text-white px-3 py-2 text-xs leading-normal">
                    {ex.question}
                  </div>
                </div>

                {/* AI Answer Bubble */}
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-md bg-surface-elevated border border-border-muted flex items-center justify-center shrink-0 mt-0.5 text-text-muted">
                    {ex.isError ? (
                      <AlertCircle className="w-3 h-3 text-status-danger" />
                    ) : (
                      <Bot className="w-3 h-3 text-text-secondary" />
                    )}
                  </div>

                  <div className="max-w-[85%] space-y-1.5">
                    <div
                      className={`rounded-md p-3 text-xs leading-normal ${
                        ex.isError
                          ? "bg-surface-elevated border border-border-muted text-text-secondary"
                          : "bg-surface-elevated border border-border-muted text-text-primary"
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
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono bg-surface-elevated text-text-secondary hover:text-text-primary border border-border-muted transition-colors"
                          >
                            <span>From: {ex.sourceMeetingTitle}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </Link>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono bg-surface-elevated text-text-muted border border-border-subtle">
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
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-md bg-surface-elevated border border-border-muted flex items-center justify-center shrink-0 text-text-muted">
                  <Bot className="w-3 h-3" />
                </div>
                <div className="bg-surface-elevated border border-border-muted rounded-md px-3 py-2 flex items-center gap-2 text-xs text-text-secondary">
                  <Loader2 className="w-3 h-3 animate-spin text-text-muted" />
                  <span>Searching archives...</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-3 py-2 border-t border-border-subtle bg-surface flex flex-col gap-1 shrink-0">
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            disabled={isLoading}
            onClick={() => handleAsk(p)}
            className="w-full text-left text-xs px-2.5 py-1.5 rounded-md bg-surface-elevated hover:bg-surface-active border border-border-muted text-text-secondary hover:text-text-primary transition-colors truncate disabled:opacity-50"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Pinned Input Row */}
      <div className="p-3 border-t border-border-subtle bg-surface space-y-2 shrink-0">
        <div className="relative inline-block">
          <button
            onClick={() => setShowScopeDropdown(!showScopeDropdown)}
            className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-elevated border border-border-muted text-[11px] font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            <span>{scope}</span>
            <ChevronDown className="w-3 h-3 text-text-muted" />
          </button>

          {showScopeDropdown && (
            <div className="absolute bottom-full left-0 mb-1 w-32 bg-surface-elevated border border-border-strong rounded-md py-1 z-20 text-xs">
              {["My calls", "All meetings", "This week"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setScope(item);
                    setShowScopeDropdown(false);
                  }}
                  className={`w-full text-left px-2.5 py-1 hover:bg-surface-active ${
                    scope === item ? "text-text-primary font-medium" : "text-text-secondary"
                  }`}
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
            className="w-full pl-3 pr-9 py-2 bg-surface-elevated border border-border-muted rounded-md text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`absolute right-1.5 w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
              input.trim() && !isLoading
                ? "bg-accent hover:bg-accent-hover text-white cursor-pointer"
                : "bg-surface text-text-muted cursor-not-allowed border border-border-subtle"
            }`}
          >
            <ArrowUp className="w-3.5 h-3.5 stroke-[2]" />
          </button>
        </form>
      </div>
    </div>
  );
}
