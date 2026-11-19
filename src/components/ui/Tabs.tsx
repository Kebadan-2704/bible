"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  badge?: string;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabId,
  onChange,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTabId || tabs[0]?.id || "");

  const handleSelect = (id: string) => {
    setActiveTab(id);
    if (onChange) onChange(id);
  };

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar gap-2 pb-px">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors duration-150 border-b-2 font-serif focus:outline-none",
                isActive
                  ? "border-gold-500 text-navy-950 bg-gold-50/40 rounded-t-lg"
                  : "border-transparent text-slate-500 hover:text-navy-900 hover:border-slate-300"
              )}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full font-sans font-bold",
                    isActive ? "bg-gold-500 text-navy-950" : "bg-slate-200 text-slate-600"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="pt-6">{activeContent}</div>
    </div>
  );
};
