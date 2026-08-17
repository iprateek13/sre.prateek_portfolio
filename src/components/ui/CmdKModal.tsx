"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Folder, Cpu, FileText, Mail, ArrowRight, Sparkles, Layers, ShieldCheck } from "lucide-react";
import { portfolioData } from "@/data/content";
import { trackResumeDownload } from "@/lib/telemetry";

interface CmdKModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CmdKModal({ isOpen, onClose }: CmdKModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredProjects = portfolioData.projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredSkills = portfolioData.skillCategories.flatMap((c) =>
    c.skills
      .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
      .map((s) => ({ ...s, category: c.category }))
  );

  const handleAction = (anchorId: string) => {
    onClose();
    setTimeout(() => {
      document.getElementById(anchorId)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-md cursor-pointer"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -16 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white/95 dark:bg-dark-900/95 border border-azure-500/30 shadow-2xl backdrop-blur-2xl cursor-default"
          >
          {/* Header Input */}
          <div className="relative flex items-center px-5 py-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5 mr-3 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block shadow-sm"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block shadow-sm"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block shadow-sm"></span>
            </div>
            <Search className="w-4 h-4 text-azure-500 mr-2.5 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, skills, IaC modules, resume... (Cmd+K)"
              className="w-full bg-transparent text-sm sm:text-base font-body text-dark-900 dark:text-white placeholder-slate-400 focus:outline-none"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Filter Suggestions */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
            {/* Quick Actions */}
            <div>
              <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
                Quick Navigation
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => handleAction("projects")}
                  className="flex items-center justify-between p-3 rounded-2xl bg-azure-500/5 hover:bg-azure-500/10 border border-azure-500/20 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Folder className="w-4 h-4 text-azure-500" />
                    <span className="text-sm font-semibold text-dark-900 dark:text-cream-100">Featured Projects</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-azure-500" />
                </button>

                <button
                  onClick={() => handleAction("skills")}
                  className="flex items-center justify-between p-3 rounded-2xl bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/20 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Cpu className="w-4 h-4 text-cyan-500" />
                    <span className="text-sm font-semibold text-dark-900 dark:text-cream-100">Multi-Cloud Skills</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-cyan-500" />
                </button>

                <button
                  onClick={() => handleAction("experience")}
                  className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Layers className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-semibold text-dark-900 dark:text-cream-100">Work Experience</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-500" />
                </button>

                <a
                  href="/sre.prateek_resume.pdf"
                  download="sre.prateek_resume.pdf"
                  onClick={() => {
                    trackResumeDownload();
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-2xl bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/20 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-semibold text-dark-900 dark:text-cream-100">Download Resume PDF</span>
                  </div>
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </a>
              </div>
            </div>

            {/* Filtered Projects */}
            {filteredProjects.length > 0 && (
              <div>
                <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
                  Matching Projects ({filteredProjects.length})
                </div>
                <div className="space-y-1.5">
                  {filteredProjects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleAction("projects")}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-dark-800 transition-colors text-left"
                    >
                      <div>
                        <div className="text-sm font-semibold text-dark-900 dark:text-white">{p.title}</div>
                        <div className="text-xs text-slate-400 truncate max-w-md">{p.description}</div>
                      </div>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-azure-500/10 text-azure-400 shrink-0">
                        {p.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Filtered Skills */}
            {filteredSkills.length > 0 && (
              <div>
                <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
                  Matching Skills ({filteredSkills.length})
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {filteredSkills.slice(0, 6).map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAction("skills")}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-azure-500/50 bg-slate-50 dark:bg-dark-850 text-left transition-all"
                    >
                      <div className="text-xs font-semibold text-dark-900 dark:text-cream-100">{s.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{s.level}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-dark-950/50 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">ESC</kbd> to close</span>
            <span className="text-azure-400">SRE Multi-Cloud Portfolio</span>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
  );
}
