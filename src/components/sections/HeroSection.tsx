"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThreeCloudScene } from "@/components/canvas/ThreeCloudScene";
import { LiveTerminal } from "@/components/ui/LiveTerminal";
import { portfolioData } from "@/data/content";
import { ArrowRight, Download, Github, Linkedin, Mail, Cloud, Cpu, ShieldCheck, Sparkles, Zap, Activity } from "lucide-react";

export function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = portfolioData.rotatingTitles[titleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText === currentTitle) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % portfolioData.rotatingTitles.length);
    } else {
      const speed = isDeleting ? 40 : 80;
      timer = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentTitle.substring(0, displayText.length - 1)
            : currentTitle.substring(0, displayText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  const socialIconMap: Record<string, React.ReactNode> = {
    Github: <Github className="w-5 h-5" />,
    Linkedin: <Linkedin className="w-5 h-5" />,
    Mail: <Mail className="w-5 h-5" />,
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 flex items-center justify-center overflow-hidden bg-cream-100 dark:bg-dark-950 text-dark-900 dark:text-cream-300"
    >
      {/* 3D WebGL Canvas Scene */}
      <ThreeCloudScene />

      {/* Animated Digital Infrastructure Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 dark:opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/90 dark:bg-dark-900/90 border border-azure-500/30 dark:border-cyan-400/40 text-[11px] sm:text-xs font-bold text-azure-600 dark:text-cyan-300 backdrop-blur-xl shadow-md mb-4 sm:mb-6 max-w-full"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-azure-500 dark:bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-azure-600 dark:bg-cyan-400" />
              </span>
              <Activity className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
              <span className="truncate">{portfolioData.availability}</span>
            </motion.div>

            {/* Main Name Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-extrabold text-3.5xl xs:text-5xl sm:text-7xl lg:text-8xl tracking-tight text-dark-900 dark:text-white mb-3 sm:mb-4 leading-none"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-azure-600 via-cyan-500 to-emerald-500 dark:from-azure-300 dark:via-cyan-300 dark:to-emerald-300 animate-gradient-x">
                {portfolioData.name}
              </span>
            </motion.h1>

            {/* Dynamic Typewriter Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-10 sm:h-14 flex items-center justify-center lg:justify-start mb-4 sm:mb-6 w-full"
            >
              <span className="font-heading font-bold text-base xs:text-xl sm:text-3xl text-azure-600 dark:text-cyan-300 tracking-wide flex items-center gap-1.5 sm:gap-2">
                <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span className="truncate">{displayText}</span>
                <span className="animate-pulse text-azure-500 dark:text-cyan-400 font-normal">|</span>
              </span>
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

            {/* CTA Buttons */}
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
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-extrabold rounded-2xl bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white dark:text-dark-950 font-heading shadow-azure-glow hover:scale-105 active:scale-98 transition-all duration-300 w-full sm:w-auto"
              >
                <span>View SRE & Cloud Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="/resume.pdf"
                download
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold rounded-2xl bg-white/90 dark:bg-dark-900/90 border border-slate-300 dark:border-slate-700/80 hover:border-azure-500 text-dark-900 dark:text-cream-200 hover:text-azure-600 backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-98 shadow-md w-full sm:w-auto"
              >
                <Download className="w-4 h-4 text-azure-500 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download Resume</span>
              </a>
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

          {/* Right Live Terminal Column */}
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
    </section>
  );
}
