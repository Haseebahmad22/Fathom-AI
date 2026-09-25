"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LandingNav() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-app border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-base font-bold tracking-tight text-text-primary">
            FATHOM
          </span>
          <span className="w-1.5 h-3.5 bg-accent rounded-xs" />
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-text-secondary">
          <a href="#overview" className="hover:text-text-primary transition-colors">
            Overview
          </a>
          <a href="#features" className="hover:text-text-primary transition-colors">
            Features
          </a>
          <a href="#pricing" className="hover:text-text-primary transition-colors">
            Pricing
          </a>
        </div>

        {/* Right CTA Links */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors px-2.5 py-1.5"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-accent hover:bg-accent-hover text-white text-xs font-medium transition-colors"
          >
            <span>Sign up free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
