"use client";

import React, { useState } from "react";
import {
  Upload,
  X,
  FileVideo,
  FileAudio,
  Sparkles,
  Loader2,
  CheckCircle,
  Clock,
  Calendar,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Meeting, saveCustomMeeting } from "@/lib/mock-data";

interface UploadRecordingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMeetingUploaded: (newMeeting: Meeting) => void;
}

export default function UploadRecordingModal({
  isOpen,
  onClose,
  onMeetingUploaded,
}: UploadRecordingModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [template, setTemplate] = useState("enhanced");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  if (!isOpen) return null;

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selected = e.dataTransfer.files[0];
      setFile(selected);
      if (!title) {
        setTitle(selected.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      if (!title) {
        setTitle(selected.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsProcessing(true);
    setProcessingStep(1);

    // Step progression simulation
    setTimeout(() => {
      setProcessingStep(2);
      setTimeout(() => {
        setProcessingStep(3);
        setTimeout(() => {
          // Generate full meeting object
          const newMeetingId = `meeting-${Date.now()}`;
          const newMeeting: Meeting = {
            id: newMeetingId,
            title: title.trim(),
            date: new Date().toISOString(),
            durationMinutes: Number(durationMinutes) || 25,
            thumbnail: "/images/thumb_planning.jpg",
            participants: [
              {
                name: "Haseeb Ahmad",
                email: "haseeb@fanthom.ai",
                initials: "HA",
                avatarColor: "#00E5FF",
                role: "Host",
              },
              {
                name: company.trim() ? `${company.trim()} Representative` : "Guest Attendee",
                email: "guest@external.com",
                initials: company ? company[0].toUpperCase() : "G",
                avatarColor: "#A855F7",
                role: "Client",
              },
            ],
            summary: [
              {
                id: `s-${Date.now()}-1`,
                meetingId: newMeetingId,
                order: 1,
                category: "Executive Summary",
                text: `Reviewed key milestones, strategic deliverables, and operational requirements for ${title.trim()}.`,
              },
              {
                id: `s-${Date.now()}-2`,
                meetingId: newMeetingId,
                order: 2,
                category: "Key Decisions",
                text: "Agreed on core scope priorities and aligned on weekly Friday status updates.",
              },
              {
                id: `s-${Date.now()}-3`,
                meetingId: newMeetingId,
                order: 3,
                category: "Next Steps",
                text: "Team will review technical architecture draft and finalize sign-off by next sprint.",
              },
            ],
            actionItems: [
              {
                id: `a-${Date.now()}-1`,
                meetingId: newMeetingId,
                text: "Send summary recap and linked documentation to all stakeholders",
                isDone: false,
                assignee: "Haseeb Ahmad",
                dueDate: "Tomorrow",
              },
              {
                id: `a-${Date.now()}-2`,
                meetingId: newMeetingId,
                text: "Schedule deep-dive follow-up sync for milestone review",
                isDone: false,
                assignee: "Haseeb Ahmad",
                dueDate: "Next Week",
              },
            ],
            highlights: [
              {
                id: `h-${Date.now()}-1`,
                meetingId: newMeetingId,
                timestampSeconds: 140,
                speakerName: "Haseeb Ahmad",
                quoteText: "Our main focus is eliminating operational drag and delivering frictionless velocity.",
              },
            ],
            transcript: [
              {
                id: `t-${Date.now()}-1`,
                meetingId: newMeetingId,
                speakerName: "Haseeb Ahmad",
                speakerInitials: "HA",
                timestampSeconds: 15,
                text: `Hello everyone, thanks for joining today's session on ${title.trim()}. Let's dive straight into the key priorities.`,
              },
              {
                id: `t-${Date.now()}-2`,
                meetingId: newMeetingId,
                speakerName: company.trim() ? `${company.trim()} Representative` : "Guest Attendee",
                speakerInitials: company ? company[0].toUpperCase() : "G",
                timestampSeconds: 45,
                text: "Great to connect. We are looking forward to aligning our roadmaps and accelerating this partnership.",
              },
              {
                id: `t-${Date.now()}-3`,
                meetingId: newMeetingId,
                speakerName: "Haseeb Ahmad",
                speakerInitials: "HA",
                timestampSeconds: 140,
                text: "Our main focus is eliminating operational drag and delivering frictionless velocity across our entire stack.",
              },
            ],
          };

          saveCustomMeeting(newMeeting);
          setIsProcessing(false);
          onMeetingUploaded(newMeeting);
          onClose();
        }, 800);
      }, 800);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#0A0C12] border border-[#1E2030] rounded-2xl shadow-2xl overflow-hidden flex flex-col text-white"
      >
        {/* Header */}
        <div className="p-4 px-6 border-b border-[#1A1D2E] flex items-center justify-between bg-[#0E111A]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00E5FF]/20 to-[#7C3AED]/20 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Upload & Process Recording
              </h2>
              <p className="text-xs text-[#8E92A6]">
                Upload any offline MP4 or audio file for AI transcription and summarization
              </p>
            </div>
          </div>

          {!isProcessing && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#6B6F82] hover:text-white hover:bg-[#12141D] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Body */}
        {isProcessing ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] mx-auto animate-pulse">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-white">
                {processingStep === 1 && "Uploading media file..."}
                {processingStep === 2 && "Transcribing dialogue with Whisper..."}
                {processingStep === 3 && "Synthesizing AI summary & tasks..."}
              </h3>
              <p className="text-xs text-[#8E92A6]">
                Fanthom&apos;s bot-free pipeline is extracting speakers, quotes, and action items.
              </p>
            </div>

            {/* Stepper Dots */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <div
                className={`w-3 h-3 rounded-full transition-all ${
                  processingStep >= 1 ? "bg-[#00E5FF] scale-110" : "bg-[#1E2030]"
                }`}
              />
              <div className="w-6 h-0.5 bg-[#1E2030]" />
              <div
                className={`w-3 h-3 rounded-full transition-all ${
                  processingStep >= 2 ? "bg-[#00E5FF] scale-110" : "bg-[#1E2030]"
                }`}
              />
              <div className="w-6 h-0.5 bg-[#1E2030]" />
              <div
                className={`w-3 h-3 rounded-full transition-all ${
                  processingStep >= 3 ? "bg-[#00E5FF] scale-110" : "bg-[#1E2030]"
                }`}
              />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Drag & Drop Zone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className="border-2 border-dashed border-[#1E2030] hover:border-[#00E5FF]/50 rounded-2xl p-6 text-center transition-colors bg-[#12141D]/30 relative cursor-pointer group"
            >
              <input
                type="file"
                accept="video/*,audio/*"
                onChange={handleFileSelect}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="w-10 h-10 rounded-xl bg-[#12141D] border border-[#1E2030] group-hover:border-[#00E5FF]/40 flex items-center justify-center text-[#555869] group-hover:text-[#00E5FF] mx-auto mb-2.5 transition-colors">
                {file ? <FileVideo className="w-5 h-5 text-[#00E5FF]" /> : <Upload className="w-5 h-5" />}
              </div>
              <p className="text-xs font-semibold text-white">
                {file ? file.name : "Click or drag & drop meeting media file"}
              </p>
              <p className="text-[11px] text-[#555869] mt-0.5">
                MP4, MOV, MP3, M4A, or WAV (up to 2GB)
              </p>
            </div>

            {/* Inputs */}
            <div>
              <label className="block text-xs font-semibold text-[#8E92A6] mb-1.5 uppercase tracking-wider">
                Meeting Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Sprint Review with Stripe Team"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-[#12141D] border border-[#1E2030] focus:border-[#00E5FF]/50 rounded-xl text-xs text-white placeholder-[#555869] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#8E92A6] mb-1.5 uppercase tracking-wider">
                  Client / Partner (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acme Corp"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#12141D] border border-[#1E2030] focus:border-[#00E5FF]/50 rounded-xl text-xs text-white placeholder-[#555869] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8E92A6] mb-1.5 uppercase tracking-wider">
                  Duration (Minutes)
                </label>
                <input
                  type="number"
                  min="5"
                  max="180"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full px-3.5 py-2 bg-[#12141D] border border-[#1E2030] focus:border-[#00E5FF]/50 rounded-xl text-xs text-white placeholder-[#555869] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8E92A6] mb-1.5 uppercase tracking-wider">
                AI Summary Framework
              </label>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#12141D] border border-[#1E2030] focus:border-[#00E5FF]/50 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value="enhanced">Enhanced (Universal Executive Summary)</option>
                <option value="sales">Sales Discovery & Velocity</option>
                <option value="sales-sandler">Sales - Sandler</option>
                <option value="sales-meddpicc">Sales - MEDDPICC</option>
                <option value="customer-success">Customer Success</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#1A1D2E]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#8E92A6] hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!title.trim()}
                className="px-4 py-2 rounded-xl bg-[#00E5FF] hover:bg-[#38EDFF] disabled:opacity-30 text-[#050608] font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#00E5FF]/20 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Upload & Generate Recap</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
