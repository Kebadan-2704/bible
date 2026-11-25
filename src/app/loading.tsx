import React from "react";

export default function Loading() {
  return (
    <div className="bg-ivory min-h-[60vh] flex items-center justify-center py-20 px-4">
      <div className="flex flex-col items-center gap-3 text-center" role="status" aria-live="polite">
        <div
          className="w-10 h-10 rounded-full border-4 border-navy-200 border-t-gold-600 animate-spin"
          aria-hidden="true"
        />
        <span className="text-sm font-serif font-semibold text-navy-900">
          Loading University of Trinity International...
        </span>
      </div>
    </div>
  );
}
