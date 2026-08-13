"use client";

import React, { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Menu, X, Download, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackResumeDownload } from "@/lib/telemetry";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#hero" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-3 sm:p-5 transition-all duration-300 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        <nav
          className={`glass-navbar-tuf rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 ${
            scrolled ? "shadow-2xl border-azure-500/40" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Left Brand Badge matching screenshot */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#hero");
              }}
              className="flex items-center gap-2.5 group cursor-pointer shrink-0"
            >
              {/* Circular black badge with >_ prompt matching screenshot */}
              <div className="w-8 h-8 rounded-full bg-slate-950 dark:bg-black text-cyan-400 font-mono font-bold text-xs flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-cyan-500/30">
                &gt;_
              </div>
              <span className="font-heading font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white">
                Prateek <span className="text-azure-600 dark:text-cyan-400">Gupta</span>
              </span>
            </a>

            {/* Desktop Center Nav Links matching screenshot spacing */}
            <div className="hidden md:flex items-center justify-center gap-6 lg:gap-8 flex-1 px-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-xs sm:text-sm font-semibold font-heading text-slate-700 dark:text-cream-200 hover:text-azure-600 dark:hover:text-cyan-300 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right Action Controls matching screenshot */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <a
                href="/resume.pdf"
                download
                onClick={trackResumeDownload}
                className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-full bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white shadow-azure-glow hover:scale-105 active:scale-98 transition-all duration-300 font-heading"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>

              <ThemeToggle />

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-full bg-white/80 dark:bg-dark-900/80 border border-slate-200/80 dark:border-slate-800/80 text-dark-900 dark:text-cream-200 hover:text-azure-600 focus:outline-none touch-manipulation active:scale-90 transition-all duration-300 flex items-center justify-center relative overflow-hidden"
                aria-label="Toggle Navigation Menu"
              >
                <motion.div
                  initial={false}
                  animate={{
                    rotate: mobileMenuOpen ? 180 : 0,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center justify-center"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {mobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <X className="w-5 h-5 text-azure-600 dark:text-cyan-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <Menu className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Drawer Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                duration: 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: "top center", willChange: "transform, opacity" }}
              className="md:hidden max-w-6xl mx-auto mt-2.5 pointer-events-auto transform-gpu"
            >
              <div className="p-4 sm:p-5 rounded-3xl glass-mobile-drawer flex flex-col gap-2 shadow-2xl">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="flex items-center justify-between px-4.5 py-3.5 rounded-2xl text-sm font-bold text-dark-900 dark:text-white hover:bg-azure-500/10 dark:hover:bg-azure-500/20 active:bg-azure-500/25 transition-all touch-manipulation group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-azure-500 dark:text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}

                <div className="pt-3 mt-1 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-3">
                  <a
                    href="/resume.pdf"
                    download
                    onClick={() => {
                      setMobileMenuOpen(false);
                      trackResumeDownload();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white font-extrabold text-sm font-heading shadow-azure-glow active:scale-98 transition-all duration-300"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Resume PDF</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
