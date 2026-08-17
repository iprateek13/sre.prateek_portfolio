"use client";

import React, { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/content";
import { SreMetricsCard } from "@/components/ui/SreMetricsCard";
import { ThreeCloudScene } from "@/components/canvas/ThreeCloudScene";
import { ArchitectureVisualizer } from "@/components/ui/ArchitectureVisualizer";
import { TerraformModuleExplorerModal } from "@/components/ui/TerraformModuleExplorerModal";
import { 
  Github, Linkedin, Mail, Download, ArrowRight, Zap, Cloud, 
  Layers, ShieldCheck, Boxes, Network, CheckCircle2, Sparkles 
} from "lucide-react";
import { trackResumeDownload } from "@/lib/telemetry";

const TypewriterTitle = memo(function TypewriterTitle() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = portfolioData.rotatingTitles[titleIndex];
    const updateSpeed = isDeleting ? 35 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
        if (displayText === currentTitle) {
          setTimeout(() => setIsDeleting(true), 2400);
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
    <span className="font-heading font-bold text-sm xs:text-base sm:text-2xl text-azure-600 dark:text-cyan-300 tracking-wide flex items-center gap-2">
      <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 shrink-0" />
      <span className="truncate">{displayText}</span>
      <span className="animate-pulse text-cyan-400 font-normal">|</span>
    </span>
  );
});

export function HeroSection() {
  const [isModuleExplorerOpen, setIsModuleExplorerOpen] = useState(false);

  const socialIconMap: Record<string, React.ReactNode> = {
    Github: <Github className="w-5 h-5" />,
    Linkedin: <Linkedin className="w-5 h-5" />,
    Mail: <Mail className="w-5 h-5" />,
  };

  return (
    <>
      <TerraformModuleExplorerModal
        isOpen={isModuleExplorerOpen}
        onClose={() => setIsModuleExplorerOpen(false)}
      />

      <section id="hero" className="relative min-h-screen pt-28 pb-16 sm:pt-36 sm:pb-24 flex items-center justify-center overflow-hidden bg-mesh-gradient">
        {/* Ambient Neon Radial Halos */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-azure-500/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-[140px] pointer-events-none" />

        {/* Dynamic 3D WebGL Background Canvas */}
        <ThreeCloudScene />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Hero Typography & Bio */}
            <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
              
              {/* Availability & Live SLA Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 dark:bg-dark-900/90 border border-azure-500/30 text-azure-600 dark:text-cyan-300 text-xs font-mono mb-6 shadow-xl backdrop-blur-xl"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-semibold">{portfolioData.availability}</span>
                <span className="hidden sm:inline-block text-slate-400">•</span>
                <span className="hidden sm:inline-block font-mono text-emerald-400 font-bold">99.99% SLA Uptime</span>
              </motion.div>

              {/* Main Name Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-heading font-extrabold text-4xl xs:text-5xl sm:text-7xl lg:text-8xl tracking-tight text-dark-900 dark:text-white leading-[1.08] mb-3 sm:mb-4"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-azure-600 via-cyan-400 to-emerald-400 dark:from-azure-300 dark:via-cyan-300 dark:to-emerald-300">
                  {portfolioData.name}
                </span>
              </motion.h1>

              {/* Dynamic Typewriter Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-10 sm:h-12 flex items-center justify-center lg:justify-start mb-4 sm:mb-6 w-full"
              >
                <TypewriterTitle />
              </motion.div>

              {/* Pitch */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-xl text-sm sm:text-lg text-slate-700 dark:text-slate-300 font-body leading-relaxed mb-6 sm:mb-8 text-center lg:text-left px-2 sm:px-0"
              >
                {portfolioData.pitch}
              </motion.p>

              {/* Floating Tech Badges with Interactive Trigger */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-6 sm:mb-8"
              >
                <button
                  onClick={() => setIsModuleExplorerOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-azure-500/10 hover:bg-azure-500/20 border border-azure-500/40 text-azure-600 dark:text-cyan-300 text-xs font-mono font-bold flex items-center gap-2 shadow-sm backdrop-blur-md transition-all hover:scale-105"
                >
                  <Boxes className="w-4 h-4 text-cyan-400" />
                  <span>15+ Terraform IaC Modules</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </button>

                <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs font-mono font-bold flex items-center gap-2 shadow-sm backdrop-blur-md">
                  <Cloud className="w-4 h-4 text-emerald-400" />
                  <span>Azure & AWS Multi-Cloud</span>
                </div>

                <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-300 text-xs font-mono font-bold flex items-center gap-2 shadow-sm backdrop-blur-md">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>DevSecOps & OPA Policy</span>
                </div>
              </motion.div>

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
                  className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-extrabold rounded-2xl bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white font-heading shadow-azure-glow hover:scale-105 active:scale-98 transition-all duration-300 w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>View Flagship Projects</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>

                <a
                  href="/sre.prateek_resume.pdf"
                  download="sre.prateek_resume.pdf"
                  onClick={trackResumeDownload}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold rounded-2xl bg-white/90 dark:bg-dark-900/90 border border-slate-300 dark:border-slate-700/80 hover:border-azure-500 text-dark-900 dark:text-cream-200 hover:text-azure-600 backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-98 shadow-md w-full sm:w-auto"
                >
                  <Download className="w-4 h-4 text-azure-500 group-hover:-translate-y-0.5 transition-transform" />
                  <span>Download Resume PDF</span>
                </a>
              </motion.div>

              {/* Social Links */}
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
                    className="p-3 sm:p-3.5 rounded-2xl bg-white/90 dark:bg-dark-900/90 border border-slate-200 dark:border-slate-800 hover:border-azure-500 text-dark-800 dark:text-cream-300 hover:text-azure-600 transition-all duration-300 hover:scale-110 active:scale-95 shadow-md"
                    aria-label={social.platform}
                  >
                    {socialIconMap[social.iconName] || <Mail className="w-5 h-5" />}
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Right Column: SRE Live Command Center Dashboard */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-5 w-full"
            >
              <SreMetricsCard />
            </motion.div>
          </div>

          {/* Interactive Multi-Cloud Architecture Visualizer Section embedded directly in Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="pt-6"
          >
            <ArchitectureVisualizer />
          </motion.div>
        </div>
      </section>
    </>
  );
}
