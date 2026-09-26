"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkles, ChevronLeft, ChevronRight, PhoneOff } from "lucide-react";
import Reveal from "./Reveal";

interface SlideData {
  id: number;
  heading: string;
  content: React.ReactNode;
}

export default function MeetingCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const slides: SlideData[] = [
    {
      id: 0,
      heading: "Capture notes your way – bot or no bot –\nso you can stay focused on the meeting",
      content: (
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-0 lg:gap-0 w-full">
          {/* Left: Stacked Video Participant Feeds */}
          <div className="w-full lg:w-[460px] flex flex-col gap-3 shrink-0">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#222536] shadow-2xl bg-[#0D0F14]">
              <Image src="/images/lily.jpg" alt="Lily" fill className="object-cover" priority />
              <div className="absolute bottom-3 left-4 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-xs font-semibold text-white">
                Lily
              </div>
            </div>
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#222536] shadow-2xl bg-[#0D0F14]">
              <Image src="/images/jordan.jpg" alt="Jordan" fill className="object-cover" priority />
              <div className="absolute bottom-3 left-4 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-xs font-semibold text-white">
                Jordan
              </div>
            </div>
          </div>

          {/* Right: Summary Card overlapping video feeds */}
          <div className="w-full lg:w-[520px] rounded-3xl bg-[#0D0F14]/95 border border-[#222536] shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-7 sm:p-8 space-y-5 -mt-8 lg:mt-0 lg:-ml-10 z-20 backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 border-b border-[#1A1C28]">
              <div className="text-base font-bold text-white tracking-tight">
                Q3 Strategy + Planning
              </div>
              <div className="flex -space-x-2">
                <span className="w-7 h-7 rounded-full bg-[#E0A82E] text-[11px] font-bold text-black flex items-center justify-center border-2 border-[#0D0F14]">L</span>
                <span className="w-7 h-7 rounded-full bg-[#3B82F6] text-[11px] font-bold text-white flex items-center justify-center border-2 border-[#0D0F14]">J</span>
                <span className="w-7 h-7 rounded-full bg-[#10B981] text-[11px] font-bold text-white flex items-center justify-center border-2 border-[#0D0F14]">A</span>
              </div>
            </div>

            <div className="flex items-center gap-8 text-sm border-b border-[#1A1C28] pb-3">
              <button className="flex items-center gap-2 text-[#00E5FF] font-semibold border-b-2 border-[#00E5FF] pb-3 -mb-3">
                <Sparkles className="w-4 h-4 text-[#00E5FF]" />
                <span>Summary</span>
              </button>
              <button className="text-[#727588] hover:text-white transition-colors pb-3 -mb-3 font-medium flex items-center gap-2">
                <span>✎</span>
                <span>Scratchpad</span>
              </button>
            </div>

            <div className="space-y-3 text-sm text-[#C5C8D8] leading-relaxed">
              <p className="text-[#8E92A6]">
                Planning, aligning on key priorities, setting goals, and outlining next steps to drive execution.
              </p>
              <ul className="space-y-2.5 list-disc pl-5 text-[#A8ABB8]">
                <li>Lily outlined top Q3 priorities, focusing on growth targets and key initiatives.</li>
                <li>Jordan raised concerns around resourcing and timeline feasibility.</li>
                <li className="text-[#00E5FF] font-semibold">
                  @Lily to follow-up with Jordan about additional outside resources.
                </li>
                <li>Jordan suggested reallocating budget to support higher-impact projects.</li>
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#1A1C28]">
              <div className="flex items-center gap-2.5">
                <span className="text-sm text-[#828598] font-medium">Listening</span>
                <div className="flex items-center gap-[3px]">
                  {[14, 20, 10, 18, 12].map((h, i) => (
                    <span
                      key={i}
                      className="w-[3px] rounded-full bg-[#00E5FF]"
                      style={{
                        height: `${h}px`,
                        animation: `waveform ${0.8 + i * 0.15}s ease-in-out infinite`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E11D48]/15 border border-[#E11D48]/30 text-[#FB7185] text-xs font-semibold hover:bg-[#E11D48]/25 transition-colors"
              >
                <PhoneOff className="w-3.5 h-3.5" />
                <span>End</span>
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      heading: "AI summaries instantly\navailable after your call",
      content: (
        <div className="w-full max-w-4xl rounded-3xl bg-[#0D0F14]/95 border border-[#222536] shadow-2xl p-8 sm:p-10 space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-[#1A1C28]">
            <div className="text-base font-bold text-white flex items-center gap-3">
              <span>← Project check-in</span>
            </div>
            <div className="flex -space-x-2">
              <span className="w-7 h-7 rounded-full bg-[#38BDF8] text-[11px] font-bold text-black flex items-center justify-center border-2 border-[#0D0F14]">L</span>
              <span className="w-7 h-7 rounded-full bg-[#F43F5E] text-[11px] font-bold text-white flex items-center justify-center border-2 border-[#0D0F14]">J</span>
            </div>
          </div>

          <div className="flex items-center gap-5 text-sm border-b border-[#1A1C28] pb-3 overflow-x-auto">
            <button className="flex items-center gap-2 text-[#00E5FF] font-semibold border-b-2 border-[#00E5FF] pb-3 -mb-3 shrink-0">
              <Sparkles className="w-4 h-4" />
              <span>Summary</span>
            </button>
            {["Action Items", "Comments", "Transcript"].map((tab) => (
              <button key={tab} className="text-[#727588] hover:text-white pb-3 -mb-3 font-medium shrink-0">
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-3 text-sm">
            <div className="p-4 rounded-xl bg-[#141620] border border-[#1E2030] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-sm">Enhanced Summary</span>
                <span className="text-[10px] text-[#727588] px-2 py-0.5 rounded-full border border-[#222536]">✦ Customize</span>
              </div>
              <p className="text-[#A8ABB8] text-sm leading-relaxed">
                The team reviewed progress, timelines, and upcoming milestones for the Q3 project. Key takeaways:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-[#8C90A2] text-sm">
                <li>Core work is on schedule with pilot access configured.</li>
                <li>Security approval timeline is targeted for Thursday afternoon.</li>
                <li>Teams aligned on current status, remaining tasks, and overall readiness.</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      heading: "Your meeting data, now inside\nChatGPT, Claude, and more",
      content: (
        <div className="w-full max-w-4xl rounded-3xl bg-[#0D0F14]/95 border border-[#222536] shadow-2xl p-8 sm:p-10 space-y-5">
          <div className="text-center space-y-3">
            <h3 className="text-lg font-bold text-white">Your meetings, everywhere</h3>
            <p className="text-sm text-[#8E92A6] max-w-md mx-auto">
              Fathom automatically syncs your meeting insights to ChatGPT, Claude, and your favorite tools — no copy-paste required.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: "ChatGPT", color: "#10A37F" },
              { name: "Claude", color: "#D97706" },
              { name: "Notion", color: "#FFFFFF" },
            ].map((tool) => (
              <div key={tool.name} className="p-5 rounded-2xl bg-[#141620] border border-[#1E2030] text-center space-y-2">
                <div className="w-10 h-10 rounded-xl mx-auto flex items-center justify-center text-white font-bold" style={{ backgroundColor: tool.color + "30" }}>
                  {tool.name[0]}
                </div>
                <div className="text-sm font-semibold text-white">{tool.name}</div>
                <div className="text-xs text-[#727588]">Connected</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 3,
      heading: "Automatically monitor key topics so\nyou never miss critical moments",
      content: (
        <div className="w-full max-w-4xl rounded-3xl bg-[#0D0F14]/95 border border-[#222536] shadow-2xl p-8 sm:p-10 space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-[#1A1C28]">
            <span className="text-base font-bold text-white">Topic Monitoring</span>
            <span className="text-xs text-[#00E5FF] font-semibold bg-[#00E5FF]/10 px-2.5 py-1 rounded-full">Active</span>
          </div>
          <div className="space-y-3">
            {[
              { topic: "Pricing objections", count: 12, color: "#F97316" },
              { topic: "Competitor mentions", count: 8, color: "#EC4899" },
              { topic: "Next steps & follow-ups", count: 24, color: "#00E5FF" },
            ].map((item) => (
              <div key={item.topic} className="p-4 rounded-xl bg-[#141620] border border-[#1E2030] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium text-white">{item.topic}</span>
                </div>
                <span className="text-xs font-bold text-[#8E92A6]">{item.count} mentions</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  const totalSlides = slides.length;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  // Auto-advance every 8 seconds
  useEffect(() => {
    autoPlayRef.current = setInterval(nextSlide, 8000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(nextSlide, 8000);
  };

  return (
    <section className="relative bg-[#050608] text-white py-24 overflow-hidden select-none">
      {/* Starfield background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 80px 120px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1.5px 1.5px at 300px 60px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 500px 280px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1.2px 1.2px at 720px 180px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 950px 320px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1.5px 1.5px at 1150px 100px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 1350px 240px, #ffffff, rgba(0,0,0,0))
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "700px 400px",
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 space-y-12">
        {/* Section Heading — changes per slide */}
        <Reveal distance={16}>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-white leading-[1.2] font-sans whitespace-pre-line">
              {slides[currentSlide].heading.split("–").length > 1 ? (
                <>
                  {slides[currentSlide].heading.split("–")[0]}–{" "}
                  <strong className="font-bold">{slides[currentSlide].heading.split("–")[1].split("–")[0].trim()}</strong>{" "}
                  {slides[currentSlide].heading.includes("–") && slides[currentSlide].heading.split("–").length > 2 
                    ? `– ${slides[currentSlide].heading.split("–")[2]}`
                    : ""}
                </>
              ) : (
                slides[currentSlide].heading
              )}
            </h2>
          </div>
        </Reveal>

        {/* Slide Content */}
        <div className="relative max-w-[1100px] mx-auto">
          <div className="transition-all duration-700 ease-out animate-fadeIn" key={currentSlide}>
            <div className="flex items-center justify-center">
              {slides[currentSlide].content}
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => { prevSlide(); resetAutoPlay(); }}
            aria-label="Previous slide"
            className="w-9 h-9 rounded-full bg-[#E5B54F] hover:bg-[#F2C76A] text-[#050608] flex items-center justify-center transition-all shadow-md active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 stroke-[3]" />
          </button>

          <div className="flex items-center gap-2.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrentSlide(i); resetAutoPlay(); }}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === i ? "w-7 bg-[#FFF58C]" : "w-2.5 bg-[#FFF58C]/40 hover:bg-[#FFF58C]/60"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => { nextSlide(); resetAutoPlay(); }}
            aria-label="Next slide"
            className="w-9 h-9 rounded-full bg-[#E5B54F] hover:bg-[#F2C76A] text-[#050608] flex items-center justify-center transition-all shadow-md active:scale-95"
          >
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </section>
  );
}
