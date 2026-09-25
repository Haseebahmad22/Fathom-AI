"use client";

import React, { useState } from "react";
import { X, Copy, Check, Mail, ExternalLink, Sparkles } from "lucide-react";
import { Meeting } from "@/lib/mock-data";

interface FollowUpEmailModalProps {
  meeting: Meeting;
  isOpen: boolean;
  onClose: () => void;
}

export default function FollowUpEmailModal({
  meeting,
  isOpen,
  onClose,
}: FollowUpEmailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const recipient = meeting.participants[1]?.email || "attendee@example.com";
  const subject = `Follow-up: ${meeting.title} — Notes & Next Steps`;

  const emailBody = `Hi ${meeting.participants[1]?.name.split(" ")[0] || "there"},

Thanks for taking the time to speak today! Here is a quick recap of our discussion:

Summary & Key Takeaways:
${meeting.summary.map((s) => `• ${s.category ? `${s.category}: ` : ""}${s.text}`).join("\n")}

Action Items & Next Steps:
${meeting.actionItems
  .map(
    (a) =>
      `• [${a.isDone ? "✓" : " "}] ${a.text}${
        a.assignee ? ` (${a.assignee})` : ""
      }${a.dueDate ? ` - Due: ${a.dueDate}` : ""}`
  )
  .join("\n")}

You can view the full recording and timestamped transcript anytime here:
https://fanthom.ai/meeting/${meeting.id}

Best regards,
${meeting.participants[0]?.name || "Fanthom Team"}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(emailBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(emailBody)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-[#121422] border border-[#2B2F4C] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#20243C] flex items-center justify-between bg-[#151829]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#00A3FF]/20 text-[#00A3FF]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Draft Follow-up Email
              </h3>
              <p className="text-[11px] text-white/50">
                AI-generated from meeting recap and action items
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Metadata Fields */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-16 text-white/40 font-medium">To:</span>
              <span className="font-mono text-white/80 bg-[#1A1D30] px-2 py-1 rounded border border-[#252A47]">
                {recipient}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-16 text-white/40 font-medium">Subject:</span>
              <span className="text-white/90 font-medium">{subject}</span>
            </div>
          </div>

          {/* Email Body Preview */}
          <div className="relative">
            <textarea
              readOnly
              value={emailBody}
              rows={12}
              className="w-full p-4 bg-[#0B0C15] border border-[#252A47] rounded-xl text-xs font-mono text-white/80 leading-relaxed focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[#20243C] bg-[#151829] flex items-center justify-between">
          <a
            href={mailtoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Open in Mail App</span>
            <ExternalLink className="w-3 h-3 text-white/40" />
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-white/60 hover:text-white transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#00A3FF] hover:bg-[#0092E6] text-white text-xs font-semibold shadow-md transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Draft</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
