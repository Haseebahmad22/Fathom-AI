"use client";

import React, { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  Briefcase,
  Smile,
  UserCheck,
  Tv,
  Users,
  Compass,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";
import { SummaryBullet } from "@/lib/mock-data";

interface SummaryViewProps {
  summary: SummaryBullet[];
}

interface TemplateOption {
  id: string;
  name: string;
  isFree?: boolean;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TEMPLATES: TemplateOption[] = [
  {
    id: "enhanced",
    name: "Enhanced",
    isFree: true,
    desc: "Capture any call's insights and key takeaways.",
    icon: Sparkles,
  },
  {
    id: "sales",
    name: "Sales",
    desc: "Unpack a prospect's needs, challenges, and buying journey.",
    icon: TrendingUp,
  },
  {
    id: "sales-sandler",
    name: "Sales - Sandler",
    desc: "Notes based on Sandler Selling System",
    icon: Briefcase,
  },
  {
    id: "sales-spiced",
    name: "Sales - SPICED",
    desc: "Notes based on the sales methodology by Winning by Design.",
    icon: TrendingUp,
  },
  {
    id: "sales-meddpicc",
    name: "Sales - MEDDPICC",
    desc: "Notes based on the popular sales methodology.",
    icon: TrendingUp,
  },
  {
    id: "sales-bant",
    name: "Sales - BANT",
    desc: "Notes based on the popular sales methodology.",
    icon: TrendingUp,
  },
  {
    id: "cs",
    name: "Customer Success",
    desc: "Experiences, challenges, goals, and Q&A.",
    icon: Smile,
  },
  {
    id: "cs-reach",
    name: "Customer Success - REACH™",
    desc: "Notes based on an expansion framework by HelloCCO",
    icon: Smile,
  },
  {
    id: "interview",
    name: "Candidate Interview",
    desc: "Delve into a candidate's experience, goals, and responses.",
    icon: UserCheck,
  },
  {
    id: "demo",
    name: "Demo",
    desc: "Showcased journeys and impact.",
    icon: Tv,
  },
  {
    id: "one-on-one",
    name: "One-on-One",
    desc: "Updates, priorities, support signals, and discussion.",
    icon: Users,
  },
  {
    id: "kickoff",
    name: "Project Kick-Off",
    desc: "Vision, targets, and resources.",
    icon: Compass,
  },
];

export default function SummaryView({ summary }: SummaryViewProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("enhanced");
  const [copied, setCopied] = useState<boolean>(false);

  const copySummaryText = () => {
    const fullText = summary
      .map((s) => `• [${s.category || "Recap"}] ${s.text}`)
      .join("\n\n");
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0E0F1A] text-white overflow-y-auto p-6 space-y-8">
      {/* Generated AI Summary section */}
      <div className="bg-[#141625] rounded-xl border border-[#24273E] p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00A3FF]" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Generated Recap
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Enhanced AI
            </span>
          </div>

          <button
            onClick={copySummaryText}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1B1E33] hover:bg-[#232742] border border-[#2F3350] text-xs font-medium text-white/80 hover:text-white transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-4">
          {summary.map((bullet) => (
            <div key={bullet.id} className="flex items-start gap-3 group">
              <CheckCircle2 className="w-4 h-4 text-[#00A3FF] shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-white/90">
                {bullet.category && (
                  <span className="font-semibold text-white/95 mr-2">
                    {bullet.category}:
                  </span>
                )}
                <span>{bullet.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Select Template grid (Screenshot 1) */}
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-3">
          Select Template
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {TEMPLATES.map((tmpl) => {
            const Icon = tmpl.icon;
            const isSelected = selectedTemplate === tmpl.id;

            return (
              <button
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl.id)}
                className={`text-left p-3 rounded-lg border transition-all duration-150 flex items-start gap-3 group ${
                  isSelected
                    ? "bg-[#181C2E] border-[#00A3FF] shadow-sm shadow-[#00A3FF]/20"
                    : "bg-[#141625] border-[#22253B] hover:bg-[#1A1D30] hover:border-[#2F3352]"
                }`}
              >
                <div
                  className={`p-1.5 rounded-md ${
                    isSelected
                      ? "bg-[#00A3FF]/20 text-[#00A3FF]"
                      : "bg-white/5 text-white/50 group-hover:text-white/80"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span
                      className={`text-xs font-semibold truncate ${
                        isSelected ? "text-white" : "text-white/90"
                      }`}
                    >
                      {tmpl.name}
                    </span>
                    {tmpl.isFree && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 tracking-wider">
                        FREE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] leading-snug text-white/50 line-clamp-2">
                    {tmpl.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
