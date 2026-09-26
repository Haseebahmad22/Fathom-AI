"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative bg-[#050608] text-white py-24 overflow-hidden">
      {/* Subtle star background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 100px 80px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1.5px 1.5px at 350px 200px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 600px 120px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1.2px 1.2px at 900px 300px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 1200px 160px, #ffffff, rgba(0,0,0,0))
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "800px 400px",
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D0F14] border border-[#222536] text-xs font-medium text-[#9EA1B2]">
          <span>Get started in minutes</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          Be present in your next client meeting
        </h2>

        <p className="text-sm sm:text-base text-[#9EA1B2] max-w-lg mx-auto leading-relaxed">
          Sign up free, connect in 30 seconds, and receive an automated recap and ready-to-send follow-up email after your next call.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00E5FF] via-[#00D4EA] to-[#00C4D6] hover:from-[#38EDFF] hover:via-[#38E0F0] hover:to-[#38D5E0] text-[#050608] font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_24px_rgba(0,229,255,0.35)]"
          >
            <span>Get started free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-transparent border border-[#222536] hover:border-[#383C50] hover:bg-[#0D0F14] text-white font-bold text-xs tracking-wider uppercase transition-all"
          >
            <span>Explore demo</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
