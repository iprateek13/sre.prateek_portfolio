"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/content";
import { Briefcase, Calendar, MapPin, CheckCircle2, Sparkles, Building2 } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 sm:py-24 relative bg-cream-100 dark:bg-dark-950 text-dark-900 dark:text-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-azure-500/10 dark:bg-azure-500/20 border border-azure-500/30 text-azure-600 dark:text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>Career History</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-dark-900 dark:text-white mb-3 sm:mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-azure-600 via-cyan-500 to-emerald-500 dark:from-azure-300 dark:via-cyan-300 dark:to-emerald-300">
              Internship Timeline
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-800/90 dark:text-cream-300/90 text-sm sm:text-base px-2"
          >
            Hands-on SRE, DevOps & Infrastructure engineering experience.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Bar */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-azure-500 via-cyan-500 to-emerald-500 -translate-x-1/2 opacity-40" />

          <div className="space-y-8 sm:space-y-12">
            {portfolioData.experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-6 z-10 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-dark-900 border-2 border-azure-500 dark:border-cyan-400 flex items-center justify-center shadow-azure-glow">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                  </div>

                  {/* Content Card Container */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8">
                    <div className="p-6 sm:p-7 rounded-3xl bg-white/90 dark:bg-dark-900/90 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl hover:border-azure-500/40 dark:hover:border-cyan-400/40 transition-all duration-300 shadow-lg group">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-azure-500/10 text-azure-600 dark:text-cyan-300 border border-azure-500/20">
                          {exp.period}
                        </span>
                        {exp.isCurrent && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 uppercase">
                            Present Role
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-dark-900 dark:text-white mb-1 group-hover:text-azure-600 dark:group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h3>

                      <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-azure-600 dark:text-cyan-400 mb-4">
                        <Building2 className="w-4 h-4 shrink-0" />
                        <span>{exp.company}</span>
                        <span className="text-slate-400">•</span>
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                        <span className="text-slate-500 dark:text-slate-400">{exp.location}</span>
                      </div>

                      {/* Description Bullet Points */}
                      <div className="space-y-2 mb-5">
                        {exp.description.map((bullet, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-dark-800/90 dark:text-slate-300 font-body leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>

                      {/* Technologies Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-semibold bg-slate-100 dark:bg-dark-800 text-dark-800 dark:text-cream-300 border border-slate-200 dark:border-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
