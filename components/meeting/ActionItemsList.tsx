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
    <div className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-text-secondary">
          Action items
        </h4>
        <span className="text-[11px] font-mono text-text-muted">
          {items.filter((i) => i.isDone).length}/{items.length} done
        </span>
      </div>

      {/* Extract Button: clean secondary outline */}
      <button
        onClick={handleExtract}
        disabled={isExtracting}
        className="w-full py-1.5 px-3 rounded-md bg-surface-elevated hover:bg-surface-active border border-border-muted text-xs font-medium text-text-primary flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
      >
        <Bot className="w-3.5 h-3.5 text-text-muted" />
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
            className={`p-2.5 rounded-md border transition-colors cursor-pointer flex items-start gap-2.5 ${
              item.isDone
                ? "bg-surface-elevated border-border-subtle opacity-60"
                : "bg-surface border-border-muted hover:border-border-strong"
            }`}
          >
            {/* Custom Checkbox */}
            <div
              className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                item.isDone
                  ? "bg-accent border-accent text-white"
                  : "border-border-strong bg-surface"
              }`}
            >
              {item.isDone && <Check className="w-2.5 h-2.5 stroke-[2.5]" />}
            </div>

            {/* Content & Metadata */}
            <div className="flex-1 min-w-0">
              <p
                className={`text-xs leading-normal transition-colors ${
                  item.isDone
                    ? "line-through text-text-muted"
                    : "text-text-primary"
                }`}
              >
                {item.text}
              </p>

              {(item.assignee || item.dueDate) && (
                <div className="flex items-center gap-2 mt-1.5 text-[11px] font-mono text-text-muted">
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
            className="flex-1 px-2.5 py-1 bg-surface-elevated border border-border-muted rounded-md text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-accent hover:bg-accent-hover text-white text-xs font-medium rounded-md transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="px-2 py-1 text-xs text-text-muted hover:text-text-primary transition-colors"
          >
            Cancel
          </button>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1.5 text-xs font-normal text-text-muted hover:text-text-primary transition-colors pt-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add action item</span>
        </button>
      )}
    </div>
  );
}
