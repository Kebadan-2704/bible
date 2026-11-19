import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  light?: boolean;
  level?: "h1" | "h2";
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  align = "center",
  className = "",
  light = false,
  level = "h2",
}) => {
  const HeadingTag = level;

  return (
    <div
      className={cn(
        "mb-12",
        align === "center" ? "text-center mx-auto max-w-3xl" : "text-left max-w-2xl",
        className
      )}
    >
      {badge && (
        <span
          className={cn(
            "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-3 border",
            light
              ? "bg-gold-500/20 text-gold-300 border-gold-400/50"
              : "bg-gold-100 text-gold-900 border-gold-400"
          )}
        >
          {badge}
        </span>
      )}
      <HeadingTag
        className={cn(
          "font-serif text-3xl sm:text-4xl lg:text-4xl font-bold tracking-tight mb-4 leading-tight",
          light ? "text-white" : "text-navy-950"
        )}
      >
        {title}
      </HeadingTag>
      {/* Decorative Gold Accent Underline */}
      <div
        className={cn(
          "flex items-center gap-2 mb-4",
          align === "center" ? "justify-center" : "justify-start"
        )}
        aria-hidden="true"
      >
        <span className="h-[2px] w-8 bg-gold-500 rounded-full" />
        <span className="h-[3px] w-14 bg-gold-500 rounded-full" />
        <span className="h-2 w-2 bg-gold-600 rotate-45" />
        <span className="h-[3px] w-14 bg-gold-500 rounded-full" />
        <span className="h-[2px] w-8 bg-gold-500 rounded-full" />
      </div>
      {subtitle && (
        <p
          className={cn(
            "text-base sm:text-lg leading-relaxed",
            light ? "text-slate-200" : "text-slate-700 font-medium"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
