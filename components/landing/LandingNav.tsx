"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function LandingNav() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#050608] border-b border-[#151722]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-[88px] flex items-center justify-between">
        {/* Brand Logo — FATHOM with blue wave marks */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="text-[22px] font-black tracking-tight text-white font-sans">
            FATHOM
          </span>
          {/* Blue wave marks matching the reference */}
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" className="mt-0.5">
            <path d="M2 12C4 4 8 2 11 8C14 14 18 12 20 4" stroke="#00B8D4" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M6 14C8 6 12 4 15 10C18 16 20 10 22 6" stroke="#00B8D4" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          </svg>
        </Link>

        {/* Center Nav Links — glassmorphic pill container */}
        <div className="hidden lg:flex items-center gap-0.5 bg-[#0D0F14]/80 border border-[#1E2030] rounded-full px-2 py-1.5 backdrop-blur-sm">
          <a
            href="#overview"
            className="px-4 py-2 text-[13px] text-white font-medium hover:text-white/80 transition-colors rounded-full"
          >
            Overview
          </a>
          <button
            type="button"
            className="inline-flex items-center gap-1 px-4 py-2 text-[13px] text-[#B0B3C2] font-medium hover:text-white transition-colors rounded-full"
          >
            <span>Solutions</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1 px-4 py-2 text-[13px] text-[#B0B3C2] font-medium hover:text-white transition-colors rounded-full"
          >
            <span>Integrations</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1 px-4 py-2 text-[13px] text-[#B0B3C2] font-medium hover:text-white transition-colors rounded-full"
          >
            <span>Resources</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </button>
          <a
            href="#pricing"
            className="px-4 py-2 text-[13px] text-[#B0B3C2] font-medium hover:text-white transition-colors rounded-full"
          >
            Pricing
          </a>
        </div>

        {/* Right CTA Group */}
        <div className="flex items-center gap-5 text-[13px] font-medium shrink-0">
          <Link
            href="/dashboard"
            className="hidden sm:inline-block text-[#B0B3C2] hover:text-white transition-colors"
          >
            Book a Demo
          </Link>

          <Link
            href="/login"
            className="text-[#B0B3C2] hover:text-white transition-colors"
          >
            Log In
          </Link>

          <Link
            href="/signup"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00E5FF] via-[#00D4EA] to-[#00C4D6] hover:from-[#38EDFF] hover:via-[#38E0F0] hover:to-[#38D5E0] text-[#050608] text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_16px_rgba(0,229,255,0.25)] hover:shadow-[0_0_24px_rgba(0,229,255,0.4)]"
          >
            SIGN UP FREE
          </Link>
        </div>
      </div>
    </nav>
  );
}
