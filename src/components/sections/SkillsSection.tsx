"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/content";
import { 
  Cloud, Cpu, Layers, ShieldCheck, Activity, Code, Search, 
  Sparkles, CheckCircle2, Terminal, BarChart3, Boxes, Award 
} from "lucide-react";

export function SkillsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryIcons: Record<string, React.ReactNode> = {
    "Multi-Cloud (Azure & AWS)": <Cloud className="w-5 h-5 text-azure-500" />,
    "Infrastructure as Code (IaC)": <Cpu className="w-5 h-5 text-cyan-500" />,
    "DevSecOps & Shift-Left Security": <ShieldCheck className="w-5 h-5 text-emerald-500" />,
    "SRE & Telemetry Observability": <Activity className="w-5 h-5 text-purple-500" />,
    "Scripting & Cloud Automation": <Terminal className="w-5 h-5 text-amber-500" />,
  };

  const categories = ["All", ...portfolioData.skillCategories.map((c) => c.category)];

  const filteredCategories = portfolioData.skillCategories
    .filter((c) => selectedCategory === "All" || c.category === selectedCategory)
    .map((c) => {
      const matchingSkills = c.skills.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (s.description?.toLowerCase() || "").includes(searchQuery.toLowerCase())
      );
      return { ...c, skills: matchingSkills };
    })
    .filter((c) => c.skills.length > 0);

  return (
    <section id="skills" className="py-20 sm:py-32 relative overflow-hidden bg-mesh-gradient">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-azure-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-azure-500/10 border border-azure-500/30 text-azure-600 dark:text-cyan-300 text-xs font-mono mb-4 shadow-sm">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Multi-Cloud Technical Stack</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-dark-900 dark:text-white tracking-tight mb-4">
            Production-Tested <span className="text-gradient-sre">SRE & Cloud Skills</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-body">
            Architecting high-availability infrastructure across Azure & AWS, enforcing IaC governance, and building shift-left DevSecOps pipelines.
          </p>
        </div>

        {/* Search & Category Filter Bar matching top main Navbar design */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 p-3 sm:p-3.5 rounded-2xl sm:rounded-3xl glass-navbar-tuf shadow-2xl">
          {/* Category Pills matching Navbar Button Group */}
          <div className="flex items-center gap-1 bg-slate-100/60 dark:bg-dark-950/60 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md overflow-x-auto no-scrollbar w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-heading font-semibold transition-all duration-300 whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? "text-azure-600 dark:text-cyan-300 bg-white dark:bg-dark-850 shadow-md font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-dark-900 dark:hover:text-white"
                }`}
              >
                {cat === "All" ? "All Stack" : cat.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Interactive Search Box matching Navbar Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-azure-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search e.g. Azure, Terraform..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/80 dark:bg-dark-950/80 border border-slate-200/80 dark:border-slate-800/80 text-xs text-dark-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-azure-500 shadow-sm"
            />
          </div>
        </div>

        {/* Grid of Skill Categories */}
        <div className="space-y-8">
          {filteredCategories.map((catGroup) => (
            <motion.div
              key={catGroup.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-dark-900/90 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl"
            >
              {/* Category Title */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="p-2.5 rounded-2xl bg-azure-500/10 border border-azure-500/30">
                  {categoryIcons[catGroup.category] || <Cpu className="w-5 h-5 text-azure-500" />}
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-dark-900 dark:text-white">
                    {catGroup.category}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {catGroup.description}
                  </p>
                </div>
              </div>

              {/* Skill Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {catGroup.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all duration-300 relative group hover:-translate-y-1 ${
                      skill.isKey
                        ? "bg-slate-50/90 dark:bg-dark-850/90 border-azure-500/30 dark:border-azure-500/30 hover:border-azure-500 shadow-md"
                        : "bg-white dark:bg-dark-950/80 border-slate-200/60 dark:border-slate-800/80 hover:border-cyan-500/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-heading font-bold text-sm text-dark-900 dark:text-white flex items-center gap-1.5">
                        {skill.name}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                          skill.level === "Advanced"
                            ? "bg-azure-500/15 text-azure-600 dark:text-cyan-300 border border-azure-500/30"
                            : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30"
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {skill.description}
                    </p>

                    {skill.isKey && (
                      <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-azure-500">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>Core Competency</span>
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
