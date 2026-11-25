"use client";

import React from "react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF7F0] text-[#061026] flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white border border-slate-300 rounded-2xl p-8 text-center space-y-5 shadow-lg">
          <h1 className="font-serif text-2xl font-bold text-[#0B1F4B]">
            University of Trinity International
          </h1>
          <p className="text-sm text-slate-700 leading-relaxed">
            A critical layout error occurred. Please reload or return to the homepage.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-3 bg-[#0B1F4B] text-white font-bold text-sm rounded-lg min-h-[44px]"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
