"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/content";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { TerraformModuleExplorerModal } from "@/components/ui/TerraformModuleExplorerModal";
import { 
  Folder, Github, ExternalLink, Sparkles, Layers, 
  Boxes, Server, ShieldCheck, ArrowUpRight, Terminal, Cpu
} from "lucide-react";

export function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeProject, setActiveProject] = useState<any>(null);
  const [isModuleExplorerOpen, setIsModuleExplorerOpen] = useState(false);

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "IaC & Terraform", label: "IaC & Terraform" },
    { id: "Kubernetes & Containers", label: "Kubernetes" },
    { id: "CI/CD & DevOps", label: "CI/CD & DevOps" },
  ];

  const projects = portfolioData.projects;

  const filteredProjects = selectedFilter === "all"
    ? projects
    : projects.filter((p) => p.category === selectedFilter);

  return (
    <>
      {/* Modals */}
      <ProjectModal
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
        project={activeProject}
      />

      <TerraformModuleExplorerModal
        isOpen={isModuleExplorerOpen}
        onClose={() => setIsModuleExplorerOpen(false)}
      />

      <section id="projects" className="py-24 relative overflow-hidden bg-dot-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono"
            >
              <Folder className="w-3.5 h-3.5 text-cyan-400" />
              <span>PRODUCTION SHOWCASE</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
            >
              Architected <span className="text-gradient-sre">Cloud Projects</span>
            </motion.h2>
          </div>

          {/* Filters & Terraform Explorer Trigger */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                    selectedFilter === filter.id
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                      : "bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsModuleExplorerOpen(true)}
              className="px-4 py-2 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-300 font-mono text-xs hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all flex items-center gap-2"
            >
              <Boxes className="w-4 h-4 text-cyan-400" />
              <span>Launch Terraform Explorer</span>
            </button>
          </div>

          {/* Projects Cards Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel glass-panel-hover rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-all"
                            title="GitHub Source"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-all"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-heading font-bold text-xl text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                      </h3>
                      <p className="text-xs font-mono text-slate-400 mt-1">{project.subtitle}</p>
                    </div>

                    <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveProject(project)}
                    className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center justify-center gap-2 transition-all"
                  >
                    <span>View Architecture Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
