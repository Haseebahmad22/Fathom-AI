"use client";

import React from "react";
import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer className="bg-[#0D0F14] text-[#9EA1B2] py-14 text-xs border-t border-[#151722]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand & Mission */}
        <div className="md:col-span-2 space-y-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-tight text-white">
              FATHOM
            </span>
            <span className="w-1.5 h-3 bg-[#00E5FF] rounded-xs" />
          </Link>

          <p className="text-[#5D6071] leading-normal max-w-sm">
            The AI meeting assistant designed for solo freelancers, consultants, and independent operators.
          </p>

          <p className="text-[11px] font-mono text-[#5D6071] pt-2">
            © {new Date().getFullYear()} Fanthom Inc. All rights reserved.
          </p>
        </div>

        {/* Link Columns */}
        <div>
          <div className="font-semibold text-white text-xs mb-3">
            Product
          </div>
          <ul className="space-y-2 text-[#5D6071]">
            <li>
              <a href="#features" className="hover:text-white transition-colors">
                Transcription
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-white transition-colors">
                Action items
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-white transition-colors">
                Ask Fanthom
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-white transition-colors">
                Follow-up drafts
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-semibold text-white text-xs mb-3">
            Company
          </div>
          <ul className="space-y-2 text-[#5D6071]">
            <li>
              <a href="#overview" className="hover:text-white transition-colors">
                About Fanthom
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-white transition-colors">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Changelog
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-semibold text-white text-xs mb-3">
            Legal & Privacy
          </div>
          <ul className="space-y-2 text-[#5D6071]">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Privacy policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Terms of service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Security architecture
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
