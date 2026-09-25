"use client";

import React, { useState } from "react";
import {
  FileText,
  TrendingUp,
  Briefcase,
  Smile,
  UserCheck,
  Tv,
  Users,
  Compass,
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
    icon: FileText,
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
    desc: "Notes based on Sandler Selling System.",
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
    desc: "Notes based on the popular enterprise sales methodology.",
    icon: Briefcase,
  },
  {
    id: "customer-success",
    name: "Customer Success",
    desc: "Customer satisfaction, health signals, and onboarding status.",
    icon: Smile,
  },
  {
    id: "candidate",
    name: "Interview",
    desc: "Candidate qualifications, experience, and culture assessment.",
    icon: UserCheck,
  },
  {
    id: "demo",
    name: "Product Demo",
    desc: "Showcased journeys and customer reactions.",
    icon: Tv,
  },
  {
    id: "one-on-one",
    name: "One-on-One",
    desc: "Updates, priorities, and personal action items.",
    icon: Users,
  },
  {
    id: "kickoff",
    name: "Project Kick-Off",
    desc: "Vision, targets, timelines, and resourcing.",
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
    <div className="flex flex-col h-full bg-app text-text-primary overflow-y-auto p-6 space-y-6">
      {/* Generated AI Summary section */}
      <div className="bg-surface rounded-lg border border-border-muted p-5">
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-text-primary">
              Executive recap
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-text-muted bg-surface-elevated border border-border-subtle">
              Enhanced summary
            </span>
          </div>

          <button
            onClick={copySummaryText}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-elevated hover:bg-surface-active border border-border-muted text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-text-primary" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-text-muted" />
                <span>Copy summary</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-3">
          {summary.map((bullet) => (
            <div key={bullet.id} className="flex items-start gap-2.5">
              <span className="text-accent text-sm leading-none mt-1">•</span>
              <div className="text-xs leading-normal text-text-secondary">
                {bullet.category && (
                  <span className="font-medium text-text-primary mr-1.5">
                    {bullet.category}:
                  </span>
                )}
                <span>{bullet.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Select Template section */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-text-secondary">
          Summary template
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {TEMPLATES.map((tmpl) => {
            const Icon = tmpl.icon;
            const isSelected = selectedTemplate === tmpl.id;

            return (
              <button
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl.id)}
                className={`text-left p-3 rounded-md border transition-colors flex items-start gap-2.5 ${
                  isSelected
                    ? "bg-surface-elevated border-accent text-text-primary"
                    : "bg-surface border-border-muted hover:bg-surface-elevated text-text-secondary hover:text-text-primary"
                }`}
              >
                <div className="text-text-muted mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-xs font-medium truncate text-text-primary">
                      {tmpl.name}
                    </span>
                    {tmpl.isFree && (
                      <span className="text-[10px] font-mono text-text-muted">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] leading-normal text-text-muted line-clamp-2">
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
