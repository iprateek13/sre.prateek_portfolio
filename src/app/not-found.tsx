"use client";

import Link from "next/link";
import { Terminal, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-100 dark:bg-dark-950 text-dark-900 dark:text-cream-300 p-6">
      <div className="max-w-md w-full text-center p-8 rounded-3xl bg-white/90 dark:bg-dark-900/90 border border-crimson-500/30 dark:border-amber-400/30 backdrop-blur-2xl shadow-xl">
        <div className="w-12 h-12 rounded-2xl bg-crimson-500/10 text-crimson-500 flex items-center justify-center mx-auto mb-4">
          <Terminal className="w-6 h-6" />
        </div>
        <h1 className="font-heading font-extrabold text-4xl text-crimson-600 dark:text-amber-300 mb-2">
          404 Not Found
        </h1>
        <p className="text-sm text-dark-800/80 dark:text-cream-300/80 mb-6">
          The requested infrastructure route or page does not exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-crimson-500 to-crimson-600 text-white font-bold text-sm shadow-crimson-glow hover:scale-105 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
