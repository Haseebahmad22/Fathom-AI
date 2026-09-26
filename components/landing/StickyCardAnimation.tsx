"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Play, Sparkles, User, Users, Info } from "lucide-react";

interface StepData {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  description: string;
  buttonBg: string;
  buttonText: string;
  rings: {
    outer: string;
    mid1: string;
    mid2: string;
    inner: string;
    backdrop: string;
  };
}

const steps: StepData[] = [
  {
    id: "clarity",
    name: "Clarity",
    badge: "✦ Unforgettable meetings...quite literally",
    badgeColor: "text-[#00E5FF]",
    description:
      "Shockingly accurate transcripts, instant summaries, and action items with consistent quality across every call – delivered straight to your inbox, like magic.",
    buttonBg: "bg-[#00E5FF] hover:bg-[#38EDFF]",
    buttonText: "text-[#050608]",
    rings: {
      outer: "border-[#00E5FF]/30",
      mid1: "border-[#00E5FF]/50",
      mid2: "border-[#0284C7]/70",
      inner: "border-[#0369A1]",
      backdrop: "from-[#00E5FF]/40 via-[#0284C7]/25 to-transparent",
    },
  },
  {
    id: "momentum",
    name: "Momentum",
    badge: "✦ Eliminate overhead & maximize productivity",
    badgeColor: "text-[#F59E0B]",
    description:
      "'Ask Fathom' anything about your meetings – a place to search everything, and get customizable AI summaries tailored to your team's workflow and priorities so you spend less time searching and more time doing.",
    buttonBg: "bg-[#FDE047] hover:bg-[#FEF08A]",
    buttonText: "text-[#050608]",
    rings: {
      outer: "border-[#F97316]/35",
      mid1: "border-[#F97316]/55",
      mid2: "border-[#EA580C]/75",
      inner: "border-[#C2410C]",
      backdrop: "from-[#F97316]/40 via-[#EA580C]/25 to-transparent",
    },
  },
  {
    id: "ease",
    name: "Ease",
    badge: "✦ Works wherever you do",
    badgeColor: "text-[#FB7185]",
    description:
      "Meeting notes, insights and action items sync automatically with your tools – Slack, Salesforce, HubSpot, Notion, Asana, and beyond – without you lifting a finger.",
    buttonBg: "bg-[#FB7185] hover:bg-[#FDA4AF]",
    buttonText: "text-[#050608]",
    rings: {
      outer: "border-[#C084FC]/35",
      mid1: "border-[#A855F7]/55",
      mid2: "border-[#9333EA]/75",
      inner: "border-[#7E22CE]",
      backdrop: "from-[#C084FC]/40 via-[#A855F7]/25 to-transparent",
    },
  },
];

export default function StickyCardAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [teamChoice, setTeamChoice] = useState<"individual" | "team">("team");

  // Reduced scroll speed: 450vh container gives generous, relaxed scroll pacing
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      if (progress < 0.33) {
        setActiveStep(0);
      } else if (progress < 0.67) {
        setActiveStep(1);
      } else {
        setActiveStep(2);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToStep = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const stepHeight = (containerRef.current.offsetHeight - window.innerHeight) / 3;
    window.scrollTo({
      top: containerTop + stepHeight * index + 20,
      behavior: "smooth",
    });
  };

  const current = steps[activeStep];

  return (
    <div ref={containerRef} className="relative h-[450vh] bg-[#050608] select-none">
      {/* Sticky Viewport that stays pinned in place during scroll */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden bg-[#050608]">
        {/* Subtle Starfield background */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(1px 1px at 40px 60px, #ffffff, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 150px 220px, #00E5FF, rgba(0,0,0,0)),
                radial-gradient(1.5px 1.5px at 280px 100px, #ffffff, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 420px 320px, #ffffff, rgba(0,0,0,0)),
                radial-gradient(1.5px 1.5px at 600px 180px, #00E5FF, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 780px 420px, #ffffff, rgba(0,0,0,0)),
                radial-gradient(1.5px 1.5px at 950px 120px, #ffffff, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 1100px 300px, #00E5FF, rgba(0,0,0,0)),
                radial-gradient(1.5px 1.5px at 1300px 190px, #ffffff, rgba(0,0,0,0))
              `,
              backgroundRepeat: "repeat",
              backgroundSize: "750px 500px",
            }}
          />
        </div>

        {/* Vibrant Magenta/Pink Atmospheric Glow Bleeding Off the Right Screen Edge (exact match to reference) */}
        <div className="absolute right-0 top-0 bottom-0 w-[420px] bg-gradient-to-l from-[#EC4899]/35 via-[#C084FC]/25 to-transparent blur-[100px] pointer-events-none" />

        {/* Giant Concentric Halo Rings Bleeding Off the Right Edge */}
        <div className="absolute -right-[120px] lg:-right-[60px] top-1/2 -translate-y-1/2 w-[980px] h-[980px] pointer-events-none flex items-center justify-center transition-all duration-700">
          {/* Ring 1 (Outer) */}
          <div
            className={`w-[980px] h-[980px] rounded-full border-[1.5px] transition-all duration-700 ${current.rings.outer} flex items-center justify-center`}
          >
            {/* Ring 2 */}
            <div
              className={`w-[840px] h-[840px] rounded-full border-[2px] transition-all duration-700 ${current.rings.mid1} flex items-center justify-center`}
            >
              {/* Ring 3 */}
              <div
                className={`w-[700px] h-[700px] rounded-full border-[2.5px] transition-all duration-700 ${current.rings.mid2} flex items-center justify-center`}
              >
                {/* Ring 4 (Inner) */}
                <div
                  className={`w-[560px] h-[560px] rounded-full border-[3px] transition-all duration-700 ${current.rings.inner}`}
                />
              </div>
            </div>
          </div>

          {/* Radiant Halo Glow behind rings */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${current.rings.backdrop} blur-[90px] pointer-events-none transition-all duration-700`}
          />
        </div>

        {/* Main Content Grid: Full-Bleed Proportions */}
        <div className="w-full max-w-[1500px] mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10">
          {/* Left Column: Stacked Giant Titles (Clarity / Momentum / Ease) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* 1. Clarity */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => scrollToStep(0)}
                className={`block text-left transition-all duration-500 font-bold tracking-tight font-sans ${
                  activeStep === 0
                    ? "text-5xl sm:text-6xl lg:text-[70px] text-white leading-none"
                    : "text-4xl sm:text-5xl lg:text-[56px] text-[#2E3244] hover:text-[#525770] leading-none"
                }`}
              >
                Clarity
              </button>

              {activeStep === 0 && (
                <div className="space-y-4 pt-2 animate-fadeIn transition-all duration-500 max-w-lg">
                  <div className={`text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-1.5 ${current.badgeColor}`}>
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>{current.badge}</span>
                  </div>

                  <p className="text-sm sm:text-base text-[#9EA1B2] leading-relaxed">
                    {current.description}
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/signup"
                      className={`inline-block px-8 py-3.5 rounded-full text-xs font-black tracking-wider uppercase transition-all shadow-[0_0_24px_rgba(0,229,255,0.4)] ${current.buttonBg} ${current.buttonText}`}
                    >
                      GET STARTED. IT'S FREE.
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Momentum */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => scrollToStep(1)}
                className={`block text-left transition-all duration-500 font-bold tracking-tight font-sans ${
                  activeStep === 1
                    ? "text-5xl sm:text-6xl lg:text-[70px] text-white leading-none"
                    : "text-4xl sm:text-5xl lg:text-[56px] text-[#2E3244] hover:text-[#525770] leading-none"
                }`}
              >
                Momentum
              </button>

              {activeStep === 1 && (
                <div className="space-y-4 pt-2 animate-fadeIn transition-all duration-500 max-w-lg">
                  <div className={`text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-1.5 ${current.badgeColor}`}>
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>{current.badge}</span>
                  </div>

                  <p className="text-sm sm:text-base text-[#9EA1B2] leading-relaxed">
                    {current.description}
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/signup"
                      className={`inline-block px-8 py-3.5 rounded-full text-xs font-black tracking-wider uppercase transition-all shadow-[0_0_24px_rgba(245,158,11,0.4)] ${current.buttonBg} ${current.buttonText}`}
                    >
                      GET STARTED. IT'S FREE.
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Ease */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => scrollToStep(2)}
                className={`block text-left transition-all duration-500 font-bold tracking-tight font-sans ${
                  activeStep === 2
                    ? "text-5xl sm:text-6xl lg:text-[70px] text-white leading-none"
                    : "text-4xl sm:text-5xl lg:text-[56px] text-[#2E3244] hover:text-[#525770] leading-none"
                }`}
              >
                Ease
              </button>

              {activeStep === 2 && (
                <div className="space-y-4 pt-2 animate-fadeIn transition-all duration-500 max-w-lg">
                  <div className={`text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-1.5 ${current.badgeColor}`}>
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>{current.badge}</span>
                  </div>

                  <p className="text-sm sm:text-base text-[#9EA1B2] leading-relaxed">
                    {current.description}
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/signup"
                      className={`inline-block px-8 py-3.5 rounded-full text-xs font-black tracking-wider uppercase transition-all shadow-[0_0_24px_rgba(251,113,133,0.4)] ${current.buttonBg} ${current.buttonText}`}
                    >
                      GET STARTED. IT'S FREE.
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Giant Prominent Dark Card nested within the concentric halos */}
          <div className="lg:col-span-7 flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-[620px] transition-all duration-500">
              {/* CARD 1: Clarity - Meeting Summary & Topics (Exact match to reference image) */}
              {activeStep === 0 && (
                <div className="rounded-3xl bg-[#0D0F15]/95 border border-[#222536] shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-7 sm:p-9 space-y-5 text-sm backdrop-blur-md animate-fadeIn transition-all duration-500">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#1C1F2D]">
                    <span className="text-lg font-bold text-white tracking-tight">Summary</span>
                    <button type="button" className="text-xs text-[#00E5FF] hover:underline font-semibold">
                      Change Template
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-4 text-[#C5C8DA]">
                    {/* Meeting Purpose */}
                    <div>
                      <div className="font-bold text-white text-xs uppercase tracking-wider mb-1.5">
                        Meeting Purpose
                      </div>
                      <p className="text-xs sm:text-sm pl-2.5 border-l-2 border-[#242738] text-[#8E92A6]">
                        Quarterly sales performance review of ThinkBionics
                      </p>
                    </div>

                    {/* Topics */}
                    <div className="space-y-2.5">
                      <div className="font-bold text-white text-xs uppercase tracking-wider">
                        Topics:
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-white">
                        New Feature Launch Impact:
                      </div>

                      {/* Clickable Blue Quote Box with play icon */}
                      <div className="p-3.5 rounded-xl bg-[#121722] border border-[#1E293B] text-[#00E5FF] flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                        <Play className="w-4 h-4 fill-current shrink-0 mt-0.5" />
                        <span>
                          The recent release of the AI-driven analytics module positively impacted user engagement and retention.
                        </span>
                      </div>

                      <p className="text-xs text-[#868A9E] leading-relaxed pl-1">
                        • Several users provided positive feedback regarding the ease of use and the added value this feature brings to their operations.
                      </p>
                    </div>

                    {/* Customer Feedback Insights */}
                    <div className="space-y-1.5">
                      <div className="font-bold text-white text-xs uppercase tracking-wider">
                        Customer Feedback Insights:
                      </div>
                      <p className="text-xs text-[#868A9E] leading-relaxed pl-1">
                        • A summary of user feedback revealed a consistent demand for enhanced mobile compatibility. Discussion was initiated to prioritize this in the product roadmap to meet customer expectations.
                      </p>
                    </div>

                    {/* Upcoming Q4 Strategies */}
                    <div className="space-y-1.5">
                      <div className="font-bold text-white text-xs uppercase tracking-wider">
                        Upcoming Q4 Strategies:
                      </div>
                      <p className="text-xs text-[#868A9E] leading-relaxed pl-1">
                        • Plans to intensify marketing efforts in the Midwest region to offset the sales decline observed in Q3.
                      </p>
                    </div>

                    {/* Action Items Footer */}
                    <div className="pt-3 border-t border-[#1C1F2D] flex items-center justify-between text-xs sm:text-sm font-bold text-white">
                      <span>Action Items</span>
                      <span className="text-[#00E5FF] font-medium text-xs">3 deliverables synced</span>
                    </div>
                  </div>
                </div>
              )}

              {/* CARD 2: Momentum - Integrations Panel */}
              {activeStep === 1 && (
                <div className="rounded-3xl bg-[#0D0F15]/95 border border-[#222536] shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-7 sm:p-9 space-y-6 text-sm backdrop-blur-md animate-fadeIn transition-all duration-500">
                  <div className="flex items-center justify-between pb-4 border-b border-[#1C1F2D]">
                    <span className="text-xs font-bold tracking-widest text-[#8E92A6] uppercase">
                      INTEGRATIONS
                    </span>
                    <span className="text-xs text-[#00E5FF] font-semibold bg-[#00E5FF]/10 px-2.5 py-1 rounded-full">
                      Zero Manual Sync
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Slack */}
                    <div className="p-4 rounded-2xl bg-[#141620] border border-[#232738] flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#4A154B] flex items-center justify-center text-white font-black text-base shrink-0">
                        #
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-white text-sm">Slack</div>
                        <p className="text-xs text-[#8E92A6] leading-relaxed">
                          Automatically send highlights to Slack in real-time.
                        </p>
                      </div>
                      <Info className="w-4 h-4 text-[#54576B]" />
                    </div>

                    {/* Salesforce */}
                    <div className="p-4 rounded-2xl bg-[#141620] border border-[#232738] flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#00A1E0] flex items-center justify-center text-white font-black text-sm shrink-0">
                        SF
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-white text-sm">Salesforce</div>
                        <p className="text-xs text-[#8E92A6] leading-relaxed">
                          Sync call summaries & highlights to matching Contacts, Accounts, and open Opportunities.
                        </p>
                      </div>
                      <Info className="w-4 h-4 text-[#54576B]" />
                    </div>

                    {/* HubSpot */}
                    <div className="p-4 rounded-2xl bg-[#141620] border border-[#232738] flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#FF7A59] flex items-center justify-center text-white font-black text-sm shrink-0">
                        HS
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-white text-sm">HubSpot</div>
                        <p className="text-xs text-[#8E92A6] leading-relaxed">
                          Sync call summaries & highlights to matching Contacts, Accounts, and open Opportunities.
                        </p>
                      </div>
                      <Info className="w-4 h-4 text-[#54576B]" />
                    </div>
                  </div>

                  {/* Connected Integrations Logo Strip */}
                  <div className="pt-4 border-t border-[#1C1F2D] flex items-center justify-between px-3 text-xs font-semibold text-[#8E92A6]">
                    <span className="font-bold text-white">salesforce</span>
                    <span className="text-[#FF7A59] font-bold">hubspot</span>
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 shadow-md" />
                    <span className="font-bold text-white">_zapier</span>
                  </div>
                </div>
              )}

              {/* CARD 3: Ease - Personalizing Your Account */}
              {activeStep === 2 && (
                <div className="rounded-3xl bg-[#0D0F15]/95 border border-[#222536] shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-7 sm:p-9 space-y-6 text-sm backdrop-blur-md animate-fadeIn transition-all duration-500">
                  <div className="text-center space-y-1.5 pb-2 border-b border-[#1C1F2D]">
                    <div className="text-xs font-bold tracking-widest text-[#82869C] uppercase">
                      PERSONALIZING YOUR ACCOUNT
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      How are you planning to use Fathom?
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-1">
                    {/* By Myself */}
                    <div
                      onClick={() => setTeamChoice("individual")}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center space-y-2.5 ${
                        teamChoice === "individual"
                          ? "bg-[#141824] border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.25)]"
                          : "bg-[#11131C] border-[#222534] hover:border-[#383C50]"
                      }`}
                    >
                      <User className="w-8 h-8 text-[#A0A3B6]" />
                      <div className="font-bold text-white text-sm">By Myself</div>
                      <p className="text-xs text-[#7A7E94] leading-relaxed">
                        Record, transcribe & manage your meetings with AI-powered insights.
                      </p>
                    </div>

                    {/* With My Team (Active by default) */}
                    <div
                      onClick={() => setTeamChoice("team")}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center space-y-2.5 ${
                        teamChoice === "team"
                          ? "bg-[#141824] border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.25)]"
                          : "bg-[#11131C] border-[#222534] hover:border-[#383C50]"
                      }`}
                    >
                      <Users className="w-8 h-8 text-[#00E5FF]" />
                      <div className="font-bold text-white text-sm">With My Team</div>
                      <p className="text-xs text-[#7A7E94] leading-relaxed">
                        Collaborate effortlessly. Share and organize meetings in one place.
                      </p>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      className="w-full py-3.5 rounded-full border border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF]/10 font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
