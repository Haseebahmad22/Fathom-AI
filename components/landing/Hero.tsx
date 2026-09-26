"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Lock,
  Star,
  Headphones,
  Video,
  FileText,
  Sparkles,
  Mic,
  ArrowUp,
} from "lucide-react";

export default function Hero() {
  const [audioMode, setAudioMode] = useState<"video" | "audio" | "transcript">("audio");

  return (
    <section className="relative bg-[#050608] text-white pt-14 pb-20 overflow-hidden select-none">
      {/* Canvas-style animated starfield via CSS */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              radial-gradient(1.2px 1.2px at 25px 35px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 85px 140px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1.5px 1.5px at 160px 70px, rgba(255,255,255,0.8), rgba(0,0,0,0)),
              radial-gradient(1px 1px at 230px 210px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1.5px 1.5px at 340px 120px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 450px 260px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1.8px 1.8px at 540px 80px, rgba(255,255,255,0.7), rgba(0,0,0,0)),
              radial-gradient(1px 1px at 630px 190px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1.5px 1.5px at 720px 310px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 830px 95px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1.5px 1.5px at 910px 230px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 1000px 150px, rgba(255,255,255,0.6), rgba(0,0,0,0)),
              radial-gradient(1.8px 1.8px at 1080px 45px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 1170px 280px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 1260px 170px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1.5px 1.5px at 1350px 85px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 1440px 240px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1.8px 1.8px at 1530px 120px, rgba(255,255,255,0.7), rgba(0,0,0,0)),
              radial-gradient(1px 1px at 1600px 300px, #ffffff, rgba(0,0,0,0))
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "600px 380px",
          }}
        />
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 50px 80px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1.5px 1.5px at 190px 250px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 380px 40px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1.5px 1.5px at 510px 310px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 670px 150px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1.5px 1.5px at 850px 370px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 1020px 70px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1.5px 1.5px at 1190px 220px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 1390px 340px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1.5px 1.5px at 1520px 180px, #ffffff, rgba(0,0,0,0))
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "850px 520px",
          }}
        />
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center min-h-[520px]">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h1 className="text-[52px] sm:text-[64px] lg:text-[76px] tracking-[-0.03em] text-white leading-[1.05] font-sans">
              <span className="font-normal">AI notetaking</span>{" "}
              <span className="font-bold">that is</span>
              <br />
              <span className="font-bold">out of this world</span>
            </h1>

            <p className="text-base sm:text-lg text-[#9EA1B2] max-w-lg leading-relaxed">
              Fathom summarizes your meetings so you can focus on the conversation.{" "}
              <strong className="text-white font-semibold">Now available bot-free.</strong>
            </p>

            <div className="pt-1">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-9 py-4 rounded-full bg-gradient-to-r from-[#00E5FF] via-[#00D4EA] to-[#00C4D6] hover:from-[#38EDFF] hover:via-[#38E0F0] hover:to-[#38D5E0] text-[#050608] text-xs font-black tracking-wider uppercase transition-all shadow-[0_0_28px_rgba(0,229,255,0.35)] hover:shadow-[0_0_40px_rgba(0,229,255,0.55)]"
              >
                GET STARTED - FREE FOREVER
              </Link>
            </div>

            {/* Compliance row */}
            <div className="flex items-center gap-2 text-xs text-[#727586] pt-1">
              <Lock className="w-3.5 h-3.5 text-[#727586]" />
              <span className="font-medium tracking-wide">
                SOC 2 Type II &nbsp;|&nbsp; GDPR &nbsp;|&nbsp; HIPAA Compliant &nbsp;|&nbsp; SSO / SCIM
              </span>
            </div>
          </div>

          {/* Right Column: Bento Card Canvas */}
          <div className="lg:col-span-7 relative w-full min-h-[500px] flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[700px] h-[480px]">
              {/* ROW 1: Capture Settings Card + Ask Fathom Pill */}
              {/* Capture Settings */}
              <div
                className="absolute top-0 left-4 z-10 w-[260px] rounded-[22px] p-3 text-xs shadow-xl backdrop-blur-md"
                style={{
                  background:
                    "linear-gradient(#0D0F15, #0D0F15) padding-box, linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05)) border-box",
                  border: "1px solid transparent",
                }}
              >
                <div className="flex items-center justify-between pb-2 px-1">
                  <span className="text-[11px] font-semibold text-white">Capture settings</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                    <span className="text-[10px] text-[#00E5FF] font-mono">Ready</span>
                  </div>
                </div>

                <div className="space-y-0.5 font-medium bg-[#141620]/90 rounded-xl p-1.5 border border-[#1E2030]">
                  <div
                    onClick={() => setAudioMode("audio")}
                    className={`flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer transition-colors ${
                      audioMode === "audio" ? "bg-[#1C1F30] text-white" : "text-[#85889A] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Headphones className="w-3.5 h-3.5 text-[#00E5FF]" />
                      <span className="text-[11px] font-semibold text-white">Audio</span>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#00E5FF]/20 text-[#00E5FF] font-bold">
                      BOT-FREE
                    </span>
                  </div>

                  <div
                    onClick={() => setAudioMode("transcript")}
                    className={`flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer transition-colors ${
                      audioMode === "transcript" ? "bg-[#1C1F30] text-white" : "text-[#85889A] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 opacity-60" />
                      <span className="text-[11px]">Transcript only</span>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/70 font-semibold">
                      BOT-FREE
                    </span>
                  </div>

                  <div
                    onClick={() => setAudioMode("video")}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer transition-colors ${
                      audioMode === "video" ? "bg-[#1C1F30] text-white" : "text-[#85889A] hover:text-white"
                    }`}
                  >
                    <Video className="w-3.5 h-3.5 opacity-60" />
                    <span className="text-[11px]">Audio & video</span>
                  </div>
                </div>
              </div>

              {/* ASK FATHOM Pill */}
              <div className="absolute top-4 right-0 z-10 px-7 py-3.5 rounded-full bg-[#0D0F15] border border-[#222536] flex items-center gap-2.5 shadow-xl hover:border-[#383C50] transition-colors">
                <Sparkles className="w-4 h-4 text-[#00E5FF]" />
                <span className="text-xs font-bold tracking-widest text-[#D2D5E4]">
                  ASK FATHOM
                </span>
              </div>

              {/* ROW 2: Astronaut + Chat Prompt */}
              {/* Astronaut Capsule */}
              <div className="absolute top-[165px] left-0 z-20 w-[260px] h-[130px] rounded-full bg-[#050608] border border-[#222536] p-1.5 flex items-center justify-center shadow-2xl overflow-hidden group hover:border-[#00E5FF]/40 transition-colors">
                <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-black">
                  <Image
                    src="/images/space_astronaut_laptop.jpg"
                    alt="Astronaut using laptop"
                    fill
                    className="object-cover object-center scale-110"
                    priority
                  />
                </div>
              </div>

              {/* Chat Prompt Card */}
              <div
                className="absolute top-[165px] right-0 z-20 w-[390px] h-[130px] rounded-[26px] p-4 flex flex-col justify-between shadow-2xl backdrop-blur-md"
                style={{
                  background:
                    "linear-gradient(#0D0F15, #0D0F15) padding-box, linear-gradient(135deg, rgba(249,115,22,0.5), rgba(236,72,153,0.4), rgba(168,85,247,0.3)) border-box",
                  border: "1px solid transparent",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs sm:text-sm text-[#E5E7F4] leading-relaxed">
                    Fathom, what follow-ups did I commit to in my meetings this week?
                  </p>
                  <div className="flex items-center gap-1 shrink-0 pt-0.5">
                    <span className="w-5 h-5 rounded-full bg-[#1C1E2B] border border-[#2A2D3E] flex items-center justify-center text-[10px] text-white">
                      ✦
                    </span>
                    <span className="w-5 h-5 rounded-full bg-[#1C1E2B] border border-[#2A2D3E] flex items-center justify-center text-[10px] text-[#F97316]">
                      ✹
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[#1C1F2D]">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#181A25] border border-[#262838] text-[10px] text-[#A6AABF] font-medium">
                    <span className="text-[#00E5FF] font-bold">▶</span>
                    <span>Fathom</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#85889C]">
                    <Mic className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
                    <button
                      type="button"
                      aria-label="Send prompt"
                      className="w-6 h-6 rounded-full bg-[#00E5FF] hover:bg-[#38EDFF] text-[#050608] flex items-center justify-center transition-all"
                    >
                      <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>

              {/* ROW 3: Project check-in + Blue Planet */}
              {/* Project check-in card */}
              <div className="absolute top-[320px] left-8 z-20 w-[300px] rounded-[22px] bg-[#0D0F15] border border-[#222536] p-4 space-y-2 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Project check-in</span>
                  <div className="flex -space-x-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#F59E0B] text-[9px] font-bold text-black flex items-center justify-center border-2 border-[#0D0F15]">
                      L
                    </span>
                    <span className="w-6 h-6 rounded-full bg-[#F43F5E] text-[9px] font-bold text-white flex items-center justify-center border-2 border-[#0D0F15]">
                      J
                    </span>
                    <span className="w-6 h-6 rounded-full bg-[#10B981] text-[9px] font-bold text-white flex items-center justify-center border-2 border-[#0D0F15]">
                      A
                    </span>
                    <span className="w-6 h-6 rounded-full bg-[#3B82F6] text-[9px] font-bold text-white flex items-center justify-center border-2 border-[#0D0F15]">
                      K
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-2 border-t border-[#1C1E2A] text-xs">
                  <button className="flex items-center gap-1.5 text-[#00E5FF] font-medium border-b-2 border-[#00E5FF] pb-1 -mb-1">
                    <Sparkles className="w-3 h-3 text-[#00E5FF]" />
                    <span>Summary</span>
                  </button>
                  <button className="text-[#6D7082] hover:text-white transition-colors pb-1 flex items-center gap-1.5">
                    <span>✎</span>
                    <span>Scratchpad</span>
                  </button>
                </div>
              </div>

              {/* Blue Planet */}
              <div className="absolute top-[310px] right-8 z-10 w-[120px] h-[120px] rounded-full overflow-hidden shadow-[0_0_40px_rgba(0,216,246,0.5)] border border-[#00E5FF]/40">
                <Image
                  src="/images/blue_glowing_planet.jpg"
                  alt="Glowing blue planet"
                  width={120}
                  height={120}
                  className="object-cover w-full h-full scale-105"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof & Logo Row */}
        <div className="mt-20 pt-8 border-t border-[#151722]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* G2 Rating & Used at 300K+ companies */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF492C] flex items-center justify-center font-black text-white text-sm shadow-[0_0_12px_rgba(255,73,44,0.3)]">
                  G²
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center text-[#F59E0B]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-bold text-white text-xs">5.0/5.0</span>
                  </div>
                  <div className="text-[11px] text-[#7E8296] font-medium">
                    #1 rated · 6,500+ reviews
                  </div>
                </div>
              </div>

              <div className="hidden sm:block text-left border-l border-[#222536] pl-6">
                <div className="text-[11px] text-[#7E8296] leading-none">Used at</div>
                <div className="text-sm font-bold text-white">300K+</div>
                <div className="text-[11px] text-[#7E8296] leading-none">companies</div>
              </div>
            </div>

            {/* Brand Logo Cards — Glassmorphic pill style matching reference */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
              {[
                { name: "HubSpot", icon: "🔶" },
                { name: "Adobe", icon: "Ai" },
                { name: "_zapier", icon: null },
                { name: "GRUBHUB", icon: "🍔" },
                { name: "EA", icon: null },
                { name: "Calendly", icon: "📅" },
              ].map((brand) => (
                <div
                  key={brand.name}
                  className="px-5 py-3 rounded-2xl bg-[#0D0F15]/80 border border-[#222536] hover:border-[#383C50] transition-colors flex items-center gap-2 min-h-[48px] backdrop-blur-sm"
                >
                  <span className="font-bold text-white tracking-tight text-sm font-sans">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
