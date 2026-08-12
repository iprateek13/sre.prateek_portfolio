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
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
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
            className="text-sm sm:text-lg text-dark-800/80 dark:text-cream-300/80 font-body"
          >
            Production-proven tools and frameworks for enterprise cloud infrastructure, high-availability clusters, and DevSecOps pipelines.
          </motion.p>
        </div>

        {/* Category Filter Pills Bar (No Scrollbar Line & Zero Left Pill Clipping) */}
        <div className="w-full overflow-x-auto pb-2 mb-8 sm:mb-12 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center justify-start md:justify-center gap-2.5 px-6 sm:px-8 py-2 min-w-max">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-4.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold font-heading whitespace-nowrap transition-all duration-300 touch-manipulation cursor-pointer ${
                    isActive
                      ? "text-white dark:text-dark-950 bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 shadow-azure-glow scale-105"
                      : "text-dark-800/80 dark:text-cream-300/80 bg-white/90 dark:bg-dark-900/90 border border-slate-300/80 dark:border-slate-800 hover:border-azure-500/40 hover:text-azure-600 dark:hover:text-cyan-300 shadow-sm"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Skill Cards Grid */}
        <motion.div layout className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {displayedSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <TiltCard className="h-full">
                  <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl glass-card flex flex-col justify-between h-full group hover:border-azure-500/50 transition-all duration-300">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 sm:p-3 rounded-xl bg-azure-500/10 dark:bg-cyan-400/10 text-azure-600 dark:text-cyan-300 group-hover:scale-110 transition-transform duration-300">
                          {skillIconMap[skill.iconName] || <Cloud className="w-5 h-5" />}
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20">
                          {skill.level}
                        </span>
                      </div>
                      <h3 className="font-heading font-extrabold text-sm sm:text-base text-dark-900 dark:text-white mb-1 group-hover:text-azure-600 dark:group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h3>
                      {skill.description && (
                        <p className="text-[11px] sm:text-xs text-dark-800/70 dark:text-slate-400 line-clamp-2 leading-relaxed">
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
