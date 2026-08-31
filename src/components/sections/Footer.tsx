"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isClicked, setIsClicked] = useState(false);

  const scrollToTop = () => {
    setIsClicked(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setIsClicked(false), 800);
  };

  return (
    <footer className="py-10 sm:py-12 border-t border-slate-200/80 dark:border-slate-800/80 bg-cream-100 dark:bg-dark-950 text-dark-900 dark:text-cream-300 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 text-center sm:text-left">
          {/* Brand & SRE Description with Terminal Scroll-to-Top Button */}
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2.5 sm:gap-3.5">
            <button
              onClick={scrollToTop}
              title="Scroll to Top"
              aria-label="Scroll to top"
              className="p-3 rounded-2xl bg-gradient-to-tr from-azure-600 via-cyan-500 to-emerald-500 text-white shadow-azure-glow hover:scale-110 active:scale-95 transition-all duration-300 shrink-0 touch-manipulation cursor-pointer"
            >
              <motion.div
                animate={{ rotate: isClicked ? 360 : 0, scale: isClicked ? 1.2 : 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="flex items-center justify-center"
              >
                <Terminal className="w-5 h-5 text-white" />
              </motion.div>
            </button>
            <div className="flex flex-col items-center sm:items-start">
              <span className="font-heading font-extrabold text-base sm:text-lg text-dark-900 dark:text-white">
                Prateek<span className="text-azure-600 dark:text-cyan-400">Gupta</span>
              </span>
              <span className="text-xs font-mono text-dark-800/70 dark:text-slate-400">
                SRE, DevOps & Azure Cloud Architecture
              </span>
            </div>
          </div>

          {/* Clean Enterprise SRE Tag */}
          <div className="text-xs font-mono text-dark-800/80 dark:text-slate-400 text-center max-w-sm sm:max-w-none">
            <span>© {currentYear} Prateek Gupta • Enterprise Cloud Infrastructure & SRE</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://github.com/iprateek13"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/90 dark:bg-dark-900/90 border border-slate-200 dark:border-slate-800 hover:border-azure-500 text-dark-800 dark:text-cream-300 hover:text-azure-600 transition-colors shadow-sm active:scale-95 touch-manipulation"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/iprateekgupta13"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/90 dark:bg-dark-900/90 border border-slate-200 dark:border-slate-800 hover:border-azure-500 text-dark-800 dark:text-cream-300 hover:text-azure-600 transition-colors shadow-sm active:scale-95 touch-manipulation"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:sre.prateek@gmail.com"
              className="p-2.5 rounded-xl bg-white/90 dark:bg-dark-900/90 border border-slate-200 dark:border-slate-800 hover:border-azure-500 text-dark-800 dark:text-cream-300 hover:text-azure-600 transition-colors shadow-sm active:scale-95 touch-manipulation"
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
