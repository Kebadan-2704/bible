"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  badge?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenId?: string;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenId,
  className = "",
}) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const headingId = `${item.id}-trigger`;
        const panelId = `${item.id}-panel`;
        return (
          <div
            key={item.id}
            className={cn(
              "rounded-xl border transition-[border-color,box-shadow] duration-200 overflow-hidden bg-white",
              isOpen ? "border-gold-400 shadow-sm" : "border-slate-200 hover:border-slate-300"
            )}
          >
            <button
              id={headingId}
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between px-5 py-4 text-left font-serif font-semibold text-navy-950 focus:outline-none focus-visible:bg-slate-50 transition-colors min-h-[52px]"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <div className="flex flex-wrap items-center gap-2.5 pr-4">
                <span className="text-base sm:text-lg">{item.title}</span>
                {item.badge && (
                  <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-900 border border-gold-300">
                    {item.badge}
                  </span>
                )}
              </div>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-gold-700 transition-transform duration-200 shrink-0",
                  isOpen && "rotate-180 text-navy-900"
                )}
                aria-hidden="true"
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              hidden={!isOpen}
              className="px-5 pb-5 pt-2 text-slate-700 text-sm sm:text-base border-t border-slate-100 bg-slate-50/50"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
};
