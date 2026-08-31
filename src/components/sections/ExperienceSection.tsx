"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/content";
import { Layers, Briefcase, Calendar, MapPin, CheckCircle2, Zap, Sparkles } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>CAREER MILESTONES</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
          >
            Work <span className="text-gradient-sre">Experience & Impact</span>
          </motion.h2>
        </div>

        {/* Vertical Timeline Container */}
        <div className="max-w-4xl mx-auto relative pl-6 sm:pl-8 border-l border-slate-800 space-y-12">
          {portfolioData.experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Timeline Marker Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:scale-125 group-hover:border-emerald-400 transition-all shadow-[0_0_15px_rgba(34,211,238,0.5)]" />

              {/* Experience Card */}
              <div className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{exp.company}</span>
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mt-1">{exp.role}</h3>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {exp.location}
                    </span>
                  </div>
                </div>

                {/* Achievements List */}
                <div className="space-y-2.5 pt-2">
                  {Array.isArray(exp.description) ? (
                    exp.description.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-300 text-sm leading-relaxed">{exp.description}</p>
                  )}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
