"use client";

import React, { useState } from "react";
import { Volume2, VolumeX, Maximize2, Play, Pause } from "lucide-react";
import { Meeting } from "@/lib/mock-data";

interface VideoPlayerProps {
  meeting: Meeting;
  currentSeconds: number;
  onSeek: (seconds: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export default function VideoPlayer({
  meeting,
  currentSeconds,
  onSeek,
  isPlaying,
  onTogglePlay,
}: VideoPlayerProps) {
  const [speed, setSpeed] = useState<string>("1x");
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const totalSeconds = meeting.durationMinutes * 60;
  const progressPercent = Math.min(100, (currentSeconds / totalSeconds) * 100);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder.toString().padStart(2, "0")}`;
  };

  const cycleSpeed = () => {
    const speeds = ["1x", "1.25x", "1.5x", "2x"];
    const nextIdx = (speeds.indexOf(speed) + 1) % speeds.length;
    setSpeed(speeds[nextIdx]);
  };

  const p1 = meeting.participants[0] || { name: "Host", role: "Host" };
  const p2 = meeting.participants[1] || { name: "Guest", role: "Attendee" };

  return (
    <div className="w-full bg-app border-b border-border-subtle flex flex-col">
      {/* Video Area */}
      <div className="relative w-full aspect-[16/9] max-h-[360px] bg-app overflow-hidden flex items-center justify-center group">
        <div className="w-full h-full grid grid-cols-2 gap-2 p-3">
          {/* Tile 1 */}
          <div className="relative rounded-lg bg-surface border border-border-muted overflow-hidden flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-md bg-surface-elevated border border-border-subtle flex items-center justify-center text-text-primary text-xl font-bold font-mono">
              {p1.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <span className="absolute bottom-2.5 left-3 text-[11px] font-medium text-text-secondary bg-surface-elevated border border-border-subtle px-2 py-0.5 rounded-md">
              {p1.name}
            </span>
          </div>

          {/* Tile 2 */}
          <div className="relative rounded-lg bg-surface border border-border-muted overflow-hidden flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-md bg-surface-elevated border border-border-subtle flex items-center justify-center text-text-primary text-xl font-bold font-mono">
              {p2.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <span className="absolute bottom-2.5 left-3 text-[11px] font-medium text-text-secondary bg-surface-elevated border border-border-subtle px-2 py-0.5 rounded-md">
              {p2.name}
            </span>
          </div>
        </div>

        {/* Center Play Button & Duration Badge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <button
            onClick={onTogglePlay}
            className="pointer-events-auto w-12 h-12 rounded-md bg-accent hover:bg-accent-hover flex items-center justify-center text-white transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>
          <span className="mt-2.5 text-[11px] font-mono text-text-muted bg-surface border border-border-subtle px-2 py-0.5 rounded-md">
            {meeting.durationMinutes} mins
          </span>
        </div>
      </div>

      {/* Audio/Video Scrubber Bar */}
      <div className="px-4 py-2 bg-surface flex items-center gap-3 text-xs text-text-secondary select-none border-t border-border-subtle">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="text-text-muted hover:text-text-primary transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <span className="font-mono text-[11px] text-text-muted min-w-[32px]">
          {formatTime(currentSeconds)}
        </span>

        {/* Scrubber timeline */}
        <div
          className="relative flex-1 h-1.5 bg-surface-elevated rounded-sm cursor-pointer overflow-hidden"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            onSeek(Math.floor(clickPos * totalSeconds));
          }}
        >
          {/* Active play progress */}
          <div
            className="absolute left-0 top-0 bottom-0 bg-accent rounded-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Speed toggle */}
        <button
          onClick={cycleSpeed}
          className="px-1.5 py-0.5 rounded-md font-mono text-[11px] text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors"
        >
          {speed}
        </button>

        {/* Fullscreen icon */}
        <button className="text-text-muted hover:text-text-primary transition-colors">
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
