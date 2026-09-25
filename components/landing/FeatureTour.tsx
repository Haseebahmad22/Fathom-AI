"use client";

import React from "react";
import {
  FileText,
  ListTodo,
  Bot,
  Check,
  ArrowRight,
  Search,
} from "lucide-react";
import Link from "next/link";

export default function FeatureTour() {
  return (
    <section id="features" className="py-20 bg-app text-text-primary border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-6 space-y-24">
        {/* Section Intro */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-block text-xs font-medium text-text-secondary bg-surface-elevated border border-border-muted px-2.5 py-1 rounded-md">
            Product capabilities
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
            Everything you need for client delivery, without the admin drag
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary leading-normal">
            Designed for independent knowledge workers who would rather bill for high-impact consulting than spend evenings transcribing notes.
          </p>
        </div>

        {/* Feature 1: Automatic Transcription */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual */}
          <div className="lg:col-span-6 rounded-lg bg-surface border border-border-muted p-5 text-text-primary">
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-4">
              <span className="text-xs font-semibold text-text-primary">
                Live speaker transcript
              </span>
              <span className="text-[11px] font-mono text-text-muted">0:15 / 30:00</span>
            </div>

            <div className="space-y-3 font-sans">
              <div className="space-y-1">
                <span className="text-[11px] font-medium text-text-muted">
                  Alex (Host)
                </span>
                <div className="p-2.5 rounded-md bg-surface-elevated border border-border-subtle text-xs text-text-primary leading-normal">
                  "Let's review the milestones for the Q4 rebrand kickoff."
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-medium text-text-secondary">
                  Sarah (Client Lead)
                </span>
                <div className="p-2.5 rounded-md bg-surface-elevated border border-border-subtle text-xs text-text-secondary leading-normal">
                  "Our priority is finalizing the design tokens and tokenizing the mobile palette by the 15th."
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
              <FileText className="w-4 h-4 text-text-muted" />
              <span>Full-fidelity transcripts</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
              Capture every client nuance without typing a word
            </h3>
            <p className="text-xs sm:text-sm leading-normal text-text-secondary">
              Fanthom listens passively during Zoom, Google Meet, or Microsoft Teams sessions. Dialogue is organized by speaker and indexed with second-accurate timestamps so you never wonder what the client asked for.
            </p>
          </div>
        </div>

        {/* Feature 2: AI Summary + Action Items */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Copy */}
          <div className="lg:col-span-6 space-y-3 order-2 lg:order-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
              <ListTodo className="w-4 h-4 text-text-muted" />
              <span>Executive recaps & action items</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
              Turn an hour of conversation into five clear action items
            </h3>
            <p className="text-xs sm:text-sm leading-normal text-text-secondary">
              Within 30 seconds of hanging up, Fanthom synthesizes your call into concise bullet points and interactive checkboxes with owners and deadlines. Keep track of what you owe the client and what they owe you.
            </p>
          </div>

          {/* Visual */}
          <div className="lg:col-span-6 rounded-lg bg-surface border border-border-muted p-5 order-1 lg:order-2">
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-4">
              <span className="text-xs font-semibold text-text-primary">
                Extracted deliverables
              </span>
              <span className="text-[11px] font-mono text-text-muted">
                2 pending
              </span>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded-md bg-surface-elevated border border-border-subtle flex items-start gap-2.5">
                <div className="w-3.5 h-3.5 rounded-sm border border-border-strong bg-surface mt-0.5 shrink-0" />
                <div className="text-xs">
                  <p className="font-medium text-text-primary">
                    Share revised pricing proposal for 45 enterprise seats
                  </p>
                  <p className="text-[11px] font-mono text-text-muted mt-0.5">
                    Assignee: Alex • Due: Sep 26
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-md bg-surface-elevated border border-border-subtle flex items-start gap-2.5">
                <div className="w-3.5 h-3.5 rounded-sm bg-accent text-white flex items-center justify-center mt-0.5 shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                </div>
                <div className="text-xs">
                  <p className="font-normal text-text-muted line-through">
                    Send security audit questionnaire to legal
                  </p>
                  <p className="text-[11px] font-mono text-text-muted mt-0.5">Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3: Ask Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual */}
          <div className="lg:col-span-6 rounded-lg bg-surface border border-border-muted p-5 text-text-primary">
            <div className="flex items-center gap-2 pb-3 border-b border-border-subtle mb-4">
              <Bot className="w-4 h-4 text-text-muted" />
              <span className="text-xs font-semibold text-text-primary">
                Ask Fanthom across calls
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-end">
                <div className="p-2.5 rounded-md bg-surface-elevated border border-border-subtle text-text-primary font-medium max-w-[85%]">
                  "What discount rate did we agree on with Acme Corp?"
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-md bg-surface-elevated border border-border-muted flex items-center justify-center shrink-0 mt-0.5 text-xs text-text-secondary">
                  F
                </div>
                <div className="p-2.5 rounded-md bg-surface-elevated border border-border-subtle text-text-secondary max-w-[85%] space-y-1.5 leading-normal">
                  <p>
                    On your Sep 22 call, you agreed to an annual enterprise tier at $19/seat/mo for a 15-seat pilot before company-wide rollout.
                  </p>
                  <span className="block text-[11px] font-mono text-text-muted">
                    Source: Sales call with Acme Corp
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
              <Search className="w-4 h-4 text-text-muted" />
              <span>Cross-call intelligence</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
              Conversational search across your entire meeting history
            </h3>
            <p className="text-xs sm:text-sm leading-normal text-text-secondary">
              Powered by Google Gemini, Ask Fanthom answers questions about commitments, dates, pricing, and technical decisions made across months of client conversations — with exact source links back to the recording.
            </p>
          </div>
        </div>

        {/* Feature 4: Wedge Feature — Draft Follow-up Email */}
        <div className="rounded-lg bg-surface border border-border-strong p-6 sm:p-8 text-text-primary">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Copy */}
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-surface-elevated border border-border-muted text-xs font-medium text-text-secondary">
                <span>Core workflow</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                One-click follow-up emails, ready before you hang up
              </h3>

              <p className="text-xs sm:text-sm text-text-secondary leading-normal max-w-xl">
                Independent consultants win on responsiveness. Instead of spending 30 minutes retyping call notes into an email, Fanthom prepares a structured follow-up email covering agreements and next steps. Review and send immediately.
              </p>

              <div className="pt-2">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent hover:bg-accent-hover text-white font-medium text-xs transition-colors"
                >
                  <span>Try in demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Email Preview Card */}
            <div className="lg:col-span-5 rounded-md bg-surface-elevated border border-border-muted p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-border-subtle text-[11px] font-mono text-text-muted">
                <span>To: sjenkins@acmecorp.com</span>
                <span className="text-text-secondary font-sans font-medium">
                  Draft generated
                </span>
              </div>

              <div className="text-xs text-text-primary font-medium">
                Subject: Follow-up: Acme Corp Discovery & Next Steps
              </div>

              <div className="p-3 rounded-md bg-surface border border-border-subtle text-xs text-text-secondary leading-normal space-y-2">
                <p>Hi Sarah, thanks for taking the time to speak today.</p>
                <p className="text-text-primary">
                  • 15-seat sandbox pilot configured for sales pod<br />
                  • SOC 2 Type II compliance package attached
                </p>
                <p className="text-[11px] font-mono text-text-muted">
                  Best, Alex
                </p>
              </div>

              <button
                type="button"
                className="w-full py-1.5 rounded-md bg-accent hover:bg-accent-hover text-white font-medium text-center text-xs transition-colors"
              >
                Open in mail app
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
