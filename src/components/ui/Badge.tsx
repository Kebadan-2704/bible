import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "navy" | "green" | "purple" | "crimson" | "orange" | "neutral";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "gold",
  className = "",
}) => {
  const variantStyles = {
    gold: "bg-gold-100 text-gold-900 border-gold-300",
    navy: "bg-navy-50 text-navy-900 border-navy-200",
    green: "bg-emerald-50 text-emerald-900 border-emerald-300",
    purple: "bg-purple-50 text-purple-900 border-purple-300",
    crimson: "bg-rose-50 text-rose-900 border-rose-300",
    orange: "bg-amber-50 text-amber-900 border-amber-300",
    neutral: "bg-slate-100 text-slate-800 border-slate-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
