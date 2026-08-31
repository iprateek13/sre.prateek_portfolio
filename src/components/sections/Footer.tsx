"use client";

import React from "react";
import { Terminal, ArrowUp, Heart, Activity } from "lucide-react";
import { portfolioData } from "@/data/content";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 text-xs font-mono text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Brand & Uptime */}
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <p className="text-white font-bold">Prateek Gupta • SRE & Cloud Engineer</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <Activity className="w-3 h-3 animate-pulse" />
              <span>All Systems Operational • 99.99% SLA Uptime</span>
            </p>
          </div>
        </div>

        {/* Right Back-to-Top Button */}
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-slate-400">
            © {new Date().getFullYear()} Prateek Gupta. Built with Next.js & TailwindCSS.
          </span>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all shadow-md"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
