import React from "react";

interface CrestProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const Crest: React.FC<CrestProps> = ({ className = "", size = 64, showText = false }) => {
  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md shrink-0"
        aria-label="University of Trinity International Crest"
        role="img"
      >
        <defs>
          {/* Gold Gradient */}
          <linearGradient id="crestGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F2C94C" />
            <stop offset="50%" stopColor="#D4A017" />
            <stop offset="100%" stopColor="#996515" />
          </linearGradient>
          {/* Navy Gradient */}
          <linearGradient id="crestNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0E285F" />
            <stop offset="50%" stopColor="#0B1F4B" />
            <stop offset="100%" stopColor="#061026" />
          </linearGradient>
        </defs>

        {/* Crown on Top */}
        <g id="crown" transform="translate(60, 8) scale(0.8)">
          <path
            d="M5 35 L15 15 L35 28 L50 5 L65 28 L85 15 L95 35 Z"
            fill="url(#crestGoldGrad)"
            stroke="#996515"
            strokeWidth="2"
          />
          <circle cx="15" cy="14" r="3" fill="#FFFDF5" />
          <circle cx="50" cy="4" r="3.5" fill="#FFFDF5" />
          <circle cx="85" cy="14" r="3" fill="#FFFDF5" />
          <rect x="5" y="35" width="90" height="7" rx="3" fill="url(#crestGoldGrad)" stroke="#996515" strokeWidth="1" />
        </g>

        {/* Laurel Wreath Left */}
        <g id="laurel-left" stroke="url(#crestGoldGrad)" strokeWidth="2.5" fill="none">
          <path d="M 32 80 C 15 110 18 150 48 180" />
          <path d="M 24 88 Q 18 80 28 82" fill="url(#crestGoldGrad)" />
          <path d="M 18 106 Q 10 100 20 102" fill="url(#crestGoldGrad)" />
          <path d="M 16 126 Q 8 122 18 123" fill="url(#crestGoldGrad)" />
          <path d="M 20 146 Q 12 144 22 143" fill="url(#crestGoldGrad)" />
          <path d="M 30 165 Q 22 165 32 161" fill="url(#crestGoldGrad)" />
        </g>

        {/* Laurel Wreath Right */}
        <g id="laurel-right" stroke="url(#crestGoldGrad)" strokeWidth="2.5" fill="none">
          <path d="M 168 80 C 185 110 182 150 152 180" />
          <path d="M 176 88 Q 182 80 172 82" fill="url(#crestGoldGrad)" />
          <path d="M 182 106 Q 190 100 180 102" fill="url(#crestGoldGrad)" />
          <path d="M 184 126 Q 192 122 182 123" fill="url(#crestGoldGrad)" />
          <path d="M 180 146 Q 188 144 178 143" fill="url(#crestGoldGrad)" />
          <path d="M 170 165 Q 178 165 168 161" fill="url(#crestGoldGrad)" />
        </g>

        {/* Outer Shield with Gold Border */}
        <path
          d="M 40 45 L 160 45 C 160 45 165 115 100 185 C 35 115 40 45 40 45 Z"
          fill="url(#crestNavyGrad)"
          stroke="url(#crestGoldGrad)"
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* Inner Shield Fine Border */}
        <path
          d="M 48 52 L 152 52 C 152 52 156 112 100 174 C 44 112 48 52 48 52 Z"
          fill="none"
          stroke="#F2C94C"
          strokeWidth="1.5"
          opacity="0.8"
        />

        {/* The Holy Cross */}
        <g id="cross">
          <rect x="94" y="60" width="12" height="62" rx="2" fill="url(#crestGoldGrad)" stroke="#80530D" strokeWidth="1" />
          <rect x="74" y="74" width="52" height="12" rx="2" fill="url(#crestGoldGrad)" stroke="#80530D" strokeWidth="1" />
          <circle cx="100" cy="80" r="3" fill="#FFFDF5" />
        </g>

        {/* Open Bible */}
        <g id="open-bible" transform="translate(68, 126)">
          <path
            d="M 32 10 C 22 6 8 8 0 14 L 0 34 C 8 28 22 26 32 30 Z"
            fill="#FFFDF5"
            stroke="url(#crestGoldGrad)"
            strokeWidth="2"
          />
          <path
            d="M 32 10 C 42 6 56 8 64 14 L 64 34 C 56 28 42 26 32 30 Z"
            fill="#FFFDF5"
            stroke="url(#crestGoldGrad)"
            strokeWidth="2"
          />
          <line x1="32" y1="10" x2="32" y2="30" stroke="#996515" strokeWidth="2.5" />
          <line x1="6" y1="17" x2="26" y2="15" stroke="#996515" strokeWidth="1.2" opacity="0.6" />
          <line x1="6" y1="21" x2="26" y2="19" stroke="#996515" strokeWidth="1.2" opacity="0.6" />
          <line x1="38" y1="15" x2="58" y2="17" stroke="#996515" strokeWidth="1.2" opacity="0.6" />
          <line x1="38" y1="19" x2="58" y2="21" stroke="#996515" strokeWidth="1.2" opacity="0.6" />
        </g>

        {/* Elegant Bottom Gold Insignia Bar */}
        <g id="insignia-bar" transform="translate(45, 182)">
          <rect x="0" y="0" width="110" height="14" rx="4" fill="url(#crestGoldGrad)" stroke="#80530D" strokeWidth="1.5" />
          <circle cx="20" cy="7" r="2.5" fill="#0B1F4B" />
          <line x1="30" y1="7" x2="80" y2="7" stroke="#0B1F4B" strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="90" cy="7" r="2.5" fill="#0B1F4B" />
        </g>
      </svg>

      {showText && (
        <div className="mt-2 text-center">
          <p className="font-serif font-bold text-navy-950 tracking-wider text-sm uppercase">
            University of Trinity International
          </p>
          <p className="text-xs text-gold-700 font-bold tracking-wide">
            Trinity Church of India Diocese
          </p>
        </div>
      )}
    </div>
  );
};
export default Crest;
