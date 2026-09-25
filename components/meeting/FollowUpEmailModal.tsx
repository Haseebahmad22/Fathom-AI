"use client";

import React, { useState } from "react";
import { X, Copy, Check, Mail, ExternalLink } from "lucide-react";
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

Thanks for taking the time to speak today. Here is a recap of our discussion:

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="relative w-full max-w-xl bg-surface border border-border-strong rounded-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-border-subtle flex items-center justify-between bg-surface-elevated">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-text-muted" />
            <div>
              <h3 className="text-xs font-semibold text-text-primary">
                Draft follow-up email
              </h3>
              <p className="text-[11px] text-text-muted">
                Synthesized from call recap and next steps
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-surface transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-3 overflow-y-auto flex-1 bg-surface">
          {/* Metadata Fields */}
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-14 text-text-muted font-medium">To:</span>
              <span className="font-mono text-text-secondary bg-surface-elevated px-2 py-0.5 rounded-md border border-border-subtle">
                {recipient}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-14 text-text-muted font-medium">Subject:</span>
              <span className="text-text-primary font-medium">{subject}</span>
            </div>
          </div>

          {/* Email Body Preview */}
          <div>
            <textarea
              readOnly
              value={emailBody}
              rows={11}
              className="w-full p-3 bg-app border border-border-muted rounded-md text-xs font-mono text-text-secondary leading-normal focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-border-subtle bg-surface-elevated flex items-center justify-between">
          <a
            href={mailtoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-text-muted" />
            <span>Open in email client</span>
            <ExternalLink className="w-3 h-3 text-text-muted" />
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-md text-xs font-medium text-text-muted hover:text-text-primary transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-accent hover:bg-accent-hover text-white text-xs font-medium transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy draft</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
