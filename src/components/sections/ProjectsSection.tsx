"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/content";
import { TiltCard } from "@/components/ui/TiltCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { Project } from "@/lib/types";
import {
  Github,
  Sparkles,
  Cloud,
  CheckCircle2,
  FolderGit2,
  ArrowUpRight,
  Maximize2,
} from "lucide-react";

export function ProjectsSection() {
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["All", "Cloud/DevOps", "DevSecOps", "SRE/Monitoring"];

  const filteredProjects =
    filterCategory === "All"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === filterCategory);

  const flagshipProject = portfolioData.projects.find((p) => p.isFlagship);

  return (
    <section id="projects" className="py-24 relative bg-cream-100 dark:bg-dark-950 text-dark-900 dark:text-cream-300">
      {/* Detailed Project Architecture Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-azure-500/10 dark:bg-azure-500/20 border border-azure-500/30 text-azure-600 dark:text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3 shadow-md"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>Infrastructure & DevSecOps Showcase</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-dark-900 dark:text-white mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-azure-600 via-cyan-500 to-emerald-500 dark:from-azure-300 dark:via-cyan-300 dark:to-emerald-300">
              SRE, Cloud & DevSecOps Projects
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-800/90 dark:text-cream-300/90 text-base sm:text-lg"
          >
            Production Azure Landing Zones, automated Trivy security pipelines, and Prometheus SRE monitoring frameworks.
          </motion.p>
        </div>

        {/* FLAGSHIP PROJECT HIGHLIGHT BANNER */}
        {flagshipProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <TiltCard className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white via-cream-100 to-azure-50/50 dark:from-dark-900 dark:via-dark-900 dark:to-azure-950/40 border border-azure-500/30 dark:border-azure-400/40 backdrop-blur-2xl shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Cloud className="w-64 h-64 text-azure-500 dark:text-cyan-400" />
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Details Column */}
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white dark:text-dark-950 text-xs font-black font-mono tracking-wider uppercase shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Flagship Architecture
                    </span>
                    <span className="text-xs font-mono text-azure-600 dark:text-cyan-300 font-bold">
                      DEVOPSINSIDERS_LANDING_ZONE
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-dark-900 dark:text-white mb-3 group-hover:text-azure-600 dark:group-hover:text-cyan-300 transition-colors">
                    {flagshipProject.title}
                  </h3>

                  <p className="text-dark-800 dark:text-cream-300/90 text-sm sm:text-base leading-relaxed mb-6 font-body">
                    {flagshipProject.longDescription}
                  </p>

                  {/* Architecture Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {flagshipProject.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-mono text-dark-800 dark:text-cyan-300 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {flagshipProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg bg-azure-500/10 dark:bg-azure-500/20 border border-azure-500/20 dark:border-azure-500/30 text-azure-700 dark:text-cyan-300 text-xs font-mono font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Repo Action Link */}
                  <div className="flex items-center gap-4">
                    <a
                      href={flagshipProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white dark:text-dark-950 font-heading font-bold text-sm shadow-azure-glow hover:scale-105 transition-all"
                    >
                      <Github className="w-4 h-4" />
                      <span>View GitHub Repository</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => setSelectedProject(flagshipProject)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 hover:border-azure-500 text-dark-900 dark:text-slate-200 text-xs font-mono transition-colors"
                    >
                      <Maximize2 className="w-4 h-4 text-azure-500 dark:text-cyan-400" />
                      <span>Detailed Specs</span>
                    </button>
                  </div>
                </div>

                {/* Code View Mock */}
                <div className="lg:col-span-5">
                  <div
                    onClick={() => setSelectedProject(flagshipProject)}
                    className="p-6 rounded-3xl bg-white dark:bg-dark-950 border border-slate-200 dark:border-slate-800 hover:border-azure-500/50 font-mono text-xs text-dark-900 dark:text-slate-300 shadow-xl cursor-pointer transition-colors group/code"
                  >
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500/90" />
                        <div className="w-3 h-3 rounded-full bg-amber-400/90" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
                      </div>
                      <span className="text-[11px] text-slate-500 group-hover/code:text-azure-600 dark:group-hover/code:text-cyan-300 transition-colors">
                        Click for Specs — main.tf
                      </span>
                    </div>
                    <div className="space-y-2 overflow-x-auto text-[11px] text-azure-600 dark:text-cyan-300 leading-relaxed font-bold">
                      <p><span className="text-emerald-600 dark:text-emerald-400">module</span> <span className="text-crimson-600 dark:text-cyan-300">&quot;hub_network&quot;</span> &#123;</p>
                      <p className="pl-4"><span className="text-slate-600 dark:text-slate-400">source</span> = <span className="text-azure-700 dark:text-cyan-300">&quot;./modules/vnet_hub&quot;</span></p>
                      <p className="pl-4"><span className="text-slate-600 dark:text-slate-400">resource_group_name</span> = var.rg_name</p>
                      <p className="pl-4"><span className="text-slate-600 dark:text-slate-400">address_space</span> = [<span className="text-azure-700 dark:text-cyan-300">&quot;10.0.0.0/16&quot;</span>]</p>
                      <p className="pl-4"><span className="text-slate-600 dark:text-slate-400">enable_azure_firewall</span> = <span className="text-emerald-600 dark:text-emerald-400">true</span></p>
                      <p>&#125;</p>
                      <br/>
                      <p><span className="text-emerald-600 dark:text-emerald-400">module</span> <span className="text-crimson-600 dark:text-cyan-300">&quot;spoke_workloads&quot;</span> &#123;</p>
                      <p className="pl-4"><span className="text-slate-600 dark:text-slate-400">for_each</span> = var.spoke_networks</p>
                      <p className="pl-4"><span className="text-slate-600 dark:text-slate-400">source</span> = <span className="text-azure-700 dark:text-cyan-300">&quot;./modules/vnet_spoke&quot;</span></p>
                      <p className="pl-4"><span className="text-slate-600 dark:text-slate-400">peering_hub_id</span> = module.hub_network.vnet_id</p>
                      <p>&#125;</p>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        )}

        {/* Filter Category Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                filterCategory === cat
                  ? "bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white dark:text-dark-950 font-bold shadow-md scale-105"
                  : "bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-azure-600 dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects
              .filter((p) => !p.isFlagship)
              .map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  onClick={() => setSelectedProject(project)}
                >
                  <TiltCard className="h-full p-7 rounded-3xl bg-white/95 dark:bg-dark-900 border border-slate-200 dark:border-slate-800 hover:border-azure-500/50 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer shadow-lg">
                    <div>
                      {/* Thumbnail Header with Sharp Contrast */}
                      <div className={`w-full h-36 rounded-2xl bg-gradient-to-br ${project.imagePlaceholderGradient} border border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-between mb-6 relative overflow-hidden`}>
                        <div className="flex items-center justify-between relative z-10">
                          <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-dark-950/90 text-crimson-600 dark:text-cyan-300 text-[11px] font-mono font-bold border border-slate-300 dark:border-slate-700 shadow-sm">
                            {project.category}
                          </span>
                          <Maximize2 className="w-4 h-4 text-dark-800 dark:text-white group-hover:text-azure-500 transition-colors" />
                        </div>
                        {/* High Contrast Subtitle & Title Fix */}
                        <div className="relative z-10 bg-white/80 dark:bg-dark-950/80 p-2.5 rounded-xl backdrop-blur-md border border-slate-200/60 dark:border-slate-800">
                          <span className="text-xs font-mono font-bold text-crimson-600 dark:text-cyan-300 block mb-0.5">
                            {project.subtitle}
                          </span>
                          <h4 className="font-heading font-extrabold text-base text-dark-900 dark:text-white group-hover:text-azure-600 dark:group-hover:text-cyan-300 transition-colors leading-tight">
                            {project.title}
                          </h4>
                        </div>
                      </div>

                      <p className="text-dark-800 dark:text-cream-300/90 text-sm leading-relaxed mb-4 font-body">
                        {project.description}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-1.5 mb-6 text-xs text-dark-800/80 dark:text-slate-400 font-mono">
                        {project.highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="text-azure-500 dark:text-cyan-400 font-bold">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-lg bg-cream-200/80 dark:bg-dark-950 border border-slate-300 dark:border-slate-800 text-[11px] font-mono text-dark-900 dark:text-slate-300 font-bold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-xs font-mono text-dark-900 dark:text-slate-300 hover:text-azure-600 transition-colors font-bold"
                        >
                          <Github className="w-4 h-4" />
                          <span>Repository</span>
                        </a>

                        <span className="text-xs font-mono text-azure-600 dark:text-cyan-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
                          <span>Details</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
