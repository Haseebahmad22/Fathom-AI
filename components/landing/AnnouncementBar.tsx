"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

export default function AnnouncementBar() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="w-full bg-[#ECECF0] text-[#0A0A0F] py-2 px-4 text-xs font-semibold flex items-center justify-between z-50 relative select-none">
      <div className="flex-1 flex items-center justify-center gap-2 text-center">
        <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-black text-white text-[10px] font-bold">
          ✦
        </span>
        <span className="tracking-wide">
          FATHOM IS NOW PART OF SUPERHUMAN.
        </span>
        <Link
          href="https://fathom.video"
          target="_blank"
          className="underline hover:text-black/70 inline-flex items-center gap-1 font-bold ml-1 transition-colors"
        >
          <span>LEARN MORE</span>
          <ArrowRight className="w-3 h-3 inline stroke-[2.5]" />
        </Link>
      </div>
      <button
        onClick={() => setIsOpen(false)}
        aria-label="Close announcement"
        className="p-1 hover:bg-black/10 rounded transition-colors text-black"
      >
        <X className="w-3.5 h-3.5 stroke-[2.5]" />
      </button>
    </div>
  );
}
