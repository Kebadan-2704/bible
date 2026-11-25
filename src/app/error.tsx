"use client";

import React from "react";
import { Crest } from "@/components/ui/Crest";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[65vh] flex items-center justify-center py-20 px-4 bg-ivory">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-card">
        <Crest size={72} className="mx-auto" />
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gold-800">
            Temporary Interruption
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
            Unable to Load Page Content
          </h1>
          <p className="text-sm text-slate-700 leading-relaxed">
            An unexpected application error prevented this section from loading. Please retry or return to the main homepage.
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-slate-600">Reference: {error.digest}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button type="button" variant="primary" onClick={() => reset()}>
            Try Again
          </Button>
          <Button href="/" variant="outline">
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
