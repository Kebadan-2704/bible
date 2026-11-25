"use client";

import React from "react";
import { useLocale } from "@/components/providers/LocaleProvider";

interface LocalizedPairProps {
  en: React.ReactNode;
  ta: React.ReactNode;
  className?: string;
}

/**
 * Allows static Server Component pages to retain full SSR HTML & SEO metadata
 * while smoothly rendering verified Tamil copy when user toggles locale.
 */
export const LText: React.FC<LocalizedPairProps> = ({ en, ta, className }) => {
  const { locale } = useLocale();
  if (className) {
    return <span className={className}>{locale === "ta" ? ta : en}</span>;
  }
  return <>{locale === "ta" ? ta : en}</>;
};
