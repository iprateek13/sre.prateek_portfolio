"use client";

import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/content";
import { LiveTerminal } from "@/components/ui/LiveTerminal";
import { ThreeCloudScene } from "@/components/canvas/ThreeCloudScene";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowRight,
  Zap,
  Eye,
  X,
  FileText,
} from "lucide-react";
import { trackResumeDownload } from "@/lib/telemetry";

// Isolated Typewriter Sub-Component to prevent parent re-renders
const TypewriterTitle = memo(function TypewriterTitle() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = portfolioData.rotatingTitles[titleIndex];
    const updateSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
        if (displayText === currentTitle) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % portfolioData.rotatingTitles.length);
        }
      }
    }, updateSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <span className="font-heading font-bold text-base xs:text-xl sm:text-3xl text-azure-600 dark:text-cyan-300 tracking-wide flex items-center gap-1.5 sm:gap-2">
      <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-500 dark:text-emerald-400 shrink-0" />
      <span className="truncate">{displayText}</span>
      <span className="animate-pulse text-azure-500 dark:text-cyan-400 font-normal">|</span>
    </span>
  );
});

export function HeroSection() {
  const [showResumeModal, setShowResumeModal] = useState(false);

  // Manage modal-open body class and scroll locking for PDF previewer modal
  useEffect(() => {
    if (showResumeModal) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflow = "auto";
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.classList.remove("modal-open");
    };
  }, [showResumeModal]);

  const socialIconMap: Record<string, React.ReactNode> = {
    Github: <Github className="w-5 h-5" />,
    Linkedin: <Linkedin className="w-5 h-5" />,
    Mail: <Mail className="w-5 h-5" />,
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 sm:pt-36 sm:pb-24 flex items-center justify-center overflow-hidden">
      {/* Dynamic 3D WebGL WebGL Background Canvas (Memoized for 0% render overhead) */}
      <ThreeCloudScene />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Typography & Bio */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Availability Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 dark:bg-dark-900/90 border border-azure-500/30 dark:border-cyan-400/30 text-azure-600 dark:text-cyan-300 text-xs font-mono mb-6 shadow-md backdrop-blur-xl"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-semibold">{portfolioData.availability}</span>
            </motion.div>

            {/* Main Name Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-extrabold text-3.5xl xs:text-5xl sm:text-7xl lg:text-8xl tracking-tight text-dark-900 dark:text-white leading-[1.08] mb-3 sm:mb-4"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-azure-600 via-cyan-500 to-emerald-500 dark:from-azure-300 dark:via-cyan-300 dark:to-emerald-300 animate-gradient-x">
                {portfolioData.name}
              </span>
            </motion.h1>

            {/* Dynamic Typewriter Title (Isolated) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-10 sm:h-14 flex items-center justify-center lg:justify-start mb-4 sm:mb-6 w-full"
            >
              <TypewriterTitle />
            </motion.div>

            {/* Pitch */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-xl text-sm sm:text-lg text-dark-800/90 dark:text-cream-300/90 font-body leading-relaxed mb-6 sm:mb-8 text-center lg:text-left px-2 sm:px-0"
            >
              {portfolioData.pitch}
            </motion.p>

            {/* CTA Buttons (View Projects & Preview Resume) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8 w-full sm:w-auto"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-extrabold rounded-2xl bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white dark:text-dark-950 font-heading shadow-azure-glow hover:scale-105 active:scale-98 transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <span>View SRE & Cloud Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={() => setShowResumeModal(true)}
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold rounded-2xl bg-white/90 dark:bg-dark-900/90 border border-azure-500/40 text-azure-600 dark:text-cyan-300 hover:bg-azure-500/10 backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-98 shadow-md w-full sm:w-auto cursor-pointer"
              >
                <Eye className="w-4 h-4 text-azure-500" />
                <span>Preview Resume</span>
              </button>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4"
            >
              {portfolioData.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 sm:p-3.5 rounded-2xl bg-white/90 dark:bg-dark-900/90 border border-slate-200 dark:border-slate-800 hover:border-azure-500 text-dark-800 dark:text-cream-300 hover:text-azure-600 transition-all duration-300 hover:scale-110 active:scale-95 shadow-md touch-manipulation"
                  aria-label={social.platform}
                >
                  {socialIconMap[social.iconName] || <Mail className="w-5 h-5" />}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Live SRE Terminal Hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 w-full mt-4 lg:mt-0"
          >
            <LiveTerminal />
          </motion.div>
        </div>
      </div>

      {/* In-Browser PDF Resume Previewer Modal with Navbar Lock & sre.prateek_resume Title */}
      <AnimatePresence>
        {showResumeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-dark-950/80 backdrop-blur-md cursor-pointer"
            onClick={() => setShowResumeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl h-[88vh] rounded-3xl bg-white dark:bg-dark-900 border border-azure-500/40 shadow-2xl flex flex-col overflow-hidden cursor-default my-auto"
            >
              {/* Modal Bar with sre.prateek_resume */}
              <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white/90 dark:bg-dark-900/90">
                <div className="flex items-center gap-2.5 text-dark-900 dark:text-white font-mono font-bold text-xs sm:text-sm">
                  <FileText className="w-4 h-4 text-azure-500" />
                  <span>sre.prateek_resume</span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="/sre.prateek_resume.pdf"
                    download="sre.prateek_resume.pdf"
                    onClick={trackResumeDownload}
                    className="px-3.5 py-1.5 rounded-xl bg-azure-500 text-white text-xs font-bold font-heading hover:bg-azure-600 transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden xs:inline">Download PDF</span>
                  </a>

                  <button
                    onClick={() => setShowResumeModal(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-dark-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-800 transition-colors"
                    aria-label="Close Resume Preview"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* PDF Viewport Iframe */}
              <div className="flex-1 w-full h-full bg-slate-900">
                <iframe
                  src="/sre.prateek_resume.pdf"
                  className="w-full h-full border-none"
                  title="sre.prateek_resume"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
