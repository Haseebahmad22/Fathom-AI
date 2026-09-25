"use client";

import React from "react";
import { Eye, Clock, Laptop } from "lucide-react";

export default function PillarSection() {
  const pillars = [
    {
      icon: Eye,
      title: "Zero detail fade",
      description:
        "Every client preference, pricing constraint, and technical requirement is recorded verbatim so you never deliver work against misremembered scope.",
    },
    {
      icon: Clock,
      title: "Five hours saved each week",
      description:
        "Eliminate the post-call manual writeup ritual. Shift administrative overhead straight into billable strategic output.",
    },
    {
      icon: Laptop,
      title: "Works where you already work",
      description:
        "Operates cleanly across Zoom, Google Meet, and Microsoft Teams without demanding that clients download software or talk to visible bot avatars.",
    },
  ];

  return (
    <section className="py-20 bg-app border-b border-border-subtle text-text-primary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-lg bg-surface border border-border-muted flex flex-col space-y-3"
              >
                <div className="text-text-muted">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-sm sm:text-base font-semibold text-text-primary tracking-tight">
                  {p.title}
                </h3>

                <p className="text-xs sm:text-sm text-text-secondary leading-normal">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
