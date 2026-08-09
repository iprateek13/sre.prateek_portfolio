"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/content";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  Cloud,
  FileCode,
  GitMerge,
  Code,
  Globe,
  Cpu,
  Layers,
  Network,
  Boxes,
  Terminal,
  Zap,
  CheckCircle2,
  Atom,
  Server,
  Database,
  Container,
  GitBranch,
  Sparkles,
} from "lucide-react";

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const categoryIconMap: Record<string, React.ReactNode> = {
    Cloud: <Cloud className="w-5 h-5 text-azure-500 dark:text-azure-400" />,
    FileCode: <FileCode className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />,
    GitMerge: <GitMerge className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />,
    Code: <Code className="w-5 h-5 text-azure-600 dark:text-cyan-300" />,
    Globe: <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />,
  };

  const skillIconMap: Record<string, React.ReactNode> = {
    Cloud: <Cloud className="w-4 h-4 text-azure-500 dark:text-azure-400" />,
    Network: <Network className="w-4 h-4 text-azure-500 dark:text-azure-400" />,
    Layers: <Layers className="w-4 h-4 text-azure-500 dark:text-azure-400" />,
    Cpu: <Cpu className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />,
    Boxes: <Boxes className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />,
    Terminal: <Terminal className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />,
    GitBranch: <GitBranch className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />,
    Container: <Container className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />,
    Atom: <Atom className="w-4 h-4 text-azure-600 dark:text-cyan-300" />,
    Server: <Server className="w-4 h-4 text-azure-600 dark:text-cyan-300" />,
    Database: <Database className="w-4 h-4 text-azure-600 dark:text-cyan-300" />,
  };

  const categories = [
    { id: "all", label: "All Skills" },
    ...portfolioData.skillCategories.map((c) => ({ id: c.id, label: c.category })),
  ];

  const filteredCategories =
    activeTab === "all"
      ? portfolioData.skillCategories
      : portfolioData.skillCategories.filter((c) => c.id === activeTab);

  return (
    <section id="skills" className="py-24 relative bg-cream-100 dark:bg-dark-950 text-dark-900 dark:text-cream-300">
      {/* Background Azure Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-azure-glow blur-[150px] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-azure-500/10 dark:bg-azure-500/20 border border-azure-500/30 text-azure-600 dark:text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>SRE & Cloud Capabilities</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-dark-900 dark:text-white mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-azure-600 via-cyan-500 to-emerald-500 dark:from-azure-300 dark:via-cyan-300 dark:to-emerald-300">
              Cloud, SRE & DevSecOps Capabilities
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-800/90 dark:text-cream-300/90 text-base sm:text-lg"
          >
            Categorized technical skills focused on Azure infrastructure automation, Terraform IaC, DevSecOps gates, and Prometheus SRE telemetry.
          </motion.p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeTab === cat.id
                  ? "bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white dark:text-dark-950 font-bold shadow-azure-glow scale-105"
                  : "bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 text-dark-800/80 dark:text-slate-400 hover:text-azure-600 dark:hover:text-white hover:border-azure-500/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((catGroup, idx) => (
            <motion.div
              key={catGroup.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <TiltCard className="h-full p-7 rounded-3xl bg-white/90 dark:bg-dark-900 border border-slate-200 dark:border-slate-800 hover:border-azure-500/50 backdrop-blur-2xl transition-all duration-300 shadow-lg flex flex-col justify-between group">
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="p-3.5 rounded-2xl bg-cream-100 dark:bg-dark-850 border border-slate-200 dark:border-slate-700/60 group-hover:border-azure-500 transition-colors shadow-md">
                      {categoryIconMap[catGroup.iconName] || <Zap className="w-5 h-5 text-azure-500" />}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl text-dark-900 dark:text-white group-hover:text-azure-600 dark:group-hover:text-cyan-300 transition-colors">
                        {catGroup.category}
                      </h3>
                      <p className="text-xs text-dark-800/70 dark:text-slate-400">{catGroup.description}</p>
                    </div>
                  </div>

                  {/* Clean Skill Cards (No Percentages & No Progress Bars) */}
                  <div className="space-y-3.5 my-4">
                    {catGroup.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-4 rounded-2xl bg-cream-100/70 dark:bg-dark-950/80 border border-slate-200 dark:border-slate-800/80 hover:border-azure-500/40 transition-all shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-heading font-semibold text-sm text-dark-900 dark:text-slate-100 flex items-center gap-2">
                            {skillIconMap[skill.iconName] || <CheckCircle2 className="w-4 h-4 text-azure-500" />}
                            <span>{skill.name}</span>
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-azure-500/10 dark:bg-azure-500/20 text-azure-600 dark:text-cyan-300 border border-azure-500/30">
                            {skill.level}
                          </span>
                        </div>

                        {skill.description && (
                          <p className="text-xs text-dark-800/80 dark:text-slate-400 font-mono pl-6 leading-relaxed">
                            {skill.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
