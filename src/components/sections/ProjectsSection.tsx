"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/content";
import { Project } from "@/lib/types";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { Github, ExternalLink, ShieldCheck, Cpu, Activity, Sparkles, Layers, ArrowUpRight } from "lucide-react";

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    { id: "all", label: "All Architecture Projects" },
    { id: "Cloud/DevOps", label: "Cloud & DevOps" },
    { id: "DevSecOps", label: "DevSecOps & Security" },
    { id: "SRE/Monitoring", label: "SRE & Telemetry" },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === selectedCategory);

  const flagshipProject = portfolioData.projects.find((p) => p.isFlagship) || portfolioData.projects[0];
  const otherProjects = filteredProjects.filter((p) => p.id !== flagshipProject.id);

  return (
    <section id="projects" className="py-16 sm:py-24 relative bg-cream-100 dark:bg-dark-950 text-dark-900 dark:text-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-azure-500/10 dark:bg-azure-500/20 border border-azure-500/30 text-azure-600 dark:text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>Featured Case Studies</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-dark-900 dark:text-white mb-3 sm:mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-azure-600 via-cyan-500 to-emerald-500 dark:from-azure-300 dark:via-cyan-300 dark:to-emerald-300">
              Cloud Infrastructure & DevSecOps
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-800/90 dark:text-cream-300/90 text-sm sm:text-base px-2"
          >
            Production Azure Landing Zones, Terraform modular architectures, Trivy security pipelines, and SRE telemetry.
          </motion.p>
        </div>

        {/* Touch Scrollable Category Tabs Wrapper (Prevents 1st button clipping) */}
        <div className="w-full overflow-x-auto no-scrollbar pb-4 mb-8 sm:mb-12">
          <div className="flex items-center justify-start sm:justify-center gap-2.5 min-w-max px-2 sm:px-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 touch-manipulation active:scale-95 shrink-0 ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white shadow-azure-glow font-bold scale-102"
                    : "bg-white/90 dark:bg-dark-900/90 text-dark-800 dark:text-cream-300 hover:text-azure-600 border border-slate-200 dark:border-slate-800 backdrop-blur-md"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Flagship Featured Project Card */}
        {(selectedCategory === "all" || selectedCategory === "Cloud/DevOps") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12"
          >
            <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white/95 dark:bg-dark-900/95 border-2 border-azure-500/40 dark:border-cyan-400/40 backdrop-blur-2xl shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 px-6 py-2 bg-gradient-to-l from-azure-500 via-cyan-500 to-emerald-500 text-white text-xs font-mono font-extrabold rounded-bl-2xl shadow-md uppercase tracking-wider">
                Flagship Case Study
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                <div className="lg:col-span-7">
                  <span className="text-xs font-mono font-extrabold text-azure-600 dark:text-cyan-400 uppercase tracking-widest block mb-2">
                    {flagshipProject.subtitle}
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-dark-900 dark:text-white mb-4 leading-tight">
                    {flagshipProject.title}
                  </h3>
                  <p className="text-dark-800 dark:text-cream-300/90 text-sm sm:text-base font-body leading-relaxed mb-6">
                    {flagshipProject.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {flagshipProject.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-body text-dark-800 dark:text-slate-200">
                        <Layers className="w-4 h-4 text-azure-500 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {flagshipProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-xl bg-azure-500/10 dark:bg-cyan-400/10 border border-azure-500/20 text-azure-700 dark:text-cyan-300 text-xs font-mono font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setActiveModalProject(flagshipProject)}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white font-extrabold text-xs sm:text-sm font-heading shadow-azure-glow hover:scale-102 active:scale-98 transition-all flex items-center gap-2"
                    >
                      <span>View Architecture Spec</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <a
                      href={flagshipProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-dark-800 text-dark-900 dark:text-white text-xs sm:text-sm font-bold border border-slate-200 dark:border-slate-700 hover:border-azure-500 transition-colors flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-3 p-6 rounded-2xl bg-slate-50 dark:bg-dark-800/80 border border-slate-200 dark:border-slate-700/80 font-mono text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-azure-600 dark:text-cyan-400 font-bold">IaC Framework</span>
                    <span className="text-dark-900 dark:text-white font-bold">Terraform v1.9</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-azure-600 dark:text-cyan-400 font-bold">Cloud Provider</span>
                    <span className="text-dark-900 dark:text-white font-bold">Microsoft Azure</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-azure-600 dark:text-cyan-400 font-bold">Topology</span>
                    <span className="text-dark-900 dark:text-white font-bold">Hub-and-Spoke</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-azure-600 dark:text-cyan-400 font-bold">Security Gate</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>tfsec Passed</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {otherProjects.map((project, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={project.id}
            >
              <div className="p-6 sm:p-7 rounded-3xl bg-white/90 dark:bg-dark-900/90 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl hover:border-azure-500/50 dark:hover:border-cyan-400/50 transition-all duration-300 shadow-lg flex flex-col justify-between h-full group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-extrabold bg-azure-500/10 dark:bg-cyan-400/10 text-azure-700 dark:text-cyan-300 border border-azure-500/20 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-100 dark:bg-dark-800 text-dark-800 dark:text-slate-300 hover:text-azure-600 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>

                  <h3 className="font-heading font-extrabold text-xl text-dark-900 dark:text-white mb-2 leading-tight group-hover:text-azure-600 dark:group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-dark-800/80 dark:text-slate-300 font-body leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((t) => (
                      <span key={t} className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-dark-800 text-[10px] font-mono text-slate-600 dark:text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="w-full py-2.5 rounded-xl bg-azure-500/10 dark:bg-azure-500/20 text-azure-600 dark:text-cyan-300 font-bold text-xs font-mono hover:bg-azure-500 hover:text-white transition-all flex items-center justify-center gap-1.5 border border-azure-500/30"
                  >
                    <span>Architecture Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Architecture Modal */}
      {activeModalProject && (
        <ProjectModal project={activeModalProject} onClose={() => setActiveModalProject(null)} />
      )}
    </section>
  );
}
