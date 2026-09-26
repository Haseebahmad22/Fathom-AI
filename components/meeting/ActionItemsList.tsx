"use client";

import React, { useState } from "react";
import { Check, Bot, Calendar, User as UserIcon, Plus, Trash2 } from "lucide-react";
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
  const [newItemAssignee, setNewItemAssignee] = useState("Alex Morgan");
  const [newItemDueDate, setNewItemDueDate] = useState("Tomorrow");
  const [isAdding, setIsAdding] = useState(false);

  const toggleDone = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  const handleDeleteItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setItems((prev) => prev.filter((item) => item.id !== id));
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
      assignee: newItemAssignee.trim() || "You",
      dueDate: newItemDueDate.trim() || "Tomorrow",
    };
    setItems((prev) => [newItem, ...prev]);
    setNewItemText("");
    setIsAdding(false);
  };

  return (
    <div className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-[11px] font-semibold text-[#8E92A6] uppercase tracking-wider">
          Action items
        </h4>
        <span className="text-[10px] font-semibold text-[#555869] bg-[#12141D] border border-[#1E2030] rounded-md px-1.5 py-0.5">
          {items.filter((i) => i.isDone).length}/{items.length}
        </span>
      </div>

      {/* Extract Button */}
      <button
        onClick={handleExtract}
        disabled={isExtracting}
        className="w-full py-1.5 px-2.5 rounded-lg bg-[#12141D] hover:bg-[#1C1E2A] border border-[#1E2030] hover:border-[#353950] text-xs font-medium text-white flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
      >
        <Bot className="w-3.5 h-3.5 text-[#00E5FF]" />
        <span>
          {isExtracting ? "Extracting..." : "Re-extract from transcript"}
        </span>
      </button>

      {/* Interactive Items List */}
      <div className="space-y-1.5">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleDone(item.id)}
            className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 group relative ${
              item.isDone
                ? "bg-[#0A0C12] border-[#1A1D2E] opacity-60"
                : "bg-[#12141D] border-[#1E2030] hover:border-[#353950]"
            }`}
          >
            {/* Custom Checkbox */}
            <div
              className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                item.isDone
                  ? "bg-[#00E5FF] border-[#00E5FF]"
                  : "border border-[#353950] bg-transparent"
              }`}
            >
              {item.isDone && <Check className="w-2.5 h-2.5 stroke-[3] text-[#050608]" />}
            </div>

            {/* Content & Metadata */}
            <div className="flex-1 min-w-0 pr-6">
              <p
                className={`text-xs leading-snug transition-colors ${
                  item.isDone
                    ? "line-through text-[#555869]"
                    : "text-[#E4E5EB]"
                }`}
              >
                {item.text}
              </p>

              {(item.assignee || item.dueDate) && (
                <div className="flex items-center gap-2.5 mt-1.5 text-[10px] text-[#555869]">
                  {item.assignee && (
                    <span className="inline-flex items-center gap-1">
                      <UserIcon className="w-2.5 h-2.5" />
                      {item.assignee}
                    </span>
                  )}
                  {item.dueDate && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" />
                      {item.dueDate}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Delete button on hover */}
            <button
              onClick={(e) => handleDeleteItem(e, item.id)}
              className="absolute right-2 top-2.5 opacity-0 group-hover:opacity-100 p-1 text-[#555869] hover:text-rose-400 transition-all cursor-pointer"
              title="Delete item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        {/* Add custom action item form */}
        {isAdding ? (
          <form onSubmit={handleAddItem} className="space-y-2 p-2.5 rounded-lg bg-[#0E111A] border border-[#25283D] animate-in fade-in">
            <input
              type="text"
              placeholder="What needs to get done?"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              autoFocus
              className="w-full px-2.5 py-1.5 bg-[#12141D] border border-[#00E5FF]/40 rounded-lg text-xs text-white placeholder-[#555869] focus:outline-none"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Assignee"
                value={newItemAssignee}
                onChange={(e) => setNewItemAssignee(e.target.value)}
                className="w-full px-2 py-1 bg-[#12141D] border border-[#1E2030] rounded text-[11px] text-white placeholder-[#555869] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Due Date"
                value={newItemDueDate}
                onChange={(e) => setNewItemDueDate(e.target.value)}
                className="w-full px-2 py-1 bg-[#12141D] border border-[#1E2030] rounded text-[11px] text-white placeholder-[#555869] focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-end gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-2 py-1 rounded text-[10px] text-[#8E92A6] hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newItemText.trim()}
                className="px-2.5 py-1 rounded bg-[#00E5FF] text-[#050608] font-semibold text-[10px] hover:bg-[#38EDFF] disabled:opacity-30 cursor-pointer"
              >
                Add item
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full py-1.5 px-2 rounded-lg border border-dashed border-[#1E2030] hover:border-[#353950] text-[#555869] hover:text-[#8E92A6] text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>Add action item</span>
          </button>
        )}
      </div>
    </div>
  );
}
