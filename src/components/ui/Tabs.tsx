"use client";

import React, { useState, useRef } from "react";
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
  ariaLabel?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabId,
  onChange,
  className = "",
  ariaLabel = "Section tabs",
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTabId || tabs[0]?.id || "");
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleSelect = (id: string) => {
    setActiveTab(id);
    if (onChange) onChange(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let nextIdx = idx;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % tabs.length;
    else if (e.key === "ArrowLeft") nextIdx = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = tabs.length - 1;
    else return;

    e.preventDefault();
    const target = tabs[nextIdx];
    if (target) {
      handleSelect(target.id);
      btnRefs.current[nextIdx]?.focus();
    }
  };

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div className={cn("w-full", className)}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex border-b border-slate-200 overflow-x-auto no-scrollbar gap-2 pb-px"
      >
        {tabs.map((tab, idx) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                btnRefs.current[idx] = el;
              }}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleSelect(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors duration-150 border-b-2 font-sans focus:outline-none min-h-[44px]",
                isActive
                  ? "border-gold-500 text-navy-950 bg-gold-50/60 rounded-t-lg"
                  : "border-transparent text-slate-600 hover:text-navy-900 hover:border-slate-300"
              )}
            >
              {tab.icon && <span className="shrink-0" aria-hidden="true">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full font-sans font-bold",
                    isActive ? "bg-gold-500 text-navy-950" : "bg-slate-200 text-slate-800"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
        className="pt-6"
      >
        {activeContent}
      </div>
    </div>
  );
};
