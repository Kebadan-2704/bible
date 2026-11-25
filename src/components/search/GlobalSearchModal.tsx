"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search, X, BookOpen, GraduationCap, MapPin, Compass, FileText } from "lucide-react";
import { searchIndex, SearchItem } from "@/data/searchIndex";
import { useLocale } from "@/components/providers/LocaleProvider";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  restoreFocusTo?: React.RefObject<HTMLButtonElement | null>;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  restoreFocusTo,
}) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { t } = useLocale();

  const fuse = useMemo(() => {
    return new Fuse(searchIndex, {
      keys: ["title", "description", "category", "keywords"],
      threshold: 0.35,
      ignoreLocation: true,
    });
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return searchIndex.slice(0, 8);
    return fuse.search(query).map((res) => res.item);
  }, [query, fuse]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => inputRef.current?.focus(), 30);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = prevOverflow;
      };
    } else if (restoreFocusTo?.current) {
      restoreFocusTo.current.focus();
    }
  }, [isOpen, restoreFocusTo]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "ArrowDown" && results.length > 0) {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % results.length);
        return;
      }

      if (e.key === "ArrowUp" && results.length > 0) {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
        return;
      }

      if (e.key === "Enter" && results[activeIndex] && document.activeElement === inputRef.current) {
        e.preventDefault();
        const selected = results[activeIndex];
        onClose();
        router.push(selected.url);
        return;
      }

      // Focus trap inside modal dialog
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, results, activeIndex, router]);

  if (!isOpen) return null;

  const getCategoryIcon = (category: SearchItem["category"]) => {
    switch (category) {
      case "Degree":
        return <GraduationCap className="w-4 h-4 text-gold-700" aria-hidden="true" />;
      case "Curriculum Module":
        return <BookOpen className="w-4 h-4 text-emerald-700" aria-hidden="true" />;
      case "Specialisation":
        return <Compass className="w-4 h-4 text-purple-700" aria-hidden="true" />;
      case "Centre":
        return <MapPin className="w-4 h-4 text-rose-700" aria-hidden="true" />;
      default:
        return <FileText className="w-4 h-4 text-navy-800" aria-hidden="true" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-navy-950/75 backdrop-blur-sm tiu-panel-enter"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="global-search-heading"
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gold-300 overflow-hidden flex flex-col max-h-[80vh]"
      >
        <h2 id="global-search-heading" className="sr-only">
          {t.search.dialogLabel}
        </h2>

        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50">
          <Search className="w-5 h-5 text-gold-700 ml-1 mr-3 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search.placeholder}
            aria-label={t.search.dialogLabel}
            className="w-full bg-transparent text-navy-950 placeholder-slate-500 text-base focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="p-2 text-slate-600 hover:text-navy-950 mr-1 min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded-md"
              aria-label={t.search.clearAria}
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search dialog"
            className="px-3 py-1.5 text-xs font-semibold text-navy-900 bg-slate-200 rounded-md hover:bg-slate-300 transition-colors min-h-[32px]"
          >
            {t.search.closeLabel}
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-2 flex-1" role="listbox" aria-label="Search results">
          {results.length === 0 ? (
            <div className="text-center py-10 text-slate-700">
              <p className="font-semibold">
                {t.search.noResults} &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-slate-600 mt-1">{t.search.tryHint}</p>
            </div>
          ) : (
            results.map((item, idx) => {
              const isHighlighted = idx === activeIndex;
              return (
                <Link
                  key={item.id}
                  href={item.url}
                  role="option"
                  aria-selected={isHighlighted}
                  onClick={onClose}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`flex items-start gap-3.5 p-3 rounded-xl border transition-colors duration-150 group ${
                    isHighlighted
                      ? "bg-gold-50 border-gold-400"
                      : "hover:bg-gold-50/70 border-transparent hover:border-gold-300"
                  }`}
                >
                  <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-white shadow-sm shrink-0 mt-0.5">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif font-bold text-navy-950 text-sm group-hover:text-gold-800 transition-colors">
                        {item.title}
                      </span>
                      <span className="text-xs font-sans font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{item.description}</p>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-slate-200 bg-slate-50 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
          <span>{t.search.poweredBy}</span>
          <span>{t.search.dismissHint}</span>
        </div>
      </div>
    </div>
  );
};
export default GlobalSearchModal;
