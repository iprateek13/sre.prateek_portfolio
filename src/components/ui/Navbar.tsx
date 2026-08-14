"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Terminal, Download, Menu, X, ChevronRight } from "lucide-react";
import { trackResumeDownload } from "@/lib/telemetry";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#about");
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
    // 1. Light-weight scroll listener for navbar background state & scroll boundaries
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 2. Max-Intersection Ratio Tracking to prevent skipping 2 steps ahead
    const sectionIds = ["about", "skills", "projects", "experience", "contact"];
    const sectionElements: HTMLElement[] = [];
    const visibleRatios: Record<string, number> = {};

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        sectionElements.push(el);
        visibleRatios[id] = 0;
      }
    });

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-20% 0px -35% 0px",
      threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1.0],
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Top of page boundary -> About section
      if (window.scrollY < 120) {
        setActiveSection("#about");
        return;
      }

      // Bottom of page boundary -> Contact section
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 90) {
        setActiveSection("#contact");
        return;
      }

      // Record ratio for each entry
      entries.forEach((entry) => {
        visibleRatios[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
      });

      // Find the SINGLE section with maximum visible ratio in focus window
      let maxRatio = 0;
      let bestSection = "";

      Object.entries(visibleRatios).forEach(([id, ratio]) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          bestSection = `#${id}`;
        }
      });

      if (bestSection && maxRatio > 0.02) {
        setActiveSection(bestSection);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionElements.forEach((el) => observer.observe(el));

    // 3. Track modal open/close to hide navbar smoothly
    const checkModal = () => {
      setIsModalOpen(document.body.classList.contains("modal-open"));
    };

    const mutationObserver = new MutationObserver(checkModal);
    mutationObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      mutationObserver.disconnect();
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
            transition={{ duration: 0.35, ease: "easeInOut" }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-30 bg-dark-950/45 backdrop-blur-sm md:hidden cursor-pointer transform-gpu"
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

            {/* Desktop Navigation Links with Sequential 1-Step Max-Ratio Sliding Pill */}
            <div className="hidden md:flex items-center gap-1 bg-white/40 dark:bg-dark-900/40 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md relative">
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
                    className={`relative px-4 py-1.5 text-xs sm:text-sm font-bold rounded-full transition-colors duration-150 ${
                      isActive
                        ? "text-azure-600 dark:text-cyan-300"
                        : "text-dark-800/80 dark:text-cream-300/80 hover:text-azure-600 dark:hover:text-cyan-300"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbarActivePill"
                        className="absolute inset-0 rounded-full bg-azure-500/15 dark:bg-cyan-400/15 border border-azure-500/35 dark:border-cyan-400/35 shadow-sm"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                          mass: 0.6,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
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

        {/* Mobile Drawer Dropdown Menu with Relaxed 0.42s Premium Easing */}
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
