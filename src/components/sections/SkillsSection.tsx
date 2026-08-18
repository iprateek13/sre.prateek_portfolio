"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/content";
import { 
  Cloud, Cpu, Layers, ShieldCheck, Activity, Code, Search, 
  Sparkles, CheckCircle2, Terminal, BarChart3, Boxes, Award, X 
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
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory(cat);
                }}
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

          {/* Interactive Search Box with Clear (X) Icon Button */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-azure-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search e.g. Azure, Terraform..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-white/80 dark:bg-dark-950/80 border border-slate-200/80 dark:border-slate-800/80 text-xs text-dark-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-azure-500 shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Grid of Skill Categories with stable min-height & AnimatePresence for zero scroll jump */}
        <div className="space-y-8 min-h-[550px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + (searchQuery || "")}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-8"
            >
              {filteredCategories.map((catGroup) => (
                <div
                  key={catGroup.id}
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

              {/* Skill Cards Grid with Brand Palette Accent Colors */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {catGroup.skills.map((skill, idx) => {
                  const lowerName = skill.name.toLowerCase();
                  let brandBadgeStyle = "bg-azure-500/15 text-azure-600 dark:text-cyan-300 border-azure-500/30";
                  let borderHoverStyle = "hover:border-azure-500 hover:shadow-[0_0_15px_rgba(2,132,199,0.2)]";
                  let brandIcon = "✨";
                  let brandDotColor = "bg-azure-500";

                  if (lowerName.includes("azure")) {
                    brandBadgeStyle = "bg-[#0284C7]/15 text-[#0284C7] dark:text-[#38BDF8] border-[#0284C7]/40";
                    borderHoverStyle = "hover:border-[#0284C7] hover:shadow-[0_0_18px_rgba(2,132,199,0.3)]";
                    brandIcon = "🔷";
                    brandDotColor = "bg-[#0284C7]";
                  } else if (lowerName.includes("aws")) {
                    brandBadgeStyle = "bg-[#F59E0B]/15 text-[#D97706] dark:text-[#FBBF24] border-[#F59E0B]/40";
                    borderHoverStyle = "hover:border-[#F59E0B] hover:shadow-[0_0_18px_rgba(245,158,11,0.3)]";
                    brandIcon = "🟧";
                    brandDotColor = "bg-[#F59E0B]";
                  } else if (lowerName.includes("terraform") || lowerName.includes("iac")) {
                    brandBadgeStyle = "bg-[#845EF7]/15 text-[#7950F2] dark:text-[#A580FF] border-[#845EF7]/40";
                    borderHoverStyle = "hover:border-[#845EF7] hover:shadow-[0_0_18px_rgba(132,94,247,0.3)]";
                    brandIcon = "💜";
                    brandDotColor = "bg-[#845EF7]";
                  } else if (lowerName.includes("kubernetes") || lowerName.includes("k8s") || lowerName.includes("aks")) {
                    brandBadgeStyle = "bg-[#326CE5]/15 text-[#2563EB] dark:text-[#60A5FA] border-[#326CE5]/40";
                    borderHoverStyle = "hover:border-[#326CE5] hover:shadow-[0_0_18px_rgba(50,108,229,0.3)]";
                    brandIcon = "☸️";
                    brandDotColor = "bg-[#326CE5]";
                  } else if (lowerName.includes("prometheus") || lowerName.includes("telemetry") || lowerName.includes("grafana") || lowerName.includes("sre")) {
                    brandBadgeStyle = "bg-[#E6522C]/15 text-[#EA580C] dark:text-[#FB923C] border-[#E6522C]/40";
                    borderHoverStyle = "hover:border-[#E6522C] hover:shadow-[0_0_18px_rgba(230,82,44,0.3)]";
                    brandIcon = "🟧";
                    brandDotColor = "bg-[#E6522C]";
                  }

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border transition-all duration-300 relative group flex flex-col justify-between bg-slate-50/90 dark:bg-dark-850/90 border-slate-200/80 dark:border-slate-800 ${borderHoverStyle} glass-card-hover shadow-md`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-heading font-bold text-sm text-dark-900 dark:text-white flex items-center gap-1.5">
                            <span>{brandIcon}</span>
                            <span>{skill.name}</span>
                          </span>
                          <span
                            className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full shrink-0 ${brandBadgeStyle}`}
                          >
                            {skill.level}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                          {skill.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono">
                        <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-semibold">
                          <span className={`w-2 h-2 rounded-full ${brandDotColor} inline-block animate-pulse`}></span>
                          <span>Core Competency</span>
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
