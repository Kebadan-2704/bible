"use client";

import React from "react";

export const HeroGlobe: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 select-none">
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="globeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4A017" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#0E285F" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0B1F4B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Global Lat/Long Grid Rings */}
        <ellipse cx="500" cy="500" rx="380" ry="380" stroke="#D4A017" strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
        <ellipse cx="500" cy="500" rx="380" ry="190" stroke="#D4A017" strokeWidth="0.8" opacity="0.4" />
        <ellipse cx="500" cy="500" rx="380" ry="90" stroke="#D4A017" strokeWidth="0.8" opacity="0.3" />
        <line x1="120" y1="500" x2="880" y2="500" stroke="#D4A017" strokeWidth="1" opacity="0.5" />
        <line x1="500" y1="120" x2="500" y2="880" stroke="#D4A017" strokeWidth="1" opacity="0.5" />

        {/* Network Nodes (Centres Coordinates Representation) */}
        {/* Bangalore HQ */}
        <circle cx="560" cy="560" r="5" fill="#F2C94C" className="animate-ping" opacity="0.8" />
        <circle cx="560" cy="560" r="4" fill="#F2C94C" />
        
        {/* Malaysia */}
        <circle cx="680" cy="590" r="3.5" fill="#F2C94C" />
        
        {/* Georgia USA */}
        <circle cx="280" cy="460" r="4" fill="#F2C94C" />
        
        {/* UK / Europe */}
        <circle cx="480" cy="380" r="3.5" fill="#F2C94C" />

        {/* Connecting Flight/Mission Lines */}
        <path
          d="M 560 560 Q 620 530 680 590"
          stroke="#D4A017"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          opacity="0.7"
        />
        <path
          d="M 560 560 Q 420 400 280 460"
          stroke="#D4A017"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          opacity="0.6"
        />
        <path
          d="M 560 560 Q 510 440 480 380"
          stroke="#D4A017"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};
