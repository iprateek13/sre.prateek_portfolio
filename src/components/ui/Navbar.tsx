"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Terminal, Download, Menu, X, ChevronRight } from "lucide-react";
import { trackResumeDownload } from "@/lib/telemetry";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      // Scroll Spy for active section highlight
      const sections = ["#hero", "#about", "#skills", "#projects", "#experience", "#contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.querySelector(section) as HTMLElement | null;
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Track modal open/close to hide navbar smoothly
    const checkModal = () => {
      setIsModalOpen(document.body.classList.contains("modal-open"));
    };

    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    setActiveSection(href);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Mobile Menu Backdrop Overlay - Tapping outside closes drawer immediately */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-30 bg-dark-950/40 backdrop-blur-sm md:hidden cursor-pointer"
          />
        )}
      </AnimatePresence>

      <header
        className={`fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 transition-all duration-300 ${
          isModalOpen ? "opacity-0 pointer-events-none -translate-y-8 scale-95" : "opacity-100 translate-y-0 scale-100"
        }`}
      >
        <nav
          className={`max-w-6xl mx-auto rounded-full transition-all duration-300 pointer-events-auto px-4 py-2.5 sm:px-6 sm:py-3 glass-navbar-tuf ${
            scrolled ? "shadow-2xl border-azure-500/40 dark:border-cyan-400/40" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#hero");
              }}
              className="flex items-center gap-2.5 group active:scale-95 transition-transform touch-manipulation"
            >
              <div className="p-2 sm:p-2.5 rounded-full bg-gradient-to-tr from-azure-600 via-cyan-500 to-emerald-500 text-white shadow-azure-glow group-hover:scale-105 transition-all duration-300">
                <Terminal className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-base sm:text-lg tracking-tight text-dark-900 dark:text-white flex items-center gap-1">
                  Prateek<span className="text-azure-600 dark:text-cyan-400">Gupta</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-azure-600 dark:text-cyan-300 tracking-wider uppercase -mt-1 hidden sm:inline-block">
                  SRE & Cloud Architecture
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 bg-white/40 dark:bg-dark-900/40 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className={`relative px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 ${
                      isActive
                        ? "text-azure-600 dark:text-cyan-300 font-bold bg-azure-500/15 dark:bg-cyan-400/15 border border-azure-500/30 dark:border-cyan-400/30 shadow-sm"
                        : "text-dark-800/80 dark:text-cream-300/80 hover:text-azure-600 dark:hover:text-cyan-300 hover:bg-azure-500/10 dark:hover:bg-azure-500/20"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="/resume.pdf"
                download
                onClick={trackResumeDownload}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2 text-xs font-extrabold rounded-full bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white shadow-azure-glow hover:scale-105 active:scale-98 transition-all duration-300 font-heading"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>

              <ThemeToggle />

              {/* Mobile Hamburger Button with Ultra-Smooth Spring Icon Morphing */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-full bg-white/80 dark:bg-dark-900/80 border border-slate-200/80 dark:border-slate-800/80 text-dark-900 dark:text-cream-200 hover:text-azure-600 focus:outline-none touch-manipulation active:scale-90 transition-all duration-300 flex items-center justify-center relative overflow-hidden"
                aria-label="Toggle Navigation Menu"
              >
                <motion.div
                  initial={false}
                  animate={{
                    rotate: mobileMenuOpen ? 180 : 0,
                    scale: mobileMenuOpen ? 1.08 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 24,
                  }}
                  className="flex items-center justify-center"
                >
                  <AnimatePresence mode="wait">
                    {mobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-5 h-5 text-azure-600 dark:text-cyan-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
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

        {/* Mobile Drawer Dropdown Menu with Ultra-Smooth Spring Physics */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -24, scale: 0.93 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.93 }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 28,
                mass: 0.8,
              }}
              className="md:hidden max-w-6xl mx-auto mt-2.5 pointer-events-auto transform-gpu"
            >
              <div className="p-4 sm:p-5 rounded-3xl glass-mobile-drawer flex flex-col gap-2.5 shadow-2xl">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.035 + 0.05, duration: 0.25, ease: "easeOut" }}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="flex items-center justify-between px-4.5 py-3.5 rounded-2xl text-sm font-bold text-dark-900 dark:text-white hover:bg-azure-500/10 dark:hover:bg-azure-500/20 active:bg-azure-500/25 transition-all touch-manipulation group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-azure-500 dark:text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
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
      </header>
    </>
  );
}
