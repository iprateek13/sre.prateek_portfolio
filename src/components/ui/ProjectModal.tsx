"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/types";
import { X, Github, ExternalLink, CheckCircle2, Cloud, Sparkles, Layers, Cpu, ShieldCheck } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-dark-950/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-3xl rounded-3xl bg-dark-900 border border-yellow-500/40 p-6 sm:p-8 backdrop-blur-2xl shadow-yellow-glow z-10 my-8 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-yellow-400 text-slate-950 text-xs font-bold font-mono uppercase">
                  {project.category}
                </span>
                {project.isFlagship && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    Flagship Infrastructure
                  </span>
                )}
              </div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                {project.title}
              </h3>
              <p className="text-sm font-mono text-yellow-300 mt-1">{project.subtitle}</p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-dark-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="py-6 space-y-6 max-h-[60vh] overflow-y-auto pr-2">
            <p className="text-slate-300 text-base leading-relaxed font-body">
              {project.longDescription || project.description}
            </p>

            {/* Architecture Highlights */}
            <div>
              <h4 className="font-heading font-bold text-lg text-white mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-yellow-400" />
                <span>Architecture Highlights & Specifications</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.highlights.map((h, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800 text-xs font-mono text-emerald-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h4 className="font-heading font-bold text-sm text-slate-400 mb-2 uppercase tracking-wider font-mono">
                Tech Stack & Tools Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-xl bg-dark-950 border border-slate-800 text-xs font-mono text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-950 font-heading font-bold text-sm shadow-yellow-glow hover:scale-105 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>Explore GitHub Repository</span>
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-dark-850 hover:bg-dark-800 text-white font-heading font-semibold text-sm transition-colors"
              >
                <span>Live View / Demo</span>
                <ExternalLink className="w-4 h-4 text-yellow-400" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
