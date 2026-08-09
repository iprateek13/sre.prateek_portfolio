"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/types";
import { X, Github, ExternalLink, ShieldCheck, Layers, CheckCircle2 } from "lucide-react";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto bg-dark-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto max-h-[88vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="p-5 sm:p-6 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between bg-cream-100/50 dark:bg-dark-950/50">
            <div>
              <span className="text-xs font-mono font-extrabold text-azure-600 dark:text-cyan-400 uppercase tracking-widest block">
                {project.subtitle}
              </span>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-dark-900 dark:text-white mt-1">
                {project.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-dark-800 text-dark-800 dark:text-slate-200 hover:text-azure-600 transition-colors touch-manipulation active:scale-95"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
            <div>
              <h4 className="text-xs font-mono font-bold text-azure-600 dark:text-cyan-400 uppercase tracking-wider mb-2">
                Architecture Specification
              </h4>
              <p className="text-sm sm:text-base text-dark-800 dark:text-cream-300/90 leading-relaxed font-body">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h4 className="text-xs font-mono font-bold text-azure-600 dark:text-cyan-400 uppercase tracking-wider mb-3">
                  Key Technical Highlights
                </h4>
                <div className="space-y-2">
                  {project.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-dark-800 dark:text-slate-200 font-body">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Architecture Features */}
            {project.architectureFeatures && project.architectureFeatures.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-azure-500/5 border border-azure-500/20">
                <h4 className="text-xs font-mono font-bold text-azure-600 dark:text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-azure-500" />
                  <span>Infrastructure Topology Breakdown</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.architectureFeatures.map((feat, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/80 dark:bg-dark-800/80 border border-slate-200/80 dark:border-slate-700/80 text-xs font-mono text-dark-800 dark:text-slate-300">
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-azure-500/10 text-azure-700 dark:text-cyan-300 border border-azure-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Footer Action Bar */}
          <div className="p-4 sm:p-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 bg-cream-100/50 dark:bg-dark-950/50">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white font-extrabold text-xs sm:text-sm font-heading shadow-azure-glow hover:scale-105 active:scale-98 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>View GitHub Profile</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
