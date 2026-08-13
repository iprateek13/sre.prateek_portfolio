"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/content";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  Cloud,
  Network,
  Layers,
  Database,
  Cpu,
  Boxes,
  Repeat,
  ShieldCheck,
  GitBranch,
  Workflow,
  Key,
  BarChart3,
  Container,
  Gauge,
  Terminal,
  Code,
  TerminalSquare,
  FileCode,
  FileCode2,
  FileSpreadsheet,
  GitMerge,
  Activity,
  Sparkles,
} from "lucide-react";

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const skillIconMap: Record<string, React.ReactNode> = {
    Cloud: <Cloud className="w-5 h-5" />,
    Network: <Network className="w-5 h-5" />,
    Layers: <Layers className="w-5 h-5" />,
    Database: <Database className="w-5 h-5" />,
    Cpu: <Cpu className="w-5 h-5" />,
    Boxes: <Boxes className="w-5 h-5" />,
    Repeat: <Repeat className="w-5 h-5" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5" />,
    GitBranch: <GitBranch className="w-5 h-5" />,
    Workflow: <Workflow className="w-5 h-5" />,
    Key: <Key className="w-5 h-5" />,
    BarChart3: <BarChart3 className="w-5 h-5" />,
    Container: <Container className="w-5 h-5" />,
    Gauge: <Gauge className="w-5 h-5" />,
    Terminal: <Terminal className="w-5 h-5" />,
    Code: <Code className="w-5 h-5" />,
    TerminalSquare: <TerminalSquare className="w-5 h-5" />,
    FileCode: <FileCode className="w-5 h-5" />,
    FileCode2: <FileCode2 className="w-5 h-5" />,
    FileSpreadsheet: <FileSpreadsheet className="w-5 h-5" />,
    GitMerge: <GitMerge className="w-5 h-5" />,
    Activity: <Activity className="w-5 h-5" />,
  };

  const categories = [
    { id: "all", label: "All Skills" },
    ...portfolioData.skillCategories.map((c) => ({ id: c.id, label: c.category })),
  ];

  const displayedSkills =
    selectedCategory === "all"
      ? portfolioData.skillCategories.flatMap((c) => c.skills)
      : portfolioData.skillCategories.find((c) => c.id === selectedCategory)?.skills || [];

  return (
    <section id="skills" className="py-16 sm:py-24 relative bg-cream-100 dark:bg-dark-950 text-dark-900 dark:text-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-azure-500/10 dark:bg-azure-500/20 border border-azure-500/30 text-azure-600 dark:text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>Technical Capabilities</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-dark-900 dark:text-white mb-3 sm:mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-azure-600 via-cyan-500 to-emerald-500 dark:from-azure-300 dark:via-cyan-300 dark:to-emerald-300">
              SRE & Cloud Skillset
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-800/90 dark:text-cream-300/90 text-xs sm:text-base px-2"
          >
            Infrastructure as Code, DevSecOps pipelines, Azure Landing Zones, and SRE observability telemetry.
          </motion.p>
        </div>

        {/* Touch Scrollable Category Tabs Bar (Zero Clipping & Hidden Scrollbar Line) */}
        <div className="w-full overflow-x-auto pb-2 mb-6 sm:mb-12 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-2.5 min-w-max px-4 sm:px-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold font-heading whitespace-nowrap transition-all duration-300 touch-manipulation active:scale-95 shrink-0 ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white shadow-azure-glow scale-102"
                    : "bg-white/90 dark:bg-dark-900/90 text-dark-800 dark:text-cream-300 hover:text-azure-600 border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-sm"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Mobile & Multi-Column Desktop Skills Grid (Matches Screenshot) */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {displayedSkills.map((skill, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
                key={skill.name}
              >
                <TiltCard className="h-full">
                  <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-dark-900/90 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl hover:border-azure-500/50 dark:hover:border-cyan-400/50 transition-all duration-300 shadow-md h-full flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
                        <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-azure-500/10 text-azure-600 dark:text-cyan-300 border border-azure-500/20 group-hover:scale-110 transition-transform shrink-0">
                          {skillIconMap[skill.iconName] || <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />}
                        </div>

                        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-mono font-bold bg-azure-500/10 dark:bg-cyan-400/10 text-azure-700 dark:text-cyan-300 border border-azure-500/20 shrink-0">
                          {skill.level}
                        </span>
                      </div>

                      <h3 className="font-heading font-extrabold text-xs sm:text-lg text-dark-900 dark:text-white mb-1 sm:mb-2 leading-tight">
                        {skill.name}
                      </h3>
                      {skill.description && (
                        <p className="text-[11px] sm:text-xs text-dark-800/80 dark:text-slate-300 font-body leading-relaxed line-clamp-2">
                          {skill.description}
                        </p>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
