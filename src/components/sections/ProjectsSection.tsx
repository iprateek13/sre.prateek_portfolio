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

        {/* Touch Scrollable Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 sm:mb-12 px-1 -mx-4 sm:mx-0 px-4 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 touch-manipulation active:scale-95 shrink-0 ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white shadow-azure-glow font-bold"
                  : "bg-white/90 dark:bg-dark-900/90 text-dark-800 dark:text-cream-300 hover:text-azure-600 border border-slate-200 dark:border-slate-800 backdrop-blur-md"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Flagship Featured Project Card (Show when 'all' or 'Cloud/DevOps' selected) */}
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
                  <p className="text-dark-800/90 dark:text-cream-300/90 text-sm sm:text-base leading-relaxed mb-6 font-body">
                    {flagshipProject.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                    {flagshipProject.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-dark-800/90 dark:text-slate-200 font-body">
                        <span className="w-1.5 h-1.5 rounded-full bg-azure-500 dark:bg-cyan-400 mt-2 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {flagshipProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-azure-500/10 text-azure-700 dark:text-cyan-300 border border-azure-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <a
                      href={flagshipProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white font-extrabold text-sm font-heading shadow-azure-glow hover:scale-105 active:scale-98 transition-all"
                    >
                      <Github className="w-4 h-4" />
                      <span>View GitHub Profile</span>
                    </a>
                    <button
                      onClick={() => setActiveModalProject(flagshipProject)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-dark-800 text-dark-900 dark:text-cream-200 border border-slate-300 dark:border-slate-700 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-dark-700 transition-all touch-manipulation"
                    >
                      <span>Architecture Details</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Architecture Features Card */}
                <div className="lg:col-span-5">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-azure-500/10 via-cyan-500/5 to-emerald-500/10 border border-azure-500/30 dark:border-cyan-400/30">
                    <h4 className="font-heading font-bold text-base text-dark-900 dark:text-white mb-4 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-azure-500 dark:text-cyan-400" />
                      <span>Topology Highlights</span>
                    </h4>
                    <div className="space-y-3">
                      {flagshipProject.architectureFeatures?.map((feat, i) => (
                        <div key={i} className="p-3 rounded-xl bg-white/80 dark:bg-dark-900/80 border border-slate-200/80 dark:border-slate-800/80 text-xs font-mono text-dark-800 dark:text-slate-300 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              key={project.id}
            >
              <div className="p-6 sm:p-7 rounded-3xl bg-white/90 dark:bg-dark-900/90 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl hover:border-azure-500/50 dark:hover:border-cyan-400/50 transition-all duration-300 shadow-md h-full flex flex-col justify-between group">
                <div>
                  <span className="text-[11px] font-mono font-extrabold text-azure-600 dark:text-cyan-300 uppercase tracking-widest block mb-2">
                    {project.subtitle}
                  </span>

                  <h3 className="font-heading font-bold text-xl text-dark-900 dark:text-white mb-3 group-hover:text-azure-600 dark:group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-dark-800/80 dark:text-slate-300/90 leading-relaxed font-body mb-5">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-azure-500/10 text-azure-700 dark:text-cyan-300 border border-azure-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-azure-600 dark:text-cyan-300 hover:underline"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Profile</span>
                  </a>
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-dark-800 text-dark-800 dark:text-cream-300 hover:text-azure-600 transition-colors touch-manipulation"
                    aria-label="View Details"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <ProjectModal project={activeModalProject} onClose={() => setActiveModalProject(null)} />
      )}
    </section>
  );
}
