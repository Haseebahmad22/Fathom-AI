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
  Sparkles,
  Layers,
} from "lucide-react";
import { SummaryBullet, Meeting } from "@/lib/mock-data";

interface SummaryViewProps {
  summary: SummaryBullet[];
  meeting?: Meeting;
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
    desc: "Capture any call's core insights, challenges, and executive takeaways.",
    icon: FileText,
  },
  {
    id: "sales",
    name: "Sales Discovery",
    desc: "Unpack a prospect's needs, budget, buying journey, and deal velocity.",
    icon: TrendingUp,
  },
  {
    id: "sales-sandler",
    name: "Sales - Sandler",
    desc: "Notes structured around the Sandler Selling System methodology.",
    icon: Briefcase,
  },
  {
    id: "sales-spiced",
    name: "Sales - SPICED",
    desc: "Notes based on Winning by Design (Situation, Pain, Impact, Critical Event, Decision).",
    icon: TrendingUp,
  },
  {
    id: "sales-meddpicc",
    name: "Sales - MEDDPICC",
    desc: "Enterprise qualification notes (Metrics, Economic Buyer, Decision Criteria & Process, Pain, Champion).",
    icon: Briefcase,
  },
  {
    id: "customer-success",
    name: "Customer Success",
    desc: "Customer satisfaction, health signals, blockers, and onboarding status.",
    icon: Smile,
  },
  {
    id: "candidate",
    name: "Interview Evaluation",
    desc: "Candidate technical qualifications, culture assessment, and hiring verdict.",
    icon: UserCheck,
  },
  {
    id: "demo",
    name: "Product Demo",
    desc: "Showcased user journeys, client reactions, and feature feedback.",
    icon: Tv,
  },
  {
    id: "one-on-one",
    name: "One-on-One Sync",
    desc: "Employee updates, priorities, roadblocks, and personal growth items.",
    icon: Users,
  },
  {
    id: "kickoff",
    name: "Project Kick-Off",
    desc: "Vision, deliverables, milestone schedules, and RACI resourcing.",
    icon: Compass,
  },
];

interface GeneratedBullet {
  category: string;
  text: string;
}

function getTemplateSummary(
  templateId: string,
  baseSummary: SummaryBullet[],
  meeting?: Meeting
): GeneratedBullet[] {
  const title = meeting?.title || "Meeting";
  const participants = meeting?.participants.map((p) => p.name).join(", ") || "Participants";
  const meetingId = meeting?.id;

  // 1. Enhanced (Default base recap)
  if (templateId === "enhanced") {
    if (baseSummary && baseSummary.length > 0) {
      return baseSummary.map((b) => ({
        category: b.category || "Key Takeaway",
        text: b.text,
      }));
    }
    return [
      {
        category: "Executive Summary",
        text: `Discussion focused on core operational objectives for "${title}" with ${participants}.`,
      },
      {
        category: "Primary Decisions",
        text: "The team agreed on actionable deliverables and confirmed execution timelines.",
      },
      {
        category: "Next Steps",
        text: "Follow-up items assigned and scheduled for review at next checkpoint.",
      },
    ];
  }

  // 2. Sales Discovery
  if (templateId === "sales") {
    if (meetingId === "meeting-1") {
      return [
        {
          category: "Prospect Needs & Pain",
          text: "Acme Corp's 45-person team is losing ~180 total hours weekly manually reconstructing customer call notes across Notion and HubSpot.",
        },
        {
          category: "Budget & Commercials",
          text: "Enterprise tier confirmed at $19/seat/month; 14-day team pilot approved for 15 sales reps before annual commitment.",
        },
        {
          category: "Buying Journey & Stakeholders",
          text: "Sarah Jenkins (VP Ops) is driving the evaluation; final approval requires CISO/legal review of SOC 2 Type II compliance.",
        },
        {
          category: "Competitive Displacements",
          text: "Displaced Otter.ai and Fireflies due to customer friction caused by visible meeting bot avatars entering customer calls.",
        },
        {
          category: "Recommended Next Steps",
          text: "Deliver sandbox workspace access and SOC 2 Type II audit documentation by Sept 23rd.",
        },
      ];
    }
    return [
      {
        category: "Identified Needs",
        text: `Identified primary bottlenecks and workflow friction in current processes for "${title}".`,
      },
      {
        category: "Budget & Investment",
        text: "Prospect is actively assessing ROI and willingness to allocate departmental budget for tooling automation.",
      },
      {
        category: "Buying Committee",
        text: `Key stakeholders involved include ${participants}, with security and operations holding veto power.`,
      },
      {
        category: "Urgency & Timing",
        text: "Targeting pilot deployment within next 2 weeks to validate productivity gains before quarter-end.",
      },
    ];
  }

  // 3. Sales - Sandler
  if (templateId === "sales-sandler") {
    if (meetingId === "meeting-1") {
      return [
        {
          category: "Bonding & Rapport",
          text: "Established strong mutual trust around common frustration with CRM manual data entry drag on rep quota attainment.",
        },
        {
          category: "Up-Front Contract (UFC)",
          text: "Agreed meeting objective: evaluate zero-bot loopback capture architecture and determine if pilot criteria are met without high-pressure sales.",
        },
        {
          category: "Emotional & Financial Pain",
          text: "Sarah admitted feeling exasperated that reps spend 20 minutes post-call re-documenting notes rather than prospecting new pipeline.",
        },
        {
          category: "Budget Step",
          text: "Acme loses >$180k annually in rep time drag; $19/seat/mo represents an immediate positive 8x payback equation.",
        },
        {
          category: "Decision Process",
          text: "Three-phase decision: 15-seat sandbox test -> CISO security clearance -> Executive VP contract sign-off.",
        },
        {
          category: "Post-Sell Commitments",
          text: "Addressed latency and privacy concerns directly: Fanthom generates notes under 30s with zero LLM model retention training.",
        },
      ];
    }
    return [
      {
        category: "Up-Front Contract",
        text: "Parties agreed on open exploration of mutual fit, with clear permission to decline if criteria are unmet.",
      },
      {
        category: "Uncovered Pain",
        text: `Identified underlying frustration in ${title} caused by inefficient legacy workflows and lack of automated insights.`,
      },
      {
        category: "Budget Willingness",
        text: "Confirmed willingness to invest in commercial solution provided measurable time savings can be demonstrated.",
      },
      {
        category: "Decision Process",
        text: `Decision involves ${participants} evaluating trial feedback against defined internal benchmarks.`,
      },
    ];
  }

  // 4. Sales - SPICED
  if (templateId === "sales-spiced") {
    if (meetingId === "meeting-1") {
      return [
        {
          category: "Situation (S)",
          text: "Acme Corp has 45 reps taking shorthand notes on pen & paper and Google Docs, manually transcribing them into HubSpot.",
        },
        {
          category: "Pain (P)",
          text: "Critical meeting context is lost in handoffs; weekly sales forecasts suffer from inaccurate CRM data entry.",
        },
        {
          category: "Impact (I)",
          text: "180+ hours of high-value selling time wasted every week across ops and sales, costing thousands in lost pipeline momentum.",
        },
        {
          category: "Critical Event (C)",
          text: "Upcoming Q4 revenue planning kickoff requiring dependable pipeline forecasting and CRM hygiene across the sales pod.",
        },
        {
          category: "Decision (D)",
          text: "Champion: Sarah Jenkins. Decision Criteria: 100% bot-free recording, SOC 2 Type II audit, and native CRM synchronization.",
        },
      ];
    }
    return [
      {
        category: "Situation (S)",
        text: `Current state involves manual documentation and fragmented communication around ${title}.`,
      },
      {
        category: "Pain (P)",
        text: "Lack of automated synthesis leads to forgotten commitments and misaligned priorities.",
      },
      {
        category: "Impact (I)",
        text: "Cumulative delay in team deliverables and reduced operational throughput across project cycles.",
      },
      {
        category: "Critical Event (C)",
        text: "Target implementation deadline established to support upcoming milestone reviews.",
      },
      {
        category: "Decision (D)",
        text: `Evaluation criteria finalized by ${participants} based on reliability, ease of adoption, and security.`,
      },
    ];
  }

  // 5. Sales - MEDDPICC
  if (templateId === "sales-meddpicc") {
    if (meetingId === "meeting-1") {
      return [
        {
          category: "Metrics (M)",
          text: "Eliminate 4 hours of note drag per rep weekly; achieve 100% CRM call logging compliance within 30 days of rollout.",
        },
        {
          category: "Economic Buyer (EB)",
          text: "Sarah Jenkins, VP Operations (holding direct discretionary tooling budget for Acme Corp sales division).",
        },
        {
          category: "Decision Criteria (DC)",
          text: "1) Completely passive bot-free capture, 2) SOC 2 Type II compliance, 3) <30 second post-call latency, 4) Under $20/seat/mo.",
        },
        {
          category: "Decision Process (DP)",
          text: "14-day 15-rep pilot validation -> CISO DPA & SOC 2 review -> Final vendor contract sign-off.",
        },
        {
          category: "Identify Pain (IP)",
          text: "Prospect friction from intrusive bots and lost deal notes leading to pipeline inaccuracies.",
        },
        {
          category: "Champion (C)",
          text: "Sarah Jenkins actively driving internal adoption to resolve her team's administrative burden.",
        },
        {
          category: "Competition (CO)",
          text: "Evaluated and rejected Otter and Fireflies; primary incumbent competitor is status-quo manual typing.",
        },
      ];
    }
    return [
      {
        category: "Metrics (M)",
        text: "Quantifiable goals established: target 25%+ efficiency improvement in meeting follow-ups and documentation.",
      },
      {
        category: "Economic Buyer (EB)",
        text: "Identified primary budget owner with sign-off authority for departmental tooling expansion.",
      },
      {
        category: "Decision Criteria (DC)",
        text: "Evaluation based on zero intrusive bots, enterprise-grade data security, and sub-minute summary turnaround.",
      },
      {
        category: "Identify Pain (IP)",
        text: `Critical business problem articulated around ${title} requiring automated workflow modernizations.`,
      },
      {
        category: "Champion (C)",
        text: `Key advocates within ${participants} actively supporting the transition to automated meeting intelligence.`,
      },
    ];
  }

  // 6. Customer Success
  if (templateId === "customer-success") {
    if (meetingId === "meeting-1") {
      return [
        {
          category: "Account Health & Sentiment",
          text: "Champion sentiment is exceptionally positive; highly motivated to eliminate administrative note overhead.",
        },
        {
          category: "Key Adoption Drivers",
          text: "Zero-bot capture architecture is the single strongest driver for stakeholder enthusiasm.",
        },
        {
          category: "Security & Compliance Gate",
          text: "Compliance council requires signed DPA and SOC 2 Type II documentation prior to production rollout.",
        },
        {
          category: "Onboarding Roadmap",
          text: "15 pilot seats to be provisioned Sept 26; onboarding training webinar scheduled for sales pod leads.",
        },
        {
          category: "Expansion Potential",
          text: "Initial 15 seats have clear expansion runway to 45 seats across full ops and sales division upon successful pilot.",
        },
      ];
    }
    return [
      {
        category: "Account Health",
        text: `Stakeholder sentiment in "${title}" is strongly engaged with active commitment to project milestones.`,
      },
      {
        category: "Adoption & Usage",
        text: "Confirmed standard workflows and established best practices for daily operational usage.",
      },
      {
        category: "Open Blockers",
        text: "Identified pending integrations and data access permissions needed before full team onboarding.",
      },
      {
        category: "Next Check-in",
        text: "Scheduled recurring 14-day pulse check to monitor adoption metrics and user feedback.",
      },
    ];
  }

  // 7. Candidate Interview Evaluation
  if (templateId === "candidate") {
    return [
      {
        category: "Domain Expertise & Background",
        text: `Candidate demonstrated deep operational grasp of problem spaces and cross-functional leadership in "${title}".`,
      },
      {
        category: "System Thinking & Methodology",
        text: "Articulated clear frameworks for reducing operational drag and enforcing data accuracy across team pipelines.",
      },
      {
        category: "Communication & Clarity",
        text: "Concise, structured responses with excellent executive presence and transparent risk identification.",
      },
      {
        category: "Culture & Values Alignment",
        text: "Strong focus on team empowerment, security-first architecture, and pragmatic automation.",
      },
      {
        category: "Hiring Recommendation",
        text: "Strong Recommend: Proceed to final executive loop and reference verification phase.",
      },
    ];
  }

  // 8. Product Demo
  if (templateId === "demo") {
    return [
      {
        category: "Features Showcased",
        text: "Demonstrated bot-free system audio loopback capture, 30-second automated AI summaries, and timestamped transcript search.",
      },
      {
        category: "Prospect 'Wow' Moments",
        text: "Attendees were visibly impressed by eliminating intrusive participant bots and the speed of recap generation.",
      },
      {
        category: "Questions & Clarifications",
        text: "Inquiries centered on SOC 2 Type II compliance, zero model training retention policies, and CRM sync triggers.",
      },
      {
        category: "Follow-Up Deliverables",
        text: "Deliver sandbox access credentials and full security package for technical evaluation.",
      },
    ];
  }

  // 9. One-on-One Sync
  if (templateId === "one-on-one") {
    return [
      {
        category: "Top Priorities & Wins",
        text: `Reviewed recent achievements and progress against quarterly milestones discussed in "${title}".`,
      },
      {
        category: "Roadblocks & Escalations",
        text: "Discussed operational friction points and agreed on escalation channels to unblock dependencies.",
      },
      {
        category: "Team Dynamics & Morale",
        text: "Energy and morale are positive; team is energized around upcoming workflow automation initiatives.",
      },
      {
        category: "Personal Growth & Direct Actions",
        text: "Aligned on ownership of upcoming pilot deliverables and personal leadership goals for the quarter.",
      },
    ];
  }

  // 10. Project Kick-Off
  if (templateId === "kickoff") {
    return [
      {
        category: "Project Vision & Objectives",
        text: `Formally aligned on mission charter and core deliverable scope for "${title}".`,
      },
      {
        category: "Roles & RACI Matrix",
        text: `Core responsibilities defined across ${participants}, establishing clear ownership of each workstream.`,
      },
      {
        category: "Milestone Timelines",
        text: "Target deployment dates locked; initial pilot checkpoints set at 7-day and 14-day intervals.",
      },
      {
        category: "Dependencies & Risks",
        text: "Mitigation plan established for third-party security approval and workspace credential provisioning.",
      },
    ];
  }

  return baseSummary.map((b) => ({ category: b.category || "Insight", text: b.text }));
}

export default function SummaryView({ summary, meeting }: SummaryViewProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("enhanced");
  const [copied, setCopied] = useState<boolean>(false);
  const [feedbackFlash, setFeedbackFlash] = useState<boolean>(false);
  const [customNotes, setCustomNotes] = useState<{ [templateId: string]: GeneratedBullet[] }>({});
  const [isAddingNote, setIsAddingNote] = useState<boolean>(false);
  const [newNoteCategory, setNewNoteCategory] = useState<string>("Key Takeaway");
  const [newNoteText, setNewNoteText] = useState<string>("");

  // Compute the dynamic summary based on the active template
  const templateBullets = getTemplateSummary(selectedTemplate, summary, meeting);
  const activeCustom = customNotes[selectedTemplate] || [];
  const activeBullets = [...templateBullets, ...activeCustom];

  const activeTemplateObj =
    TEMPLATES.find((t) => t.id === selectedTemplate) || TEMPLATES[0];

  const handleSelectTemplate = (templateId: string) => {
    if (templateId === selectedTemplate) return;
    setSelectedTemplate(templateId);
    setFeedbackFlash(true);
    setTimeout(() => setFeedbackFlash(false), 800);
  };

  const copySummaryText = () => {
    const fullText = activeBullets
      .map((s) => `• [${s.category}] ${s.text}`)
      .join("\n\n");
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddCustomNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newBullet: GeneratedBullet = {
      category: newNoteCategory.trim() || "Note",
      text: newNoteText.trim(),
    };

    setCustomNotes((prev) => ({
      ...prev,
      [selectedTemplate]: [...(prev[selectedTemplate] || []), newBullet],
    }));

    setNewNoteText("");
    setIsAddingNote(false);
  };

  const handleRemoveCustomNote = (index: number) => {
    setCustomNotes((prev) => {
      const current = [...(prev[selectedTemplate] || [])];
      current.splice(index, 1);
      return {
        ...prev,
        [selectedTemplate]: current,
      };
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#050608] text-white overflow-y-auto p-4 lg:p-5 space-y-4 custom-scrollbar">
      {/* Generated AI Summary section - Updates dynamically upon clicking templates */}
      <div
        className={`bg-[#0A0C12] rounded-xl border transition-all duration-300 p-4 ${
          feedbackFlash
            ? "border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.2)]"
            : "border-[#1A1D2E]"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-[#1A1D2E] mb-3.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">
              {activeTemplateObj.name} Summary
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#00E5FF]" />
              AI Synthesized
            </span>
            <span className="text-[11px] text-[#555869]">
              ({activeBullets.length} points)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copySummaryText}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#12141D] hover:bg-[#1C1E2A] border border-[#1E2030] hover:border-[#353950] text-xs font-medium text-[#8E92A6] hover:text-white transition-all shadow-sm cursor-pointer"
              title="Copy active summary to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy summary</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Bullet Points for Selected Template */}
        <div
          key={selectedTemplate}
          className="space-y-2.5 animate-in fade-in-50 duration-200"
        >
          {activeBullets.map((bullet, idx) => {
            const isCustom = idx >= templateBullets.length;
            const customIdx = idx - templateBullets.length;

            return (
              <div key={idx} className="flex items-start gap-2.5 group relative">
                <span className={`text-sm leading-none mt-1 shrink-0 group-hover:scale-125 transition-transform ${isCustom ? "text-purple-400" : "text-[#00E5FF]"}`}>
                  •
                </span>
                <div className="text-xs leading-relaxed text-[#C5C8D8] flex-1">
                  {bullet.category && (
                    <span className="font-semibold text-white mr-1.5">
                      {bullet.category}:
                    </span>
                  )}
                  <span>{bullet.text}</span>
                  {isCustom && (
                    <span className="ml-2 text-[9px] font-bold text-purple-400 bg-purple-950/40 border border-purple-800/40 px-1 py-0.2 rounded">
                      Custom Note
                    </span>
                  )}
                </div>

                {isCustom && (
                  <button
                    onClick={() => handleRemoveCustomNote(customIdx)}
                    className="opacity-0 group-hover:opacity-100 text-[#555869] hover:text-rose-400 transition-opacity p-0.5 cursor-pointer"
                    title="Remove note"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Inline Add Custom Note Form */}
        <div className="mt-3 pt-3 border-t border-[#1A1D2E]">
          {isAddingNote ? (
            <form onSubmit={handleAddCustomNote} className="space-y-2 p-2.5 rounded-lg bg-[#0E111A] border border-[#25283D] animate-in fade-in">
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Category (e.g. Next Step, Risk)"
                  value={newNoteCategory}
                  onChange={(e) => setNewNoteCategory(e.target.value)}
                  className="px-2.5 py-1.5 bg-[#12141D] border border-[#1E2030] rounded-lg text-xs text-white placeholder-[#555869] focus:outline-none focus:border-[#00E5FF]/40"
                />
                <input
                  type="text"
                  placeholder="Enter custom takeaway or observation..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  autoFocus
                  className="col-span-2 px-2.5 py-1.5 bg-[#12141D] border border-[#00E5FF]/40 rounded-lg text-xs text-white placeholder-[#555869] focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-end gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsAddingNote(false)}
                  className="px-2 py-1 rounded text-[10px] text-[#8E92A6] hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newNoteText.trim()}
                  className="px-2.5 py-1 rounded bg-[#00E5FF] text-[#050608] font-semibold text-[10px] hover:bg-[#38EDFF] disabled:opacity-30 cursor-pointer"
                >
                  Add Takeaway
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsAddingNote(true)}
              className="text-[11px] font-medium text-[#8E92A6] hover:text-[#00E5FF] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>+ Add custom takeaway note</span>
            </button>
          )}
        </div>
      </div>

      {/* Select Template section - Compact 2-column or 3-column Grid */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-semibold text-[#8E92A6] uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-[#00E5FF]" />
            <span>Switch Template ({TEMPLATES.length} Formats)</span>
          </div>
          <span className="text-[10px] text-[#555869]">
            Click format to regenerate summary above
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2">
          {TEMPLATES.map((tmpl) => {
            const Icon = tmpl.icon;
            const isSelected = selectedTemplate === tmpl.id;

            return (
              <button
                key={tmpl.id}
                onClick={() => handleSelectTemplate(tmpl.id)}
                className={`text-left p-2.5 rounded-lg border transition-all duration-150 flex items-start gap-2.5 cursor-pointer ${
                  isSelected
                    ? "bg-[#12141D] border-[#00E5FF] text-white shadow-md shadow-[#00E5FF]/15 ring-1 ring-[#00E5FF]/30"
                    : "bg-[#0A0C12] border-[#1A1D2E] hover:bg-[#12141D] hover:border-[#353950] text-[#8E92A6] hover:text-white"
                }`}
              >
                <div
                  className={`mt-0.5 p-1.5 rounded-md shrink-0 ${
                    isSelected
                      ? "bg-[#00E5FF]/10 text-[#00E5FF]"
                      : "bg-[#12141D] text-[#555869]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className={`text-[11px] font-semibold truncate ${isSelected ? "text-white" : "text-[#C5C8D8]"}`}>
                      {tmpl.name}
                    </span>
                    {isSelected ? (
                      <span className="text-[9px] font-bold text-[#00E5FF] bg-[#00E5FF]/15 px-1.5 py-0.2 rounded-full border border-[#00E5FF]/30 flex items-center gap-0.5">
                        <Check className="w-2 h-2" /> Active
                      </span>
                    ) : tmpl.isFree ? (
                      <span className="text-[9px] font-medium text-[#555869]">
                        Default
                      </span>
                    ) : null}
                  </div>
                  <p className="text-[10px] leading-tight text-[#6B6F82] line-clamp-1">
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
