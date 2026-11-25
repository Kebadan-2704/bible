"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t.common.backToTop}
      title={t.common.backToTop}
      className="flex items-center justify-center fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-navy-950 text-gold-300 hover:text-navy-950 hover:bg-gold-400 border border-gold-400 shadow-gold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 print:hidden"
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
    </button>
  );
};
