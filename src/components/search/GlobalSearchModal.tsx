"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Search, X, BookOpen, GraduationCap, MapPin, Compass, FileText } from "lucide-react";
import { searchIndex, SearchItem } from "@/data/searchIndex";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Fuse index
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
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getCategoryIcon = (category: SearchItem["category"]) => {
    switch (category) {
      case "Degree":
        return <GraduationCap className="w-4 h-4 text-gold-600" />;
      case "Curriculum Module":
        return <BookOpen className="w-4 h-4 text-emerald-600" />;
      case "Specialisation":
        return <Compass className="w-4 h-4 text-purple-600" />;
      case "Centre":
        return <MapPin className="w-4 h-4 text-rose-600" />;
      default:
        return <FileText className="w-4 h-4 text-navy-700" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gold-300 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50">
          <Search className="w-5 h-5 text-gold-600 ml-2 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search degrees, curriculum modules, centres, subjects..."
            className="w-full bg-transparent text-navy-950 placeholder-slate-400 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-slate-600 mr-2"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold text-slate-500 bg-slate-200 rounded-md hover:bg-slate-300 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-2 flex-1">
          {results.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              <p className="font-medium">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for &quot;Theology&quot;, &quot;Ethics&quot;, &quot;Bangalore&quot;, or &quot;Ph.D.&quot;
              </p>
            </div>
          ) : (
            results.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                onClick={onClose}
                className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-gold-50/60 border border-transparent hover:border-gold-300 transition-[background-color,border-color] duration-150 group"
              >
                <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-white shadow-xs shrink-0 mt-0.5">
                  {getCategoryIcon(item.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-navy-950 text-sm group-hover:text-gold-700 transition-colors">
                      {item.title}
                    </span>
                    <span className="text-xs font-sans font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.description}</p>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 flex items-center justify-between">
          <span>Search powered by client-side Fuse.js</span>
          <span>Press ESC or click outside to dismiss</span>
        </div>
      </div>
    </div>
  );
};
