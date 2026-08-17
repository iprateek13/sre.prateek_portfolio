"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/content";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { TerraformModuleExplorerModal } from "@/components/ui/TerraformModuleExplorerModal";
import { 
  Folder, ExternalLink, Github, ArrowRight, Sparkles, ShieldCheck, 
  Layers, Terminal, CheckCircle2, Boxes, Code, Cpu 
} from "lucide-react";

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);

  const categories = ["All", "Cloud/DevOps", "DevSecOps", "SRE/Monitoring"];

  const filteredProjects = selectedCategory === "All"
    ? portfolioData.projects
    : portfolioData.projects.filter((p) => p.category === selectedCategory);

  const flagshipProject = portfolioData.projects.find((p) => p.isFlagship) || portfolioData.projects[0];

  return (
    <>
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <TerraformModuleExplorerModal
        isOpen={isExplorerOpen}
        onClose={() => setIsExplorerOpen(false)}
      />

      <section id="projects" className="py-20 sm:py-32 relative overflow-hidden bg-mesh-gradient">
        {/* Ambient Halo */}
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-azure-500/10 border border-azure-500/30 text-azure-600 dark:text-cyan-300 text-xs font-mono mb-4 shadow-sm">
              <Folder className="w-4 h-4 text-cyan-400" />
              <span>Multi-Cloud Portfolio Implementations</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-dark-900 dark:text-white tracking-tight mb-4">
              Featured <span className="text-gradient-sre">SRE & IaC Projects</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-body">
              Enterprise Azure Landing Zones, automated DevSecOps pipelines, and Prometheus observability stacks.
            </p>
          </div>

          {/* FLAGSHIP PROJECT SPOTLIGHT SHOWCASE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 rounded-3xl bg-dark-900 border border-azure-500/40 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden group"
          >
            {/* Glowing Backdrop Mesh */}
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-azure-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Flagship Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-azure-500 to-cyan-500 text-white text-xs font-mono font-bold shadow-azure-glow flex items-center gap-1.5 shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>FLAGSHIP ARCHITECTURE</span>
                  </span>
                  <span className="text-xs font-mono text-cyan-400 font-semibold truncate max-w-full">
                    {flagshipProject.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-heading font-extrabold text-white">
                  {flagshipProject.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {flagshipProject.longDescription}
                </p>

                {/* Highlights List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {flagshipProject.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {flagshipProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-xl bg-azure-500/10 border border-azure-500/30 text-azure-300 text-xs font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => setIsExplorerOpen(true)}
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white font-heading font-extrabold text-xs sm:text-sm shadow-azure-glow hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Boxes className="w-4 h-4" />
                    <span>Explore 15+ Child Modules</span>
                  </button>

                  <a
                    href={flagshipProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 rounded-2xl bg-dark-800 border border-slate-700 hover:border-azure-400 text-white text-xs font-semibold flex items-center gap-2 transition-all hover:scale-105"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Repo</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Code & Specs Preview Box */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-dark-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block shadow-sm"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block shadow-sm"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block shadow-sm"></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Terminal className="w-3.5 h-3.5 text-azure-400" />
                      <span>azure_landing_zone.tf</span>
                    </div>
                  </div>
                  <span className="text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold">✓ Validated</span>
                </div>

                <pre className="text-xs font-mono text-cyan-300 overflow-x-auto p-3 rounded-xl bg-dark-900 border border-slate-800/80 leading-relaxed">
                  <code>{`module "landing_zone" {
  source           = "./modules/azure_hub_spoke"
  resource_group   = "rg-devopsinsiders-hub"
  vnet_hub_cidr    = ["10.0.0.0/16"]
  firewall_sku     = "Standard"
  enable_bastion   = true
  
  spoke_vnets = {
    aks_cluster    = { cidr = ["10.1.0.0/16"] }
    database_tier  = { cidr = ["10.2.0.0/16"] }
  }
}`}</code>
                </pre>

                <div className="p-3 rounded-xl bg-azure-500/10 border border-azure-500/30 text-xs font-mono text-azure-300 flex items-center justify-between">
                  <span>CAF-Aligned Architecture</span>
                  <span className="text-emerald-400 font-bold">100% Policy Pass</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Category Filter Tabs matching top main Navbar design & flush card alignment */}
          <div className="w-full max-w-full overflow-x-auto no-scrollbar py-2 mb-8 sm:mb-10 flex justify-start sm:justify-center">
            <div className="glass-navbar-tuf shadow-2xl p-1.5 rounded-2xl sm:rounded-3xl flex items-center shrink-0">
              <div className="flex items-center gap-1 bg-slate-100/60 dark:bg-dark-950/60 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory(cat);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-heading font-semibold transition-all duration-300 whitespace-nowrap shrink-0 ${
                      selectedCategory === cat
                        ? "text-azure-600 dark:text-cyan-300 bg-white dark:bg-dark-850 shadow-md font-bold"
                        : "text-slate-600 dark:text-slate-400 hover:text-dark-900 dark:hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid of Other Projects with stable min-height & AnimatePresence */}
          <div className="min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="p-6 rounded-3xl bg-white/90 dark:bg-dark-900/90 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl hover:border-azure-500/50 glass-card-hover cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono px-2.5 py-1 rounded-xl bg-azure-500/10 text-azure-600 dark:text-cyan-300 font-semibold">
                          {project.category}
                        </span>
                        <Github className="w-4 h-4 text-slate-400 group-hover:text-azure-500 transition-colors" />
                      </div>

                      <h4 className="text-lg font-heading font-bold text-dark-900 dark:text-white group-hover:text-azure-500 transition-colors mb-2">
                        {project.title}
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-dark-850 text-slate-500 dark:text-slate-400">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-heading font-bold text-azure-500 group-hover:translate-x-1 transition-transform">
                        <span>View Specifications</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
