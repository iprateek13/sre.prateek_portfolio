"use client";

import React, { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/content";
import { ThreeCloudScene } from "@/components/canvas/ThreeCloudScene";
import { ArchitectureVisualizer } from "@/components/ui/ArchitectureVisualizer";
import { TerraformModuleExplorerModal } from "@/components/ui/TerraformModuleExplorerModal";
import { 
  Github, Linkedin, Mail, Download, ArrowRight, Zap, Cloud, 
  Layers, ShieldCheck, Boxes, Network, CheckCircle2, Sparkles, Terminal, Activity
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
    <span className="font-heading font-bold text-base sm:text-2xl text-cyan-300 tracking-wide flex items-center gap-2">
      <Zap className="w-5 h-5 text-emerald-400 shrink-0" />
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

      <section id="hero" className="relative min-h-screen pt-28 pb-16 sm:pt-36 sm:pb-24 flex items-center justify-center overflow-hidden bg-cyber-grid">
        {/* Ambient Neon Halos */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[150px] pointer-events-none" />

        {/* Dynamic 3D WebGL Background Canvas */}
        <ThreeCloudScene />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Bio & Hero Copy */}
            <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start space-y-6">
              
              {/* Availability & SLA Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-2xl backdrop-blur-xl"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="font-semibold text-slate-200">{portfolioData.availability}</span>
                <span className="text-slate-600">•</span>
                <span className="font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" /> 99.99% SLA Uptime
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-tight"
              >
                Building <span className="text-gradient-sre">Resilient Cloud</span> Infrastructure
              </motion.h1>

              {/* Subheading Typewriter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-10 flex items-center"
              >
                <TypewriterTitle />
              </motion.div>

              {/* Bio Summary */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed"
              >
                {portfolioData.pitch}
              </motion.p>

              {/* Action Buttons & Quick CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <a
                  href="#projects"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-2.5 shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:scale-105 hover:shadow-[0_0_40px_rgba(56,189,248,0.6)] transition-all"
                >
                  <span>Explore Infrastructure Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setIsModuleExplorerOpen(true)}
                  className="px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-cyan-300 font-mono text-sm flex items-center gap-2.5 transition-all shadow-lg backdrop-blur-md"
                >
                  <Boxes className="w-4 h-4 text-cyan-400" />
                  <span>Terraform Modules</span>
                </button>
              </motion.div>

              {/* Social Connections */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center gap-4 pt-4"
              >
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Connect:</span>
                <div className="flex items-center gap-2">
                  {portfolioData.socials.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 hover:scale-110 transition-all"
                      title={social.platform}
                    >
                      {socialIconMap[social.iconName] || <Mail className="w-5 h-5" />}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Live Architecture Visualizer Widget */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full max-w-md lg:max-w-none glass-panel rounded-3xl p-5 border border-cyan-500/20 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <Network className="w-40 h-40 text-cyan-400" />
                </div>

                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-xs text-slate-400">architecture-topology.tf</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    LIVE STATUS: OK
                  </span>
                </div>

                <ArchitectureVisualizer />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
