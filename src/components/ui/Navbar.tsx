"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Terminal, Download, Menu, X, Sparkles, ChevronRight } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pt-2 sm:pt-4 pointer-events-none">
      <nav
        className={`max-w-6xl mx-auto rounded-2xl sm:rounded-3xl transition-all duration-500 pointer-events-auto px-4 py-2.5 sm:px-6 sm:py-3.5 glass-navbar-ios ${
          scrolled ? "shadow-xl border-azure-500/30 dark:border-cyan-400/30" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo & SRE Badge */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#hero");
            }}
            className="flex items-center gap-2 sm:gap-3 group active:scale-95 transition-transform touch-manipulation"
          >
            <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-azure-600 via-cyan-500 to-emerald-500 text-white shadow-azure-glow group-hover:scale-105 transition-all duration-300">
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-base sm:text-lg tracking-tight text-dark-900 dark:text-white flex items-center gap-1.5">
                Prateek<span className="text-azure-600 dark:text-cyan-400">Gupta</span>
              </span>
              <span className="text-[10px] sm:text-xs font-mono font-bold text-azure-600 dark:text-cyan-300 tracking-wider uppercase -mt-0.5">
                SRE & Cloud
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/50 dark:bg-dark-900/50 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl text-dark-800 dark:text-cream-300 hover:text-azure-600 dark:hover:text-cyan-300 hover:bg-azure-500/10 dark:hover:bg-azure-500/20 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action Controls: Resume Button, Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Download Resume CTA */}
            <a
              href="/resume.pdf"
              download
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-extrabold rounded-xl sm:rounded-2xl bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white shadow-azure-glow hover:scale-105 transition-all duration-300 font-heading"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Light / Dark Mode Toggle */}
            <ThemeToggle />

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-dark-900/80 border border-slate-200/80 dark:border-slate-800/80 text-dark-900 dark:text-cream-200 hover:text-azure-600 focus:outline-none touch-manipulation active:scale-95 transition-all"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden max-w-6xl mx-auto mt-2 pointer-events-auto"
          >
            <div className="p-4 rounded-3xl glass-navbar-ios shadow-2xl border border-azure-500/30 dark:border-cyan-400/30 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold text-dark-900 dark:text-white hover:bg-azure-500/10 dark:hover:bg-azure-500/20 active:bg-azure-500/20 transition-all touch-manipulation"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-azure-500 dark:text-cyan-400" />
                </a>
              ))}

              <div className="pt-2 mt-1 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between gap-3">
                <a
                  href="/resume.pdf"
                  download
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white font-extrabold text-sm font-heading shadow-azure-glow active:scale-98 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume PDF</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
