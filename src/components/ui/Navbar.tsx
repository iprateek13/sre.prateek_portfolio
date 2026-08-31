"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/content";
import { ThemeToggle } from "./ThemeToggle";
import { CmdKModal } from "./CmdKModal";
import { 
  Terminal, Menu, X, Download, Search, ShieldCheck, Folder, 
  Cpu, Layers, Mail, User, Sparkles 
} from "lucide-react";
import { trackResumeDownload } from "@/lib/telemetry";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [cmdKOpen, setCmdKOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["hero", "about", "skills", "projects", "experience", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about", id: "about", icon: User },
    { name: "Skills", href: "#skills", id: "skills", icon: Cpu },
    { name: "Projects", href: "#projects", id: "projects", icon: Folder },
    { name: "Experience", href: "#experience", id: "experience", icon: Layers },
    { name: "Contact", href: "#contact", id: "contact", icon: Mail },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <CmdKModal isOpen={cmdKOpen} onClose={() => setCmdKOpen(false)} />

      <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-3 transition-all duration-500">
        <div className="max-w-7xl mx-auto">
          <nav
            className={`w-full rounded-2xl sm:rounded-3xl transition-all duration-500 px-4 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between ${
              isScrolled
                ? "glass-navbar-tuf shadow-2xl"
                : "bg-white/70 dark:bg-dark-900/70 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-xl"
            }`}
          >
            {/* Logo Brand */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="p-2 rounded-xl bg-gradient-to-tr from-azure-500 via-cyan-500 to-emerald-500 text-white shadow-azure-glow group-hover:scale-110 transition-transform">
                <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-sm sm:text-base tracking-tight text-dark-900 dark:text-white flex items-center gap-1.5">
                  <span>Prateek Gupta</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-azure-500/10 text-azure-500 dark:text-cyan-300">
                    SRE
                  </span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 hidden sm:inline-block">
                  Azure & AWS Multi-Cloud
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-100/60 dark:bg-dark-950/60 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-4 py-2 rounded-xl text-xs font-heading font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                      isActive
                        ? "text-azure-600 dark:text-cyan-300 bg-white dark:bg-dark-850 shadow-md"
                        : "text-slate-600 dark:text-slate-400 hover:text-dark-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>

            {/* Right Action Bar */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Cmd+K Search Trigger Button */}
              <button
                onClick={() => setCmdKOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-dark-850 hover:bg-slate-200 dark:hover:bg-dark-800 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400 transition-colors"
                title="Search projects & skills"
              >
                <Search className="w-3.5 h-3.5 text-azure-500" />
                <span>Search</span>
                <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-white dark:bg-dark-950 border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-sans">
                  ⌘K
                </kbd>
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Resume Download Action */}
              <a
                href="/sre.prateek_resume.pdf"
                download="sre.prateek_resume.pdf"
                onClick={trackResumeDownload}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-heading font-bold rounded-xl bg-gradient-to-r from-azure-500 to-cyan-500 text-white shadow-azure-glow hover:scale-105 active:scale-95 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-dark-850 border border-slate-200 dark:border-slate-800 text-dark-900 dark:text-white"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 top-20 z-30 lg:hidden p-5 rounded-3xl glass-mobile-drawer border border-azure-500/30 shadow-2xl flex flex-col gap-3"
          >
            {/* Search Trigger for Mobile */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCmdKOpen(true);
              }}
              className="flex items-center justify-between p-3 rounded-2xl bg-azure-500/10 border border-azure-500/30 text-xs font-mono text-azure-400"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                <span>Search Projects & Skills</span>
              </div>
              <kbd className="px-2 py-0.5 rounded bg-dark-900 border border-slate-800 text-[10px]">⌘K</kbd>
            </button>

            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-azure-500/10 text-sm font-heading font-semibold text-dark-900 dark:text-white transition-colors"
                  >
                    <Icon className="w-4 h-4 text-azure-500" />
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>

            <a
              href="/sre.prateek_resume.pdf"
              download="sre.prateek_resume.pdf"
              onClick={() => {
                trackResumeDownload();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white font-heading font-bold text-xs shadow-azure-glow"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume PDF</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
