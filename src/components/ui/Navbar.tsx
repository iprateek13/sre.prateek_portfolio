"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/content";
import { ThemeToggle } from "./ThemeToggle";
import { CmdKModal } from "./CmdKModal";
import { 
  Terminal, Menu, X, Download, Search, ShieldCheck, Folder, 
  Cpu, Layers, Mail, User, Sparkles, Command
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

      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3.5 transition-all duration-500">
        <div className="max-w-7xl mx-auto">
          <nav
            className={`w-full rounded-2xl sm:rounded-full transition-all duration-500 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between ${
              isScrolled
                ? "glass-panel bg-slate-950/80 border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                : "bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl"
            }`}
          >
            {/* Logo Brand */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="p-2 rounded-xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-emerald-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)] group-hover:scale-105 transition-transform">
                <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-sm sm:text-base tracking-tight text-white flex items-center gap-2">
                  <span>Prateek Gupta</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                    SRE / DevOps
                  </span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>99.99% Cloud Uptime</span>
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-950/70 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.id;

                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500/20 to-emerald-500/20 border border-cyan-500/40 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? "text-cyan-300" : "text-slate-400"}`} />
                    <span className="relative z-10">{link.name}</span>
                  </a>
                );
              })}
            </div>

            {/* Right Action Icons & Mobile Menu Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Cmd+K Search Trigger */}
              <button
                onClick={() => setCmdKOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-all shadow-sm"
              >
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span>Search</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300 font-sans flex items-center gap-0.5">
                  <Command className="w-2.5 h-2.5" /> K
                </kbd>
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Resume Download CTA */}
              <a
                href="/resume.pdf"
                download="Prateek_Gupta_Resume.pdf"
                onClick={trackResumeDownload}
                className="hidden xl:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 text-slate-950 font-bold text-xs hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] hover:scale-105 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-3 top-20 z-40 lg:hidden p-4 rounded-2xl bg-slate-950/95 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl space-y-3"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800/80 text-sm font-medium text-slate-200 hover:border-cyan-500/40 hover:text-cyan-300 transition-all"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{link.name}</span>
                </a>
              );
            })}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCmdKOpen(true);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300"
              >
                <Search className="w-4 h-4" />
                <span>Quick Search (Cmd+K)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
