"use client";

import React from "react";
import { ShieldCheck, UserCheck, Zap, Lock } from "lucide-react";

export default function TrustStrip() {
  return (
    <div className="w-full bg-surface border-b border-border-subtle py-3 text-text-secondary select-none">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-around gap-6 text-xs font-normal">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-text-muted" />
          <span>Built for solo consultants & freelancers</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Zap className="w-4 h-4 text-text-muted" />
          <span>Zero manual note-taking drag post-call</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-text-muted" />
          <span>Private, encrypted, and bot-free capture</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-text-muted" />
          <span>Meeting data is never used to train external models</span>
        </div>
      </div>
    </div>
  );
}
