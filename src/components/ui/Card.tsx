import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
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
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "bg-white rounded-xl p-6 sm:p-7 shadow-card transition-[border-color,box-shadow,transform] duration-200 relative overflow-hidden",
        borderGold ? "border border-gold-400/70" : "border border-slate-200",
        hover && "hover:shadow-hover md:hover:-translate-y-0.5 hover:border-gold-400",
        className
      )}
    >
      {children}
    </div>
  );
};
