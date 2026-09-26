"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ArrowUp,
  MessageSquare,
  Bot,
  Sparkles,
  Clock,
  CheckSquare,
  HelpCircle,
  Copy,
  Check,
  RotateCcw,
  Play,
  ShieldCheck,
} from "lucide-react";
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
  timestampStr?: string;
}

export default function AskFathomPanel({ meeting, onSeek }: AskFathomPanelProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const promptSuggestions = [
    {
      title: "Key Decisions",
      desc: "What were the primary decisions made?",
      icon: HelpCircle,
      prompt: "What were the key decisions and agreements reached in this call?",
    },
    {
      title: "Action Items & Owners",
      desc: "List all committed tasks and deadlines",
      icon: CheckSquare,
      prompt: "What action items and follow-ups were committed to and by whom?",
    },
    {
      title: "Timelines & Deadlines",
      desc: "Detail all milestone dates discussed",
      icon: Clock,
      prompt: "What timelines, milestones, or target deadlines were discussed?",
    },
    {
      title: "Customer Pains & Blockers",
      desc: "Unpack core objections and pain points",
      icon: Sparkles,
      prompt: "What were the primary pain points, challenges, and objections mentioned?",
    },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAsk = async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: trimmed,
      timestampStr: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Try calling the /api/ask route first
    let responseText = "";
    let citations: { quote: string; timestamp: number }[] = [];

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.answer) {
          responseText = data.answer;
        }
      }
    } catch {
      // Fall through to local synthesis
    }

    // Local synthesis fallback if API didn't return an answer
    if (!responseText) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const q = trimmed.toLowerCase();

      if (q.includes("decision") || q.includes("key") || q.includes("agree")) {
        const topH = meeting.highlights[0];
        responseText = `Based on the recording of "${meeting.title}", key decisions include:\n\n• **Core Alignment**: The team formally committed to the pilot rollout and validated key operational requirements.\n• **Security & Privacy**: Confirmed full compliance with SOC 2 Type II criteria and zero-retention third-party data processing.\n• **Execution Path**: Agreed to provision the sandbox workspace and schedule a follow-up review milestone.`;
        if (topH) {
          citations.push({ quote: topH.quoteText, timestamp: topH.timestampSeconds });
        }
      } else if (q.includes("action") || q.includes("task") || q.includes("todo") || q.includes("owner")) {
        const pendingItems = meeting.actionItems
          .map(
            (a) =>
              `• **${a.text}**\n  Assignee: ${a.assignee || "Unassigned"} · Due: ${a.dueDate || "TBD"} · Status: ${
                a.isDone ? "Completed" : "Pending"
              }`
          )
          .join("\n\n");
        responseText = `Here are the committed action items extracted from this call:\n\n${pendingItems}`;
        if (meeting.highlights[0]) {
          citations.push({ quote: meeting.highlights[0].quoteText, timestamp: meeting.highlights[0].timestampSeconds });
        }
      } else if (q.includes("timeline") || q.includes("date") || q.includes("when") || q.includes("deadline")) {
        responseText = `The following milestone schedule was established during the conversation:\n\n• **Immediate (Within 48h)**: Deliver technical compliance documentation and sandbox access credentials.\n• **14-Day Checkpoint**: Complete initial team pilot evaluation across active seats.\n• **Post-Pilot**: Executive contract finalization and enterprise rollout.`;
        if (meeting.highlights[1]) {
          citations.push({
            quote: meeting.highlights[1].quoteText,
            timestamp: meeting.highlights[1].timestampSeconds,
          });
        }
      } else if (q.includes("pain") || q.includes("objection") || q.includes("challenge") || q.includes("problem")) {
        const firstSummary = meeting.summary[0]?.text || "Manual documentation drag";
        responseText = `Primary friction points and challenges identified:\n\n• **Administrative Drag**: ${firstSummary}\n• **Tooling Friction**: Displaced prior legacy tools due to customer friction caused by visible meeting bots joining calls.\n• **Data Accuracy**: Inconsistent CRM note entry leading to poor pipeline visibility.`;
        if (meeting.highlights[0]) {
          citations.push({ quote: meeting.highlights[0].quoteText, timestamp: meeting.highlights[0].timestampSeconds });
        }
      } else if (q.includes("price") || q.includes("cost") || q.includes("budget") || q.includes("rate")) {
        responseText = `Commercial terms discussed for "${meeting.title}":\n\n• **Pricing Tier**: $19 per user per month billed annually on the Enterprise plan.\n• **Scope**: Includes bot-free capture, instant 30-second AI summaries, Ask Fathom search, and native CRM synchronization.\n• **Pilot Terms**: 14-day evaluation for 15 core team members prior to annual commitment.`;
      } else {
        const participantsStr = meeting.participants.map((p) => p.name).join(" and ");
        responseText = `In this call between ${participantsStr}, the primary discussion focused on "${meeting.title}".\n\nKey takeaways include:\n• ${
          meeting.summary[0]?.text || "Aligned on primary project deliverables and timelines."
        }\n• ${meeting.summary[1]?.text || "Addressed operational workflows and next steps."}`;
        if (meeting.highlights[0]) {
          citations.push({ quote: meeting.highlights[0].quoteText, timestamp: meeting.highlights[0].timestampSeconds });
        }
      }
    }

    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        sender: "fathom",
        text: responseText,
        citations,
        timestampStr: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setIsTyping(false);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-full flex flex-col bg-[#050608] text-white overflow-hidden select-none">
      {/* Top Header Bar Inside Panel - Compact */}
      <div className="h-10 border-b border-[#1A1D2E] bg-[#0A0C12] px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#00E5FF]/20 to-[#7C3AED]/20 border border-[#00E5FF]/30 flex items-center justify-center">
            <Sparkles className="w-2.5 h-2.5 text-[#00E5FF]" />
          </div>
          <span className="text-xs font-semibold text-white">Ask Fathom</span>
          <span className="text-[9px] text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/20 px-1.5 py-0.2 rounded-full font-medium">
            AI Assistant
          </span>
        </div>

        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium text-[#8E92A6] hover:text-white bg-[#12141D] hover:bg-[#1A1D2E] border border-[#1E2030] transition-colors cursor-pointer"
              title="Reset conversation"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Clear</span>
            </button>
          )}
          <span className="text-[10px] text-[#555869] font-mono hidden sm:inline">
            Grounded in call audio
          </span>
        </div>
      </div>

      {/* Messages Scroll Area - Constrained to comfortable reading width with Custom Scrollbar */}
      <div className="flex-1 overflow-y-auto px-4 py-4 custom-scrollbar">
        <div className="max-w-2xl lg:max-w-3xl mx-auto w-full flex flex-col justify-start min-h-full">
          {messages.length === 0 ? (
            /* Elegant Centered Empty State */
            <div className="my-auto py-4 flex flex-col items-center text-center">
              {/* Animated Glowing AI Orb */}
              <div className="relative mb-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#00E5FF]/20 via-[#7C3AED]/15 to-transparent border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#12141D] border border-[#00E5FF]/40 flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-[#00E5FF]" />
                </div>
              </div>

              <h3 className="text-sm font-semibold text-white tracking-tight">
                Ask anything about this call
              </h3>
              <p className="mt-1 text-xs text-[#8E92A6] max-w-sm leading-relaxed">
                Instant AI answers with timestamped video citations synthesized directly from this meeting with{" "}
                <span className="text-white font-medium">
                  {meeting.participants.map((p) => p.name).join(" and ")}
                </span>
                .
              </p>

              {/* 2x2 Grid of Polished Compact Prompt Suggestions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full mt-4">
                {promptSuggestions.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAsk(item.prompt)}
                      className="group p-2.5 rounded-lg bg-[#0A0C12] hover:bg-[#12141D] border border-[#1A1D2E] hover:border-[#00E5FF]/40 text-left transition-all duration-150 hover:shadow-md hover:shadow-[#00E5FF]/5 flex items-start gap-2.5 cursor-pointer"
                    >
                      <div className="p-1.5 rounded-md bg-[#12141D] group-hover:bg-[#00E5FF]/10 text-[#8E92A6] group-hover:text-[#00E5FF] transition-colors shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-white group-hover:text-[#00E5FF] transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-[#6B6F82] mt-0.5 leading-tight line-clamp-1">
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Active Conversation Thread */
            <div className="space-y-3.5 pb-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "fathom" && (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00E5FF]/20 to-[#7C3AED]/20 border border-[#00E5FF]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#00E5FF] shadow-sm">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed transition-all ${
                      msg.sender === "user"
                        ? "bg-[#161926] border border-[#262B3D] text-white rounded-tr-sm shadow-sm"
                        : "bg-[#0A0C12] border border-[#1A1D2E] text-[#D8DAE5] rounded-tl-sm shadow-md space-y-2.5"
                    }`}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed text-xs">
                      {msg.text}
                    </div>

                    {/* Citations Block */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="pt-2 border-t border-[#1A1D2E] space-y-1.5">
                        <div className="text-[9px] font-semibold text-[#8E92A6] uppercase tracking-wider flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-[#00E5FF]" />
                          <span>Video Citations ({msg.citations.length})</span>
                        </div>
                        {msg.citations.map((c, i) => (
                          <div
                            key={i}
                            className="p-2 rounded-md bg-[#12141D] border border-[#1E2030] flex flex-col gap-1"
                          >
                            <p className="text-[10px] text-[#A6A9B8] italic">
                              "{c.quote}"
                            </p>
                            <button
                              onClick={() => onSeek(c.timestamp)}
                              className="self-start inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/30 text-[9px] font-mono font-medium text-[#00E5FF] transition-all cursor-pointer"
                            >
                              <Play className="w-2 h-2 fill-current" />
                              <span>Jump to @{formatTime(c.timestamp)}</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Message Actions Footer */}
                    {msg.sender === "fathom" && (
                      <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[9px] text-[#555869]">
                        <span className="flex items-center gap-1">
                          <Check className="w-2.5 h-2.5 text-[#00E5FF]" /> Grounded in verbatim call audio
                        </span>
                        <button
                          onClick={() => handleCopyMessage(msg.id, msg.text)}
                          className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-[#12141D] hover:text-white transition-colors cursor-pointer"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-2.5 h-2.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-2.5 h-2.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Animation State */}
              {isTyping && (
                <div className="flex gap-2.5 items-center text-xs text-[#8E92A6] pl-1">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00E5FF]/20 to-[#7C3AED]/20 border border-[#00E5FF]/30 flex items-center justify-center shrink-0 text-[#00E5FF]">
                    <Bot className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-xl rounded-tl-sm bg-[#0A0C12] border border-[#1A1D2E] text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping" />
                    <span className="text-[#8E92A6] text-[11px]">
                      Synthesizing answer from transcript...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Floating Centered Input Bar Dock - Compact */}
      <div className="border-t border-[#1A1D2E] bg-[#0A0C12]/95 backdrop-blur-md px-4 py-2.5 shrink-0">
        <div className="max-w-2xl lg:max-w-3xl mx-auto w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(input);
            }}
            className="relative"
          >
            <div className="flex items-center bg-[#12141D] border border-[#1E2030] focus-within:border-[#00E5FF]/60 focus-within:shadow-[0_0_15px_rgba(0,229,255,0.1)] rounded-lg px-2.5 py-1.5 transition-all gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
              <input
                type="text"
                placeholder="Ask about decisions, timelines, action items..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder-[#555869] focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-6 h-6 rounded-md bg-[#00E5FF] hover:bg-[#38EDFF] disabled:opacity-20 disabled:hover:bg-[#00E5FF] text-[#050608] flex items-center justify-center transition-all shrink-0 cursor-pointer disabled:cursor-not-allowed shadow-sm shadow-[#00E5FF]/20"
                title="Send question"
              >
                <ArrowUp className="w-3 h-3 stroke-[2.5]" />
              </button>
            </div>
          </form>
          <div className="mt-1 flex items-center justify-between text-[9px] text-[#555869] px-1">
            <span>Press Enter ↵ to ask</span>
            <span className="font-mono">Fathom Intelligence Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
}
