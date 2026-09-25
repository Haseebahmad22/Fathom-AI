"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Play, Bookmark, Check } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-app text-text-primary pt-16 pb-20 border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface-elevated border border-border-muted text-xs font-medium text-text-secondary mb-6">
          <span>The AI notetaker built for independent operators</span>
        </div>

        {/* Selected Hero Headline */}
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary max-w-3xl leading-tight">
          Stay present in client calls. Let AI run the follow-up.
        </h1>

        {/* Sub-headline */}
        <p className="mt-4 text-sm sm:text-base text-text-secondary max-w-xl leading-normal">
          Automatic call transcription, instant recaps, and structured client follow-up emails — so you can stop taking notes and start executing.
        </p>

        {/* Primary CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-accent hover:bg-accent-hover text-white text-xs font-medium transition-colors"
          >
            <span>Get started free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-transparent hover:bg-surface-elevated border border-border-muted text-text-primary text-xs font-medium transition-colors"
          >
            <span>View live demo</span>
          </Link>
        </div>

        {/* Trust Row */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-text-muted">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-text-secondary" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-text-secondary" />
            <span>Works with Zoom, Meet & Teams</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-text-secondary" />
            <span>Free forever for individuals</span>
          </div>
        </div>

        {/* Utilitarian Mock Interface Card */}
        <div className="mt-12 w-full max-w-4xl rounded-lg bg-surface border border-border-muted overflow-hidden text-left">
          {/* Mock Window Header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-subtle bg-surface-elevated">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-border-strong" />
              <span className="w-2.5 h-2.5 rounded-full bg-border-strong" />
              <span className="w-2.5 h-2.5 rounded-full bg-border-strong" />
              <span className="ml-2 text-[11px] font-mono text-text-muted">
                fathom.video/recording/client-sync
              </span>
            </div>
            <span className="text-[11px] font-medium text-text-secondary bg-surface px-2 py-0.5 rounded-md border border-border-subtle">
              Processed in 28s
            </span>
          </div>

          {/* Two-Column Mock Product Interface */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 divide-y md:divide-y-0 md:divide-x divide-border-subtle min-h-[340px]">
            {/* Left Column: Video Mockup + Transcript */}
            <div className="md:col-span-7 p-4 flex flex-col gap-3">
              {/* Mini Video Strip */}
              <div className="relative aspect-[16/8] rounded-md bg-app border border-border-subtle p-2 flex items-center justify-center overflow-hidden">
                <div className="grid grid-cols-2 gap-2 w-full h-full">
                  <div className="rounded-md bg-surface border border-border-muted flex items-center justify-center text-xs font-medium text-text-secondary">
                    You (Host)
                  </div>
                  <div className="rounded-md bg-surface border border-border-muted flex items-center justify-center text-xs font-medium text-text-secondary">
                    Sarah (Client)
                  </div>
                </div>
                <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-[10px] bg-app/90 border border-border-subtle px-2 py-0.5 rounded-md text-text-secondary font-mono">
                  <Play className="w-3 h-3 text-text-primary fill-current" />
                  <span>0:14 / 28:40</span>
                </div>
              </div>

              {/* Mock Chat Transcript */}
              <div className="flex-1 rounded-md bg-surface-elevated border border-border-subtle p-3 space-y-2">
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span className="font-medium text-text-primary">
                    Sarah Jenkins
                  </span>
                  <span className="font-mono text-[11px]">0:28</span>
                </div>
                <div className="p-2.5 rounded-md bg-surface border border-border-subtle text-xs text-text-secondary leading-normal">
                  "We want to start with a 15-seat pilot before signing the full annual enterprise agreement. Can you send the onboarding summary by tomorrow?"
                </div>

                <div className="py-1.5 px-2.5 rounded-md bg-surface border border-border-subtle flex items-center gap-2 text-xs">
                  <Bookmark className="w-3 h-3 text-text-muted" />
                  <span className="font-medium text-text-primary">Key commitment:</span>
                  <span className="text-text-secondary truncate">
                    Deliver pilot onboarding summary by Friday 5 PM
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: AI Action Items & One-Click Follow-up */}
            <div className="md:col-span-5 p-4 flex flex-col justify-between bg-surface">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-border-subtle">
                  <span className="text-xs font-semibold text-text-primary">
                    Action items
                  </span>
                  <span className="text-[11px] font-mono text-text-muted">
                    1 of 2 done
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-md bg-surface-elevated border border-border-subtle flex items-start gap-2">
                    <div className="w-3.5 h-3.5 rounded-sm border border-border-strong bg-surface mt-0.5 shrink-0" />
                    <span className="text-text-primary text-xs leading-normal">
                      Send SOC 2 report and pilot access link
                    </span>
                  </div>

                  <div className="p-2 rounded-md bg-surface-elevated border border-border-subtle flex items-start gap-2">
                    <div className="w-3.5 h-3.5 rounded-sm bg-accent text-white flex items-center justify-center mt-0.5 shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                    </div>
                    <span className="text-text-muted line-through text-xs leading-normal">
                      Review scope requirements in Notion
                    </span>
                  </div>
                </div>
              </div>

              {/* Hero Action: Draft Follow-up Email */}
              <div className="mt-4 pt-3 border-t border-border-subtle">
                <div className="p-3 rounded-md bg-surface-elevated border border-border-muted space-y-2">
                  <div className="text-xs font-semibold text-text-primary">
                    Draft follow-up email
                  </div>
                  <p className="text-xs text-text-secondary leading-normal">
                    Email draft generated from call decisions and ready to review.
                  </p>
                  <button
                    type="button"
                    className="w-full py-1.5 rounded-md bg-accent hover:bg-accent-hover text-white text-xs font-medium transition-colors"
                  >
                    Open follow-up draft
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
