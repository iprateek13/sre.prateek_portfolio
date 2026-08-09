"use client";

import React from "react";
import { portfolioData } from "@/data/content";
import { Terminal, Heart, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-slate-200/80 dark:border-slate-800/80 bg-cream-100 dark:bg-dark-950 text-dark-900 dark:text-cream-300 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          {/* Brand & SRE Description */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-azure-600 via-cyan-500 to-emerald-500 text-white shadow-azure-glow">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-base sm:text-lg text-dark-900 dark:text-white block">
                Prateek<span className="text-azure-600 dark:text-cyan-400">Gupta</span>
              </span>
              <span className="text-xs font-mono text-dark-800/70 dark:text-slate-400">
                SRE, DevOps & Azure Cloud Architecture
              </span>
            </div>
          </div>

          {/* Copyright & SRE Tech Tag */}
          <div className="text-xs font-mono text-dark-800/80 dark:text-slate-400">
            <span>© {currentYear} Prateek Gupta. Built with Next.js 14, TailwindCSS & Three.js.</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/iprateek13"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/90 dark:bg-dark-900/90 border border-slate-200 dark:border-slate-800 hover:border-azure-500 text-dark-800 dark:text-cream-300 hover:text-azure-600 transition-colors shadow-sm"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/iprateekgupta13"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/90 dark:bg-dark-900/90 border border-slate-200 dark:border-slate-800 hover:border-azure-500 text-dark-800 dark:text-cream-300 hover:text-azure-600 transition-colors shadow-sm"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:sre.prateek@gmail.com"
              className="p-2.5 rounded-xl bg-white/90 dark:bg-dark-900/90 border border-slate-200 dark:border-slate-800 hover:border-azure-500 text-dark-800 dark:text-cream-300 hover:text-azure-600 transition-colors shadow-sm"
              aria-label="Email Prateek"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
