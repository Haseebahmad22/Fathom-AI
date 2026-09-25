"use client";

import React, { useState } from "react";
import { ArrowUp, MessageSquare, Bot } from "lucide-react";
import { Meeting } from "@/lib/mock-data";

interface AskFathomPanelProps {
  meeting: Meeting;
  onSeek: (seconds: number) => void;
}

interface ChatMessage {
  id: string;
  sender: "user" | "fathom";
  text: string;
  citations?: { quote: string; timestamp: number }[];
}

export default function AskFathomPanel({ meeting, onSeek }: AskFathomPanelProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const promptSuggestions = [
    "What were key decisions in this call?",
    "Detail all timelines discussed",
    "What action items were committed to?",
    "Who needs to be followed up with?",
  ];

  const handleAsk = (query: string) => {
    if (!query.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let responseText = "";
      let citations: { quote: string; timestamp: number }[] = [];

      const q = query.toLowerCase();
      if (q.includes("decision") || q.includes("key")) {
        const topH = meeting.highlights[0];
        responseText = `A primary agreement was reached regarding project rollout: "${
          topH?.quoteText || "The team aligned on the core delivery milestones."
        }"`;
        if (topH) {
          citations.push({ quote: topH.quoteText, timestamp: topH.timestampSeconds });
        }
      } else if (q.includes("timeline") || q.includes("date") || q.includes("when")) {
        const bullets = meeting.summary.map((s) => s.text).join(" ");
        responseText = `Timelines discussed included pilot milestones and review schedules: ${bullets.slice(
          0,
          180
        )}...`;
        if (meeting.highlights[1]) {
          citations.push({
            quote: meeting.highlights[1].quoteText,
            timestamp: meeting.highlights[1].timestampSeconds,
          });
        }
      } else if (q.includes("action") || q.includes("next")) {
        const pendingItems = meeting.actionItems
          .map((a) => `• ${a.text} (${a.assignee || "Unassigned"}, Due: ${a.dueDate || "TBD"})`)
          .join("\n");
        responseText = `Here are the committed action items:\n\n${pendingItems}`;
      } else {
        responseText = `Based on this meeting with ${meeting.participants
          .map((p) => p.name)
          .join(" and ")}, the core discussion centered on ${meeting.summary[0]?.text || meeting.title}.`;
        if (meeting.highlights[0]) {
          citations.push({
            quote: meeting.highlights[0].quoteText,
            timestamp: meeting.highlights[0].timestampSeconds,
          });
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "fathom",
          text: responseText,
          citations,
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col h-full bg-app text-text-primary">
      {/* Messages area or Initial empty state */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-center">
        {messages.length === 0 ? (
          /* Empty / Welcome state */
          <div className="flex flex-col items-center justify-center text-center max-w-sm mx-auto my-auto space-y-4">
            <div className="w-8 h-8 rounded-md bg-surface border border-border-muted flex items-center justify-center text-text-muted">
              <Bot className="w-4 h-4" />
            </div>

            <h3 className="text-xs font-semibold text-text-primary">
              Ask about this call
            </h3>

            {/* 2x2 grid of prompt suggestions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
              {promptSuggestions.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAsk(prompt)}
                  className="p-2.5 rounded-md bg-surface hover:bg-surface-elevated border border-border-muted text-left text-xs text-text-secondary hover:text-text-primary transition-colors leading-normal"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Conversation thread */
          <div className="space-y-3 my-auto max-w-xl mx-auto w-full">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "fathom" && (
                  <div className="w-5 h-5 rounded-md bg-surface border border-border-muted flex items-center justify-center shrink-0 mt-0.5 text-text-muted">
                    <Bot className="w-3 h-3" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-md p-3 text-xs leading-normal ${
                    msg.sender === "user"
                      ? "bg-accent text-white"
                      : "bg-surface border border-border-muted text-text-primary space-y-2"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {msg.citations && msg.citations.length > 0 && (
                    <div className="pt-2 border-t border-border-subtle space-y-1">
                      {msg.citations.map((c, i) => (
                        <button
                          key={i}
                          onClick={() => onSeek(c.timestamp)}
                          className="flex items-center gap-1.5 text-[11px] font-mono text-text-secondary hover:text-text-primary"
                        >
                          <MessageSquare className="w-3 h-3 text-text-muted" />
                          <span>Jump to @{formatTime(c.timestamp)}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-1.5 items-center text-xs text-text-muted pl-8">
                <span>Synthesizing answer...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pinned Bottom Input Bar */}
      <div className="p-4 border-t border-border-subtle bg-surface">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(input);
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            placeholder="Ask about this meeting..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full pl-3.5 pr-10 py-2 bg-surface-elevated border border-border-muted rounded-md text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-1.5 w-6 h-6 rounded-md bg-accent hover:bg-accent-hover disabled:opacity-30 disabled:hover:bg-accent text-white flex items-center justify-center transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5 stroke-[2]" />
          </button>
        </form>
      </div>
    </div>
  );
}
