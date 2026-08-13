"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { portfolioData } from "@/data/content";
import { Menu, X, Download, Terminal, ChevronRight } from "lucide-react";
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
            scrolled ? "shadow-2xl border-azure-500/30" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Left Brand Badge */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#hero");
              }}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-azure-600 via-cyan-500 to-emerald-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-dark-950 flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-cyan-300" />
                </div>
              </div>
              <span className="font-heading font-extrabold text-sm sm:text-base tracking-tight text-dark-900 dark:text-white">
                Prateek <span className="text-azure-600 dark:text-cyan-300">Gupta</span>
              </span>
            </a>

            {/* Desktop Center Nav Links */}
            <div className="hidden md:flex items-center gap-1 sm:gap-2">
              {navLinks.map((link) => {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="relative px-3.5 py-1.5 rounded-full text-xs font-semibold font-heading text-dark-800/90 dark:text-cream-300/90 hover:text-azure-600 dark:hover:text-cyan-300 transition-colors"
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="/sre.prateek_resume.pdf"
                download="sre.prateek_resume.pdf"
                onClick={trackResumeDownload}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2 text-xs font-extrabold rounded-full bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white shadow-azure-glow hover:scale-105 active:scale-98 transition-all duration-300 font-heading"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>

              <ThemeToggle />

              {/* Mobile Hamburger Button with Relaxed Ultra-Smooth Morphing */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-full bg-white/80 dark:bg-dark-900/80 border border-slate-200/80 dark:border-slate-800/80 text-dark-900 dark:text-cream-200 hover:text-azure-600 focus:outline-none touch-manipulation active:scale-90 transition-all duration-300 flex items-center justify-center relative overflow-hidden"
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
                    href="/sre.prateek_resume.pdf"
                    download="sre.prateek_resume.pdf"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      trackResumeDownload();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white font-extrabold text-sm font-heading shadow-azure-glow active:scale-98 transition-all duration-300"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download sre.prateek_resume.pdf</span>
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
