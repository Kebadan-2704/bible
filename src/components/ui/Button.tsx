import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "gold" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  external,
  children,
  icon,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center text-center transition-[color,background-color,border-color,box-shadow,transform] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg select-none font-sans";

  const sizeStyles = {
    sm: "px-3.5 py-2 text-xs font-bold gap-1.5 min-h-[38px]",
    md: "px-5 py-2.5 text-sm font-bold gap-2 min-h-[44px]",
    lg: "px-7 py-3.5 text-base font-extrabold gap-2.5 min-h-[48px]",
  };

  const variantStyles = {
    primary:
      "bg-navy-900 text-white hover:bg-navy-800 focus-visible:ring-navy-700 shadow-md hover:shadow-lg border border-navy-800",
    secondary:
      "bg-white text-navy-950 hover:bg-slate-50 focus-visible:ring-navy-700 shadow-sm border border-slate-300",
    gold:
      "bg-gold-500 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-[#061026] hover:brightness-105 shadow-gold hover:shadow-lg font-extrabold border border-gold-300 focus-visible:ring-gold-600",
    outline:
      "border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white focus-visible:ring-navy-700 font-bold",
    ghost: "text-navy-900 hover:bg-slate-100 focus-visible:ring-navy-700 font-bold",
  };

  const combinedClasses = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClasses}>
          <span>{children}</span>
          {icon && <span className="shrink-0" aria-hidden="true">{icon}</span>}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        <span>{children}</span>
        {icon && <span className="shrink-0" aria-hidden="true">{icon}</span>}
      </Link>
    );
  }

  return (
    <button type={props.type || "button"} className={combinedClasses} {...props}>
      <span>{children}</span>
      {icon && <span className="shrink-0" aria-hidden="true">{icon}</span>}
    </button>
  );
};
