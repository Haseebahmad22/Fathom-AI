"use client";

import React from "react";
import Link from "next/link";
import { Play, Users, CheckSquare } from "lucide-react";
import { Meeting } from "@/lib/mock-data";

interface MeetingCardProps {
  meeting: Meeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Date(meeting.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/meeting/${meeting.id}`}
      className="group flex flex-col w-full max-w-[280px] select-none"
    >
      {/* Video Thumbnail Preview Block (matching Fathom screenshot) */}
      <div className="relative aspect-[16/10] w-full rounded-xl bg-[#141624] border border-[#202336] group-hover:border-[#00A3FF]/50 overflow-hidden transition-all duration-200 shadow-md flex items-center justify-center">
        {/* Mock Video / Screen Share Layout */}
        <div className="w-full h-full p-2.5 flex items-center justify-between gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          {/* Main share screen area */}
          <div className="flex-1 h-full rounded-lg bg-[#0C0E1A] border border-[#232742] p-2 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="w-12 h-1.5 rounded-full bg-[#00A3FF]/40" />
              <div className="w-20 h-1 rounded-full bg-white/10" />
              <div className="w-16 h-1 rounded-full bg-white/10" />
            </div>

            {/* Play hover button */}
            <div className="self-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#00A3FF] flex items-center justify-center text-white transition-all transform group-hover:scale-110 shadow-lg">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>

            <div className="w-8 h-1 rounded-full bg-white/10" />
          </div>

          {/* Attendee tiles stacked on right (matching screenshot) */}
          <div className="w-14 h-full flex flex-col gap-1.5">
            <div className="flex-1 rounded-md bg-[#1B1E33] border border-[#2F3456] flex items-center justify-center font-bold text-[9px] text-white/70">
              {meeting.participants[0]?.initials || "P1"}
            </div>
            <div className="flex-1 rounded-md bg-[#1F233B] border border-emerald-500/30 flex items-center justify-center font-bold text-[9px] text-white/70">
              {meeting.participants[1]?.initials || "P2"}
            </div>
          </div>
        </div>

        {/* Duration badge overlaid on bottom right */}
        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm text-[11px] font-semibold text-white/90">
          {meeting.durationMinutes} mins
        </div>
      </div>

      {/* Title & Metadata */}
      <div className="mt-2.5 space-y-1">
        <h3 className="text-xs font-semibold text-white group-hover:text-[#00A3FF] transition-colors truncate">
          {meeting.title}
        </h3>

        <div className="flex items-center gap-3 text-[11px] text-white/40">
          <span>{formattedDate}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {meeting.participants.length}
          </span>
          {meeting.actionItems.length > 0 && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#00A3FF]">
                <CheckSquare className="w-3 h-3" />
                {meeting.actionItems.filter((a) => a.isDone).length}/
                {meeting.actionItems.length}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
