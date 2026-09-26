"use client";

import React, { useEffect, useRef, useState } from "react";

export default function TeamStatsPillars() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      title: "95% of users",
      description: "say Fathom helps them stay fully present in meetings",
      circleBg: "bg-[#EB5724]",
      stemGradient: "from-[#EB5724]/20 via-[#EB5724]/5 to-transparent",
      height: "h-[300px]",
      delayMs: 0,
    },
    {
      title: "6+ hours saved",
      description: "per team member every week on follow-up work",
      circleBg: "bg-[#F48B9E]",
      stemGradient: "from-[#F48B9E]/20 via-[#F48B9E]/5 to-transparent",
      height: "h-[400px]",
      delayMs: 150,
    },
    {
      title: "3X Faster",
      description: "from meeting insights to actionable next steps",
      circleBg: "bg-[#00A3FF]",
      stemGradient: "from-[#00A3FF]/20 via-[#00A3FF]/5 to-transparent",
      height: "h-[500px]",
      delayMs: 300,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FAFAFC] text-[#0A0B10] pt-24 pb-0 overflow-hidden select-none border-t border-b border-[#E5E7EB]"
    >
      <div className="max-w-5xl mx-auto px-6 text-center space-y-16">
        {/* Section Heading matching reference */}
        <h2 className="text-4xl sm:text-6xl font-normal tracking-tight text-[#0A0B10] leading-tight font-sans">
          Fathom teams<br />
          work smarter
        </h2>

        {/* 3 Rising Stat Columns */}
        <div className="flex items-end justify-center gap-6 sm:gap-10 pt-8 min-h-[520px]">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center w-[170px] sm:w-[190px]"
              style={{
                transform: isRevealed ? "translateY(0)" : "translateY(192px)",
                opacity: isRevealed ? 1 : 0,
                transition: `transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${stat.delayMs}ms, opacity 1s cubic-bezier(0.16, 1, 0.3, 1) ${stat.delayMs}ms`,
              }}
            >
              {/* Circular Cap with Stat & Label */}
              <div
                className={`w-[170px] h-[170px] sm:w-[190px] sm:h-[190px] rounded-full ${stat.circleBg} text-white p-5 flex flex-col items-center justify-center text-center shadow-lg relative z-10 transition-transform duration-300 hover:scale-105`}
              >
                <div className="font-bold text-lg sm:text-xl tracking-tight leading-tight">
                  {stat.title}
                </div>
                <div className="text-[11px] sm:text-xs text-white/95 leading-snug mt-1 font-normal max-w-[140px]">
                  {stat.description}
                </div>
              </div>

              {/* Rising Vertical Stem below circle */}
              <div
                className={`w-[170px] sm:w-[190px] ${stat.height} -mt-[85px] sm:-mt-[95px] bg-gradient-to-b ${stat.stemGradient} rounded-b-2xl`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
