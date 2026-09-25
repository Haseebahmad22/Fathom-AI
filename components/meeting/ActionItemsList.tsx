"use client";

import React, { useState } from "react";
import { Check, Bot, Calendar, User as UserIcon, Plus } from "lucide-react";
import { ActionItem } from "@/lib/mock-data";

interface ActionItemsListProps {
  initialItems: ActionItem[];
  onExtractMore?: () => void;
}

export default function ActionItemsList({
  initialItems,
  onExtractMore,
}: ActionItemsListProps) {
  const [items, setItems] = useState<ActionItem[]>(initialItems);
  const [isExtracting, setIsExtracting] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const toggleDone = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  const handleExtract = () => {
    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
      if (onExtractMore) onExtractMore();
    }, 600);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    const newItem: ActionItem = {
      id: `custom-${Date.now()}`,
      meetingId: items[0]?.meetingId || "meeting-1",
      text: newItemText.trim(),
      isDone: false,
      assignee: "You",
      dueDate: "Tomorrow",
    };
    setItems((prev) => [newItem, ...prev]);
    setNewItemText("");
    setIsAdding(false);
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-white/50">
          Action Items
        </h4>
        <span className="text-[11px] font-mono text-white/40">
          {items.filter((i) => i.isDone).length}/{items.length} done
        </span>
      </div>

      {/* Primary Action Button from Screenshot */}
      <button
        onClick={handleExtract}
        disabled={isExtracting}
        className="w-full py-2.5 px-4 rounded-xl bg-[#00A3FF]/10 hover:bg-[#00A3FF]/20 border border-[#00A3FF]/30 hover:border-[#00A3FF]/60 text-xs font-semibold text-[#00A3FF] flex items-center justify-center gap-2 transition-all duration-150 group shadow-sm"
      >
        <Bot className="w-4 h-4 text-[#00A3FF] group-hover:scale-110 transition-transform" />
        <span>
          {isExtracting
            ? "Extracting new items..."
            : "Extract Action Items from Transcript"}
        </span>
      </button>

      {/* Interactive Items List */}
      <div className="space-y-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleDone(item.id)}
            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 group ${
              item.isDone
                ? "bg-[#10121F]/60 border-[#1C1F33] opacity-60"
                : "bg-[#141625] border-[#22253B] hover:border-[#343859] hover:bg-[#181B2E]"
            }`}
          >
            {/* Custom Checkbox matching Fathom */}
            <div
              className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                item.isDone
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "border-[#3A3E60] group-hover:border-[#00A3FF] bg-[#0E101D]"
              }`}
            >
              {item.isDone && <Check className="w-3 h-3 stroke-[3]" />}
            </div>

            {/* Content & Metadata */}
            <div className="flex-1 min-w-0">
              <p
                className={`text-xs leading-relaxed transition-all ${
                  item.isDone
                    ? "line-through text-white/40"
                    : "text-white/90 group-hover:text-white"
                }`}
              >
                {item.text}
              </p>

              {(item.assignee || item.dueDate) && (
                <div className="flex items-center gap-2 mt-2">
                  {item.assignee && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#1F2338] text-white/70 border border-[#2F3452]">
                      <UserIcon className="w-2.5 h-2.5 text-[#00A3FF]" />
                      {item.assignee}
                    </span>
                  )}
                  {item.dueDate && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-white/40 font-mono">
                      <Calendar className="w-2.5 h-2.5" />
                      {item.dueDate}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add new action item toggle */}
      {isAdding ? (
        <form onSubmit={handleAddItem} className="flex gap-2 pt-1">
          <input
            type="text"
            placeholder="Add new task..."
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            autoFocus
            className="flex-1 px-3 py-1.5 bg-[#141625] border border-[#2F3452] rounded-lg text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#00A3FF]"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-[#00A3FF] text-white text-xs font-semibold rounded-lg hover:bg-[#0092E6]"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="px-2 py-1.5 text-xs text-white/50 hover:text-white"
          >
            Cancel
          </button>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1.5 text-[11px] font-medium text-white/40 hover:text-[#00A3FF] transition-colors pt-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Action Item</span>
        </button>
      )}
    </div>
  );
}
