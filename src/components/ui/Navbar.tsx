"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Download, Menu, X, Terminal, ChevronRight, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/content";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300 pointer-events-none">
      <div className="max-w-6xl mx-auto mt-3 sm:mt-4 pointer-events-auto">
        <nav
          className={`glass-navbar-ios transition-all duration-500 rounded-3xl px-4 sm:px-6 py-3 flex items-center justify-between ${
            scrolled ? "shadow-2xl scale-[0.99]" : "scale-100"
          }`}
        >
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "#hero")}
            className="group flex items-center gap-2.5 text-dark-900 dark:text-white font-heading font-bold text-lg sm:text-xl tracking-tight"
          >
            <div className="relative w-9 h-9 rounded-2xl bg-white/90 dark:bg-dark-900/90 border border-white/60 dark:border-white/10 flex items-center justify-center text-azure-500 dark:text-cyan-400 group-hover:border-azure-500 transition-colors shadow-md overflow-hidden">
              <Terminal className="w-5 h-5 text-azure-500 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <span className="group-hover:text-azure-600 transition-colors">
              Prateek<span className="text-azure-500 dark:text-cyan-400 font-extrabold">.sre</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/40 dark:bg-dark-950/40 p-1.5 rounded-full border border-white/50 dark:border-white/10 shadow-inner backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-4 py-1.5 text-xs sm:text-sm font-bold transition-all duration-300 rounded-full ${
                    isActive
                      ? "text-white dark:text-dark-950"
                      : "text-slate-700 dark:text-slate-300 hover:text-azure-600 dark:hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 rounded-full shadow-azure-glow"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/resume.pdf"
              download
              className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white dark:text-dark-950 bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 rounded-2xl shadow-azure-glow hover:scale-105 transition-all duration-300"
            >
              <Download className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-2xl bg-white/80 dark:bg-dark-850/80 border border-white/60 dark:border-white/10 text-dark-800 dark:text-slate-300 hover:text-azure-600 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.25 }}
              className="md:hidden mt-2 glass-navbar-ios rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="flex items-center justify-between text-base font-bold text-dark-900 dark:text-slate-200 hover:text-azure-600 py-2.5 px-3 rounded-2xl hover:bg-white/50 dark:hover:bg-dark-850/50 transition-all"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-azure-500" />
                  </a>
                ))}
                <a
                  href="/resume.pdf"
                  download
                  className="mt-2 flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white dark:text-dark-950 font-extrabold rounded-2xl shadow-azure-glow"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
