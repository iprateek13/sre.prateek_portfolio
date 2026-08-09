"use client";

import React from "react";
import { portfolioData } from "@/data/content";
import { ArrowUp, Github, Linkedin, Mail, Terminal } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialIconMap: Record<string, React.ReactNode> = {
    Github: <Github className="w-4 h-4" />,
    Linkedin: <Linkedin className="w-4 h-4" />,
    Mail: <Mail className="w-4 h-4" />,
  };

  return (
    <footer className="relative bg-cream-100 dark:bg-dark-950 border-t border-azure-500/20 dark:border-cyan-400/15 text-dark-800 dark:text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white dark:bg-dark-900 border border-azure-500/40 dark:border-cyan-400/40 flex items-center justify-center text-azure-500 dark:text-cyan-400 shadow-md">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <span className="text-dark-900 dark:text-white font-heading font-bold text-base">
              {portfolioData.name}
            </span>
            <span className="text-xs text-azure-600 dark:text-cyan-300 block font-mono font-bold">
              SRE, DevOps & Cloud Engineer
            </span>
          </div>
        </div>

        {/* Social Icons & Back to top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {portfolioData.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 hover:text-azure-600 dark:hover:text-cyan-300 hover:border-azure-500 transition-colors shadow-sm"
                aria-label={social.platform}
              >
                {socialIconMap[social.iconName] || <Mail className="w-4 h-4" />}
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white dark:text-dark-950 font-bold hover:scale-105 transition-all shadow-azure-glow"
            aria-label="Back to top"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-slate-200 dark:border-slate-900 text-center text-xs text-dark-800/70 dark:text-slate-400 font-mono">
        © {new Date().getFullYear()} {portfolioData.name}. All rights reserved. SRE & DevSecOps Portfolio built with Next.js, TypeScript, Tailwind CSS & Framer Motion.
      </div>
    </footer>
  );
}
