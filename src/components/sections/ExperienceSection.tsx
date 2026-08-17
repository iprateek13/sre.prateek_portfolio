"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/content";
import { 
  Layers, Briefcase, GraduationCap, Calendar, MapPin, 
  CheckCircle2, Sparkles, Building2, ArrowUpRight 
} from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 sm:py-32 relative overflow-hidden bg-mesh-gradient">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-azure-500/10 border border-azure-500/30 text-azure-600 dark:text-cyan-300 text-xs font-mono mb-4 shadow-sm">
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-dark-900 dark:text-white tracking-tight mb-4">
            Work <span className="text-gradient-sre">Experience & Education</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-body">
            Engineering cloud infrastructure, building automated DevSecOps pipelines, and driving reliability.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto space-y-8 relative">
          {/* Vertical Connecting Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-azure-500 via-cyan-500 to-purple-500 -translate-x-1/2 hidden sm:block opacity-30" />

          {/* Work Experiences */}
          {portfolioData.experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-dark-900/90 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl hover:border-azure-500/40 glass-card-hover group relative"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-azure-500/10 text-azure-500 border border-azure-500/20">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-heading font-bold text-dark-900 dark:text-white">
                        {exp.role}
                      </h3>
                      {exp.isCurrent && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                          PRESENT
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-mono text-azure-500 font-semibold">{exp.company}</div>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end text-xs font-mono text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-azure-400" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Bullet points */}
              <div className="space-y-2.5 mb-6">
                {exp.description.map((item, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-azure-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-dark-850 text-slate-600 dark:text-slate-300 text-xs font-mono border border-slate-200/60 dark:border-slate-800/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-dark-900/90 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider">EDUCATION</span>
                <h3 className="text-lg font-heading font-bold text-dark-900 dark:text-white">
                  {portfolioData.education.degree}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {portfolioData.education.institution} ({portfolioData.education.period})
                </p>
              </div>
            </div>

            <span className="px-3 py-1.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
              Specialization: SRE & Cloud
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
