import React from "react";

interface CountryFlagProps {
  countryCode: string;
  className?: string;
}

/**
 * Cross-platform crisp SVG flags (prevents Windows regional-indicator text fallback "US", "GB", "FR").
 */
export const CountryFlag: React.FC<CountryFlagProps> = ({ countryCode, className = "w-11 h-8" }) => {
  const code = countryCode.toUpperCase();

  switch (code) {
    case "US":
      return (
        <svg viewBox="0 0 60 40" className={`rounded shadow-sm border border-slate-200 ${className}`} aria-hidden="true">
          <rect width="60" height="40" fill="#B22234" />
          <path d="M0,4.6H60 M0,10.8H60 M0,17H60 M0,23.2H60 M0,29.4H60 M0,35.6H60" stroke="#FFFFFF" strokeWidth="3.1" />
          <rect width="26" height="21.5" fill="#3C3B6E" />
          <g fill="#FFFFFF">
            <circle cx="5" cy="4.5" r="1.1" />
            <circle cx="13" cy="4.5" r="1.1" />
            <circle cx="21" cy="4.5" r="1.1" />
            <circle cx="9" cy="8.5" r="1.1" />
            <circle cx="17" cy="8.5" r="1.1" />
            <circle cx="5" cy="12.5" r="1.1" />
            <circle cx="13" cy="12.5" r="1.1" />
            <circle cx="21" cy="12.5" r="1.1" />
            <circle cx="9" cy="16.5" r="1.1" />
            <circle cx="17" cy="16.5" r="1.1" />
          </g>
        </svg>
      );

    case "GB":
      return (
        <svg viewBox="0 0 60 40" className={`rounded shadow-sm border border-slate-200 ${className}`} aria-hidden="true">
          <clipPath id="gbClip">
            <rect width="60" height="40" />
          </clipPath>
          <g clipPath="url(#gbClip)">
            <rect width="60" height="40" fill="#012169" />
            <path d="M0,0 L60,40 M60,0 L0,40" stroke="#FFFFFF" strokeWidth="7" />
            <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="3.5" />
            <path d="M30,0 V40 M0,20 H60" stroke="#FFFFFF" strokeWidth="11" />
            <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="6.5" />
          </g>
        </svg>
      );

    case "FR":
      return (
        <svg viewBox="0 0 60 40" className={`rounded shadow-sm border border-slate-200 ${className}`} aria-hidden="true">
          <rect width="20" height="40" x="0" fill="#002395" />
          <rect width="20" height="40" x="20" fill="#FFFFFF" />
          <rect width="20" height="40" x="40" fill="#ED2939" />
        </svg>
      );

    case "IE":
      return (
        <svg viewBox="0 0 60 40" className={`rounded shadow-sm border border-slate-200 ${className}`} aria-hidden="true">
          <rect width="20" height="40" x="0" fill="#169B62" />
          <rect width="20" height="40" x="20" fill="#FFFFFF" />
          <rect width="20" height="40" x="40" fill="#FF883E" />
        </svg>
      );

    case "CH":
      return (
        <svg viewBox="0 0 60 40" className={`rounded shadow-sm border border-slate-200 ${className}`} aria-hidden="true">
          <rect width="60" height="40" fill="#D52B1E" />
          <rect x="25.5" y="8" width="9" height="24" fill="#FFFFFF" />
          <rect x="18" y="15.5" width="24" height="9" fill="#FFFFFF" />
        </svg>
      );

    default:
      return (
        <span className="inline-flex items-center justify-center w-11 h-8 rounded bg-navy-100 text-navy-900 text-xs font-bold border border-navy-200" aria-hidden="true">
          {code}
        </span>
      );
  }
};
