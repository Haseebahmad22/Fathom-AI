"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  Check,
  CheckCheck,
  Clock,
  Sparkles,
  Users,
  ShieldAlert,
  Film,
  ExternalLink,
  Trash2,
  X,
} from "lucide-react";

export interface NotificationItem {
  id: string;
  type: "alert" | "team_call" | "summary_ready" | "playlist";
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  link: string;
}

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    type: "alert",
    title: "Keyword Alert: #pricing",
    description: "Sarah Jenkins discussed pricing for 45 enterprise seats in Acme Corp call.",
    timestamp: "10m ago",
    isRead: false,
    link: "/alerts",
  },
  {
    id: "notif-2",
    type: "team_call",
    title: "Call Shared: David Chen",
    description: "David shared \"Engineering Weekly Standup - Sprint 42\" with your pod.",
    timestamp: "1h ago",
    isRead: false,
    link: "/team-calls",
  },
  {
    id: "notif-3",
    type: "summary_ready",
    title: "AI Summary Complete",
    description: "Customer Onboarding - Northwind summary generated with 4 action items.",
    timestamp: "3h ago",
    isRead: false,
    link: "/meeting/meeting-3",
  },
  {
    id: "notif-4",
    type: "alert",
    title: "Keyword Alert: #security",
    description: "Marcus Vance inquired regarding Google Workspace domain-level authentication.",
    timestamp: "Yesterday",
    isRead: true,
    link: "/alerts",
  },
];

interface NotificationsTrayProps {
  isOpen: boolean;
  onClose: () => void;
  onUnreadCountChange?: (count: number) => void;
}

export default function NotificationsTray({
  isOpen,
  onClose,
  onUnreadCountChange,
}: NotificationsTrayProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("fathom_notifications");
      if (stored) {
        setNotifications(JSON.parse(stored));
      } else {
        setNotifications(DEFAULT_NOTIFICATIONS);
        localStorage.setItem("fathom_notifications", JSON.stringify(DEFAULT_NOTIFICATIONS));
      }
    } catch {
      setNotifications(DEFAULT_NOTIFICATIONS);
    }
  }, []);

  useEffect(() => {
    const unread = notifications.filter((n) => !n.isRead).length;
    if (onUnreadCountChange) onUnreadCountChange(unread);
  }, [notifications, onUnreadCountChange]);

  const saveNotifications = (items: NotificationItem[]) => {
    setNotifications(items);
    try {
      localStorage.setItem("fathom_notifications", JSON.stringify(items));
    } catch (err) {
      console.error("Failed to save notifications", err);
    }
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, isRead: true }));
    saveNotifications(updated);
  };

  const markSingleAsRead = (id: string) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, isRead: true } : n
    );
    saveNotifications(updated);
  };

  const deleteNotification = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = notifications.filter((n) => n.id !== id);
    saveNotifications(updated);
  };

  if (!isOpen) return null;

  const filtered = notifications.filter((n) => (filter === "unread" ? !n.isRead : true));
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const renderIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "alert":
        return <ShieldAlert className="w-3.5 h-3.5 text-[#00E5FF]" />;
      case "team_call":
        return <Users className="w-3.5 h-3.5 text-indigo-400" />;
      case "summary_ready":
        return <Sparkles className="w-3.5 h-3.5 text-emerald-400" />;
      case "playlist":
        return <Film className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-[#00E5FF]" />;
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute right-0 top-12 z-50 w-80 sm:w-96 bg-[#0A0C12] border border-[#1E2030] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-white"
    >
      {/* Header */}
      <div className="p-3.5 px-4 border-b border-[#1A1D2E] flex items-center justify-between bg-[#0E111A]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF]">
            <Bell className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-white tracking-wide">
            Notifications
          </span>
          {unreadCount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-[#00E5FF] to-[#38EDFF] text-[#050608] shadow-[0_0_8px_rgba(0,229,255,0.4)]">
              {unreadCount} new
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-[11px] text-[#8E92A6] hover:text-[#00E5FF] flex items-center gap-1 transition-colors cursor-pointer"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#555869] hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[#1A1D2E] bg-[#07080D] text-[11px]">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-0.5 rounded-full font-medium transition-all cursor-pointer ${
            filter === "all"
              ? "bg-[#00E5FF]/15 text-[#38EDFF] border border-[#00E5FF]/30 font-semibold shadow-[0_0_8px_rgba(0,229,255,0.1)]"
              : "text-[#8E92A6] hover:text-white"
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-3 py-0.5 rounded-full font-medium transition-all cursor-pointer ${
            filter === "unread"
              ? "bg-[#00E5FF]/15 text-[#38EDFF] border border-[#00E5FF]/30 font-semibold shadow-[0_0_8px_rgba(0,229,255,0.1)]"
              : "text-[#8E92A6] hover:text-white"
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-[#141724] custom-scrollbar">
        {filtered.length === 0 ? (
          <div className="p-8 text-center space-y-1.5">
            <Check className="w-6 h-6 text-[#555869] mx-auto" />
            <p className="text-xs font-semibold text-white">All caught up</p>
            <p className="text-[11px] text-[#8E92A6]">
              {filter === "unread"
                ? "No unread notifications right now."
                : "No notifications in your inbox."}
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              onClick={() => {
                markSingleAsRead(item.id);
                onClose();
              }}
              className={`p-3.5 px-4 flex items-start gap-3 hover:bg-[#12141D] transition-colors group block relative ${
                !item.isRead ? "bg-[#0A0D18]" : "bg-transparent"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 mt-0.5 ${
                  !item.isRead
                    ? "bg-[#12141D] border-[#00E5FF]/40"
                    : "bg-[#0E1018] border-[#1E2030]"
                }`}
              >
                {renderIcon(item.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4
                    className={`text-xs truncate ${
                      !item.isRead ? "font-bold text-white" : "font-medium text-[#C5C8D8]"
                    }`}
                  >
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-[#555869] shrink-0">
                    {item.timestamp}
                  </span>
                </div>

                <p className="text-[11px] text-[#8E92A6] line-clamp-2 mt-0.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Delete on hover */}
              <button
                onClick={(e) => deleteNotification(e, item.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-[#555869] hover:text-rose-400 transition-opacity shrink-0 cursor-pointer"
                title="Dismiss"
              >
                <Trash2 className="w-3 h-3" />
              </button>

              {!item.isRead && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] absolute top-4 right-2" />
              )}
            </Link>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 px-4 bg-[#07080D] border-t border-[#1A1D2E] flex items-center justify-between text-[11px] text-[#555869]">
        <span>Auto-synced with alert triggers</span>
        <Link
          href="/alerts"
          onClick={onClose}
          className="text-[#00E5FF] hover:underline flex items-center gap-1 font-medium"
        >
          Manage alerts <ExternalLink className="w-2.5 h-2.5" />
        </Link>
      </div>
    </div>
  );
}
