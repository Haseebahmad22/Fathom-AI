"use client";

import React from "react";
import Link from "next/link";
import { Play, Users, CheckSquare, Clock } from "lucide-react";
import { Meeting } from "@/lib/mock-data";

interface MeetingCardProps {
  meeting: Meeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Date(meeting.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const formattedTime = new Date(meeting.date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <Link
      href={`/meeting/${meeting.id}`}
      className="group flex flex-col w-full select-none"
    >
      {/* Thumbnail with hover overlay */}
      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#12141D] border border-[#1E2030] group-hover:border-[#353950] transition-all">
        {meeting.thumbnail ? (
          <img
            src={meeting.thumbnail}
            alt={meeting.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          /* Fallback: initials grid */
          <div className="w-full h-full grid grid-cols-2 gap-1.5 p-3">
            {meeting.participants.slice(0, 4).map((p, i) => (
              <div
                key={i}
                className="rounded-lg bg-[#1A1D2E] flex items-center justify-center"
              >
                <span className="text-lg font-bold text-[#6B6F82] font-mono">
                  {p.initials}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play button centered on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-[#00E5FF] flex items-center justify-center shadow-lg shadow-[#00E5FF]/30 scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-5 h-5 text-[#050608] fill-current ml-0.5" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm text-[11px] font-medium text-white font-mono">
          {meeting.durationMinutes}:{String(0).padStart(2, "0")}
        </div>

        {/* Participant count badge */}
        <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-[11px] font-medium text-white flex items-center gap-1">
          <Users className="w-3 h-3" />
          {meeting.participants.length}
        </div>
      </div>

      {/* Card Content */}
      <div className="mt-3 space-y-1.5 px-0.5">
        <h3 className="text-sm font-semibold text-white group-hover:text-[#00E5FF] transition-colors truncate leading-tight">
          {meeting.title}
        </h3>

        <div className="flex items-center gap-3 text-xs text-[#8E92A6]">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#555869]" />
            {formattedDate} · {formattedTime}
          </span>

          {meeting.actionItems.length > 0 && (
            <span className="flex items-center gap-1 text-[#8E92A6]">
              <CheckSquare className="w-3 h-3 text-[#555869]" />
              {meeting.actionItems.filter((a) => a.isDone).length}/
              {meeting.actionItems.length}
            </span>
          )}
        </div>

        {/* Participant Avatars Row */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center -space-x-1.5">
            {meeting.participants.slice(0, 4).map((p, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-[#0A0C12] flex items-center justify-center text-[9px] font-bold text-white"
                style={{ backgroundColor: p.avatarColor }}
                title={p.name}
              >
                {p.initials}
              </div>
            ))}
            {meeting.participants.length > 4 && (
              <div className="w-6 h-6 rounded-full border-2 border-[#0A0C12] bg-[#1E2030] flex items-center justify-center text-[9px] font-medium text-[#8E92A6]">
                +{meeting.participants.length - 4}
              </div>
            )}
          </div>

          {/* Shared By Badge */}
          {meeting.sharedBy && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#12141D] border border-[#1E2030] text-[11px] text-[#A6A9B8]">
              <span className="w-3.5 h-3.5 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/30 flex items-center justify-center text-[7px] font-bold shrink-0">
                {meeting.sharedBy.avatarInitials}
              </span>
              <span className="truncate max-w-[130px]">
                Shared by <strong className="text-white font-medium">{meeting.sharedBy.name}</strong>
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
