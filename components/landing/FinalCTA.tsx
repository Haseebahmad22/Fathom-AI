"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="bg-app text-text-primary py-20 border-b border-border-subtle">
      <div className="max-w-3xl mx-auto px-6 text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface-elevated border border-border-muted text-xs font-medium text-text-secondary">
          <span>Get started in minutes</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary leading-tight">
          Be present in your next client meeting
        </h2>

        <p className="text-xs sm:text-sm text-text-secondary max-w-lg mx-auto leading-normal">
          Sign up free, connect in 30 seconds, and receive an automated recap and ready-to-send follow-up email after your next call.
        </p>

        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-accent hover:bg-accent-hover text-white font-medium text-xs transition-colors"
          >
            <span>Get started free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-transparent hover:bg-surface-elevated border border-border-muted text-text-primary font-medium text-xs transition-colors"
          >
            <span>Explore demo</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
