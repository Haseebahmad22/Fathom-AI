"use client";

import React, { useState } from "react";
import { ArrowUp, Sparkles, MessageSquare, Bot } from "lucide-react";
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
    "What was surprising in this meeting?",
    "Detail all timelines discussed",
    "What would help make progress?",
    "Who else should we speak to?",
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

    // Simulate intelligent contextual response based on the meeting data
    setTimeout(() => {
      let responseText = "";
      let citations: { quote: string; timestamp: number }[] = [];

      const q = query.toLowerCase();
      if (q.includes("surprising") || q.includes("key")) {
        const topH = meeting.highlights[0];
        responseText = `One key takeaway was that attendees strongly preferred bot-free recording to eliminate friction. As stated: "${
          topH?.quoteText || "Bot-free capture provides seamless meetings without friction."
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
      } else if (q.includes("progress") || q.includes("action") || q.includes("next")) {
        const pendingItems = meeting.actionItems
          .map((a) => `• ${a.text} (${a.assignee || "Unassigned"}, Due: ${a.dueDate || "TBD"})`)
          .join("\n");
        responseText = `Here are the top concrete action items needed to drive progress:\n\n${pendingItems}`;
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
    }, 700);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col h-full bg-[#0E0F1A] text-white">
      {/* Messages area or Initial empty state */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-center">
        {messages.length === 0 ? (
          /* Empty / Welcome state matching Screenshot 3 */
          <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-6">
            {/* Glowing Fathom logo circle */}
            <div className="w-14 h-14 rounded-full bg-[#181C2E] border border-[#2A2E4A] flex items-center justify-center shadow-lg shadow-[#00A3FF]/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00A3FF] to-[#4E46DC] flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>

            <h3 className="text-base font-bold text-white tracking-tight">
              Hi, what can I tell you about this meeting?
            </h3>

            {/* 2x2 grid of prompt suggestions */}
            <div className="grid grid-cols-2 gap-2.5 w-full">
              {promptSuggestions.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAsk(prompt)}
                  className="p-3 rounded-xl bg-[#141625] hover:bg-[#1C1F33] border border-[#24273E] hover:border-[#383C5E] text-left text-xs text-white/80 hover:text-white transition-all duration-150 leading-snug"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Conversation thread */
          <div className="space-y-4 my-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "fathom" && (
                  <div className="w-7 h-7 rounded-full bg-[#00A3FF]/20 border border-[#00A3FF]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-[#00A3FF]" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#00A3FF] text-white font-medium rounded-tr-sm"
                      : "bg-[#141625] border border-[#24273E] text-white/90 rounded-tl-sm space-y-2.5"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {msg.citations && msg.citations.length > 0 && (
                    <div className="pt-2 border-t border-white/10 space-y-1.5">
                      {msg.citations.map((c, i) => (
                        <button
                          key={i}
                          onClick={() => onSeek(c.timestamp)}
                          className="flex items-center gap-1.5 text-[11px] text-[#00A3FF] hover:underline"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>Jump to @{formatTime(c.timestamp)}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-white/50 pl-10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-[11px]">Thinking...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pinned Bottom Input Bar */}
      <div className="p-4 border-t border-[#1A1C2E] bg-[#0A0B14]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(input);
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            placeholder="Ask Fathom AI"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full pl-4 pr-12 py-3 bg-[#141625] border border-[#262940] rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#00A3FF] transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2.5 p-2 rounded-lg bg-[#00A3FF] hover:bg-[#0092E6] disabled:opacity-30 disabled:hover:bg-[#00A3FF] text-white transition-all shadow-sm"
          >
            <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </form>
      </div>
    </div>
  );
}
