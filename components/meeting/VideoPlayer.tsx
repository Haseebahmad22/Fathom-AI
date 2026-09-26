"use client";

import React, { useState } from "react";
import {
  Volume2,
  VolumeX,
  Maximize2,
  Play,
  Pause,
  Video,
  Radio,
} from "lucide-react";
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
  const [imgSrc, setImgSrc] = useState<string>(() => {
    if (meeting.thumbnail) return meeting.thumbnail;
    if (meeting.id === "meeting-2") return "/images/thumb_standup.jpg";
    if (meeting.id === "meeting-3") return "/images/thumb_onboarding.jpg";
    if (meeting.id === "meeting-4") return "/images/thumb_oneone.jpg";
    if (meeting.id === "meeting-5") return "/images/thumb_planning.jpg";
    return "/images/thumb_sales.jpg";
  });

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

  const activeSpeaker = meeting.participants[0] || {
    name: "Alex Morgan",
    role: "Host",
  };

  return (
    <div className="w-full bg-[#050608] border-b border-[#1A1D2E] flex flex-col select-none shrink-0">
      {/* Compact Video / Thumbnail Display Area */}
      <div className="relative w-full aspect-[16/9] max-h-[220px] lg:max-h-[250px] xl:max-h-[280px] bg-[#0A0C12] overflow-hidden flex items-center justify-center group">
        {/* Crisp Meeting Thumbnail Image */}
        <img
          src={imgSrc}
          alt={meeting.title}
          onError={() => setImgSrc("/images/thumb_sales.jpg")}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
            isPlaying ? "scale-105 filter brightness-95" : "group-hover:scale-102"
          }`}
        />

        {/* Cinematic gradient vignette & overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/90 via-black/20 to-black/40 pointer-events-none" />

        {/* Top-Left: Live / Call Recording Badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 pointer-events-none">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-medium text-white shadow-lg">
            <Radio className={`w-3 h-3 ${isPlaying ? "text-[#00E5FF] animate-pulse" : "text-emerald-400"}`} />
            <span>{isPlaying ? "Playing recording" : "Call Recording"}</span>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#8E92A6]">
            1080p
          </div>
        </div>

        {/* Top-Right: Video Details Tag */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 pointer-events-none">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-medium text-white shadow-lg">
            <Video className="w-3 h-3 text-[#00E5FF]" />
            <span>{meeting.durationMinutes} min capture</span>
          </div>
        </div>

        {/* Bottom-Left: Active Speaker Badge */}
        <div className="absolute bottom-2.5 left-2.5 pointer-events-none flex items-center gap-1.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[11px] text-white shadow-lg">
            <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-[#00E5FF] animate-ping" : "bg-emerald-400"}`} />
            <span className="font-medium">{activeSpeaker.name}</span>
            <span className="text-[#8E92A6] text-[10px]">({activeSpeaker.role || "Host"})</span>
          </div>
        </div>

        {/* Center Play / Pause Floating Controller */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <button
            onClick={onTogglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="group/btn relative w-12 h-12 rounded-full bg-[#00E5FF] hover:bg-[#38EDFF] flex items-center justify-center text-[#050608] transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.35)] hover:shadow-[0_0_35px_rgba(0,229,255,0.6)] hover:scale-105 active:scale-95 cursor-pointer z-10"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
            {/* Pulsing ring on hover */}
            <span className="absolute inset-0 rounded-full border border-[#00E5FF] animate-ping opacity-25 group-hover/btn:opacity-60" />
          </button>
        </div>
      </div>

      {/* Audio / Video Scrubber Timeline Bar - Compact Height */}
      <div className="px-4 py-2 bg-[#0A0C12] flex items-center gap-3 text-xs select-none border-t border-[#1A1D2E]">
        {/* Mute button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="text-[#8E92A6] hover:text-white transition-colors p-0.5 rounded hover:bg-[#12141D]"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        {/* Current Elapsed Time */}
        <span className="font-mono text-[11px] font-medium text-white min-w-[32px]">
          {formatTime(currentSeconds)}
        </span>

        {/* Scrubber timeline track */}
        <div
          className="relative flex-1 h-1.5 hover:h-2 bg-[#1A1D2E] rounded-full cursor-pointer overflow-hidden group/track transition-all"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            onSeek(Math.floor(clickPos * totalSeconds));
          }}
        >
          {/* Active play progress gradient */}
          <div
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#00E5FF] to-[#38EDFF] rounded-full transition-[width] duration-150 shadow-[0_0_8px_rgba(0,229,255,0.4)]"
            style={{ width: `${progressPercent}%` }}
          />
          {/* Scrubber handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-md shadow-[#00E5FF]/60 opacity-0 group-hover/track:opacity-100 transition-opacity pointer-events-none"
            style={{ left: `calc(${progressPercent}% - 5px)` }}
          />
        </div>

        {/* Total Duration */}
        <span className="font-mono text-[11px] text-[#555869] min-w-[32px] text-right">
          {formatTime(totalSeconds)}
        </span>

        {/* Playback Speed Toggle */}
        <button
          onClick={cycleSpeed}
          className="px-2 py-0.5 rounded font-mono text-[10px] font-semibold text-[#8E92A6] hover:text-white bg-[#12141D] hover:bg-[#1A1D2E] border border-[#1E2030] hover:border-[#353950] transition-all"
          title="Playback speed"
        >
          {speed}
        </button>

        {/* Fullscreen Toggle */}
        <button
          className="text-[#8E92A6] hover:text-white transition-colors p-0.5 rounded hover:bg-[#12141D]"
          title="Fullscreen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
