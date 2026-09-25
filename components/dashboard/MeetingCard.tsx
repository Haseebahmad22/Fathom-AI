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
      {/* Video Thumbnail Preview Block: Flat surface + hairline border */}
      <div className="relative aspect-[16/10] w-full rounded-lg bg-surface border border-border-muted group-hover:border-border-strong overflow-hidden transition-colors flex items-center justify-center">
        {/* Mock Screen Share Layout */}
        <div className="w-full h-full p-2.5 flex items-center justify-between gap-2">
          {/* Main share screen area */}
          <div className="flex-1 h-full rounded-md bg-app border border-border-subtle p-2 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="w-12 h-1 rounded-sm bg-border-strong" />
              <div className="w-20 h-1 rounded-sm bg-border-muted" />
              <div className="w-16 h-1 rounded-sm bg-border-muted" />
            </div>

            {/* Play hover button */}
            <div className="self-center w-8 h-8 rounded-md bg-surface-elevated group-hover:bg-accent flex items-center justify-center text-text-primary group-hover:text-white transition-colors">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>

            <div className="w-8 h-1 rounded-sm bg-border-muted" />
          </div>

          {/* Attendee tiles stacked on right */}
          <div className="w-12 h-full flex flex-col gap-1.5">
            <div className="flex-1 rounded-md bg-surface-elevated border border-border-subtle flex items-center justify-center font-mono text-[9px] text-text-muted">
              {meeting.participants[0]?.initials || "P1"}
            </div>
            <div className="flex-1 rounded-md bg-surface-elevated border border-border-subtle flex items-center justify-center font-mono text-[9px] text-text-muted">
              {meeting.participants[1]?.initials || "P2"}
            </div>
          </div>
        </div>

        {/* Duration badge overlaid on bottom right */}
        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-md bg-app border border-border-subtle text-[10px] font-mono text-text-secondary">
          {meeting.durationMinutes}m
        </div>
      </div>

      {/* Title & Metadata */}
      <div className="mt-2 space-y-1">
        <h3 className="text-xs font-medium text-text-primary group-hover:text-text-primary transition-colors truncate">
          {meeting.title}
        </h3>

        <div className="flex items-center gap-2.5 text-[11px] font-mono text-text-muted">
          <span>{formattedDate}</span>
          <span>•</span>
          <span className="flex items-center gap-1 font-sans">
            <Users className="w-3 h-3 text-text-muted" />
            {meeting.participants.length}
          </span>
          {meeting.actionItems.length > 0 && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1 font-sans text-text-secondary">
                <CheckSquare className="w-3 h-3 text-text-muted" />
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
