"use client";

import React from "react";
import { Meeting } from "@/lib/mock-data";
import MeetingCard from "./MeetingCard";
import EmptyState from "./EmptyState";

interface MeetingCardGridProps {
  meetings: Meeting[];
  searchQuery: string;
  onClearSearch: () => void;
}

export default function MeetingCardGrid({
  meetings,
  searchQuery,
  onClearSearch,
}: MeetingCardGridProps) {
  // Filter by search query
  const filteredMeetings = meetings.filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) ||
      m.participants.some((p) => p.name.toLowerCase().includes(q)) ||
      m.summary.some((s) => s.text.toLowerCase().includes(q))
    );
  });

  if (filteredMeetings.length === 0) {
    return <EmptyState searchQuery={searchQuery} onClear={onClearSearch} />;
  }

  // Sort descending by date
  const sortedMeetings = [...filteredMeetings].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Group by Month Year
  const grouped: { [key: string]: Meeting[] } = {};
  for (const m of sortedMeetings) {
    const dateObj = new Date(m.date);
    const monthYear = dateObj.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }
    grouped[monthYear].push(m);
  }

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([monthYear, groupMeetings]) => (
        <div key={monthYear} className="space-y-3">
          <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
            {monthYear}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {groupMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
