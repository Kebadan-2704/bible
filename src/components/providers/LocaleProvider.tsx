"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { dictionaries, Locale, TranslationDict } from "@/lib/i18n";

interface LocaleContextValue {
  locale: Locale;
  t: TranslationDict;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  t: dictionaries.en,
  setLocale: () => {},
  toggleLocale: () => {},
});

const STORAGE_KEY = "tiu_locale";

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "ta" || saved === "en") {
        setLocaleState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      // Storage disabled in restricted contexts
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    document.documentElement.lang = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      document.cookie = `tiu_locale=${next}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Safe fallback
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "ta" : "en");
  }, [locale, setLocale]);

  const value: LocaleContextValue = {
    locale,
    t: (locale === "ta" ? dictionaries.ta : dictionaries.en) as TranslationDict,
    setLocale,
    toggleLocale,
  };

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext);
}
