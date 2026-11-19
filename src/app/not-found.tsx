import React from "react";
import Link from "next/link";
import { Crest } from "@/components/ui/Crest";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-ivory">
      <div className="max-w-md w-full text-center space-y-6">
        <Crest size={80} className="mx-auto" />
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gold-600">
            Error 404
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The page or document you are seeking within the Trinity International University repository does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/" variant="primary" icon={<Home className="w-4 h-4" />}>
            Return to Homepage
          </Button>
          <Button href="/academics" variant="outline">
            Browse Academics
          </Button>
        </div>
      </div>
    </div>
  );
}
