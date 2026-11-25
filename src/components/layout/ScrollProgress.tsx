"use client";

import React, { useState, useEffect, useRef } from "react";

export const ScrollProgress: React.FC = () => {
  const [ratio, setRatio] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const updateProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setRatio(Math.min(1, Math.max(0, window.scrollY / totalHeight)));
      } else {
        setRatio(0);
      }
    };

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-[3px] z-50 bg-transparent pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="h-full w-full origin-left bg-gradient-to-r from-gold-500 via-gold-400 to-gold-300 will-change-transform"
        style={{ transform: `scaleX(${ratio})` }}
      />
    </div>
  );
};
