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
        <h4 className="text-xs font-semibold text-[#8E92A6] uppercase tracking-wider">
          Action items
        </h4>
        <span className="text-xs font-medium text-[#555869] bg-[#12141D] border border-[#1E2030] rounded-lg px-2 py-0.5">
          {items.filter((i) => i.isDone).length}/{items.length}
        </span>
      </div>

      {/* Extract Button */}
      <button
        onClick={handleExtract}
        disabled={isExtracting}
        className="w-full py-2 px-3 rounded-xl bg-[#12141D] hover:bg-[#1C1E2A] border border-[#1E2030] hover:border-[#353950] text-xs font-medium text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50"
      >
        <Bot className="w-3.5 h-3.5 text-[#00E5FF]" />
        <span>
          {isExtracting ? "Extracting..." : "Re-extract from transcript"}
        </span>
      </button>

      {/* Interactive Items List */}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleDone(item.id)}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
              item.isDone
                ? "bg-[#0A0C12] border-[#1A1D2E] opacity-60"
                : "bg-[#12141D] border-[#1E2030] hover:border-[#353950]"
            }`}
          >
            {/* Custom Checkbox */}
            <div
              className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                item.isDone
                  ? "bg-[#00E5FF] border-[#00E5FF]"
                  : "border-2 border-[#353950] bg-transparent"
              }`}
            >
              {item.isDone && <Check className="w-3 h-3 stroke-[3] text-[#050608]" />}
            </div>

            {/* Content & Metadata */}
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm leading-relaxed transition-colors ${
                  item.isDone
                    ? "line-through text-[#555869]"
                    : "text-[#E4E5EB]"
                }`}
              >
                {item.text}
              </p>

              {(item.assignee || item.dueDate) && (
                <div className="flex items-center gap-3 mt-2 text-xs text-[#555869]">
                  {item.assignee && (
                    <span className="inline-flex items-center gap-1">
                      <UserIcon className="w-3 h-3" />
                      {item.assignee}
                    </span>
                  )}
                  {item.dueDate && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.dueDate}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add new action item */}
      {isAdding ? (
        <form onSubmit={handleAddItem} className="flex gap-2 pt-1">
          <input
            type="text"
            placeholder="Add new action item..."
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            autoFocus
            className="flex-1 px-3.5 py-2 bg-[#12141D] border border-[#1E2030] rounded-xl text-sm text-white placeholder:text-[#555869] focus:outline-none focus:border-[#00E5FF]/50"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#00E5FF] hover:bg-[#38EDFF] text-[#050608] text-xs font-semibold rounded-xl transition-all"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="px-3 py-2 text-xs text-[#555869] hover:text-white transition-colors"
          >
            Cancel
          </button>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1.5 text-xs font-medium text-[#555869] hover:text-[#00E5FF] transition-colors pt-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add action item</span>
        </button>
      )}
    </div>
  );
}
