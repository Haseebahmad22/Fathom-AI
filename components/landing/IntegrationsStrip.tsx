"use client";

import React from "react";
import { Video, Mail, Users2, Calendar } from "lucide-react";

export default function IntegrationsStrip() {
  const integrations = [
    { name: "Zoom", type: "Video conference", icon: Video },
    { name: "Google Meet", type: "Video conference", icon: Users2 },
    { name: "Microsoft Teams", type: "Video conference", icon: Calendar },
    { name: "Gmail", type: "Follow-up email", icon: Mail },
  ];

  return (
    <section className="py-14 bg-surface border-b border-border-subtle text-center select-none">
      <div className="max-w-6xl mx-auto px-6 space-y-6">
        <p className="text-xs font-medium text-text-muted">
          Zero configuration required • Compatible with your workflow
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {integrations.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="flex items-center gap-3 px-4 py-2.5 rounded-md bg-surface-elevated border border-border-muted"
              >
                <div className="text-text-muted">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-medium text-text-primary">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-text-muted">
                    {item.type}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
