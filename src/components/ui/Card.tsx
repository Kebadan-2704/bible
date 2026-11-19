import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  borderGold?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = true,
  borderGold = false,
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-xl p-6 sm:p-7 shadow-card transition-[border-color,box-shadow,transform] duration-300 relative overflow-hidden",
        borderGold ? "border border-gold-300/80" : "border border-slate-200/80",
        hover && "hover:shadow-hover hover:-translate-y-1 hover:border-gold-400",
        className
      )}
    >
      {children}
    </div>
  );
};
