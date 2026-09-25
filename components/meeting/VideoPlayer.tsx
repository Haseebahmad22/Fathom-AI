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
    <div className="w-full bg-[#0E0F1A] border-b border-[#1E2032] flex flex-col">
      {/* Video Area */}
      <div className="relative w-full aspect-[16/9] max-h-[380px] bg-[#07080F] overflow-hidden flex items-center justify-center group">
        <div className="w-full h-full grid grid-cols-2 gap-1 p-2">
          {/* Tile 1 */}
          <div className="relative rounded-lg bg-[#141625] border border-[#2A2D45] overflow-hidden flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#303352] to-[#4E46DC]/50 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {p1.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <span className="absolute bottom-2 left-3 text-[11px] font-medium text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
              {p1.name}
            </span>
          </div>

          {/* Tile 2 */}
          <div className="relative rounded-lg bg-[#141625] border border-emerald-500/40 overflow-hidden flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#253245] to-[#FF6B5B]/50 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {p2.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <span className="absolute bottom-2 left-3 text-[11px] font-medium text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
              {p2.name}
            </span>
          </div>
        </div>

        {/* Center Big Play Button & Duration Badge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <button
            onClick={onTogglePlay}
            className="pointer-events-auto w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-105 shadow-xl text-white pl-1"
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 text-white fill-current" />
            ) : (
              <Play className="w-7 h-7 text-white fill-current" />
            )}
          </button>
          <span className="mt-3 text-xs font-semibold text-white/90 bg-black/60 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
            {meeting.durationMinutes} mins
          </span>
        </div>
      </div>

      {/* Audio/Video Scrubber Bar */}
      <div className="px-4 py-2.5 bg-[#0A0B14] flex items-center gap-3 text-xs text-white/80 select-none">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="text-white/70 hover:text-white transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <span className="font-mono text-[12px] text-white/90 min-w-[32px]">
          {formatTime(currentSeconds)}
        </span>

        {/* Scrubber timeline with cyan highlight segments */}
        <div
          className="relative flex-1 h-2 bg-[#202336] rounded-full cursor-pointer overflow-hidden group/bar"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            onSeek(Math.floor(clickPos * totalSeconds));
          }}
        >
          {/* Active play progress */}
          <div
            className="absolute left-0 top-0 bottom-0 bg-[#00A3FF] rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
          {/* Segment marks from screenshot */}
          <div className="absolute top-0 bottom-0 left-[15%] w-[8%] bg-[#00A3FF]/70 rounded-full" />
          <div className="absolute top-0 bottom-0 left-[35%] w-[12%] bg-[#00A3FF]/80 rounded-full" />
          <div className="absolute top-0 bottom-0 left-[60%] w-[18%] bg-[#00A3FF]/90 rounded-full" />
        </div>

        {/* Speed toggle */}
        <button
          onClick={cycleSpeed}
          className="px-2 py-0.5 rounded text-[11px] font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          {speed}
        </button>

        {/* Fullscreen icon */}
        <button className="text-white/70 hover:text-white transition-colors">
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
