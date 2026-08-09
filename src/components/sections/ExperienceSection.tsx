"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/content";
import { Briefcase, Calendar, MapPin, CheckCircle2, Building2, ShieldCheck, Activity } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative bg-cream-100 dark:bg-dark-950 text-dark-800 dark:text-cream-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-azure-500/10 dark:bg-azure-500/20 border border-azure-500/30 text-azure-600 dark:text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3 shadow-md"
          >
            <Briefcase className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>SRE & DevOps Career Journey</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-dark-900 dark:text-white mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-azure-600 via-cyan-500 to-emerald-500 dark:from-azure-300 dark:via-cyan-300 dark:to-emerald-300">
              Professional Internships & SRE Impact
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-800/90 dark:text-cream-300/90 text-base sm:text-lg"
          >
            Hands-on experience in cloud infrastructure automation, DevSecOps pipelines, and site reliability engineering.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-azure-500/30 dark:border-cyan-400/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {portfolioData.experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="relative group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-cream-100 dark:bg-dark-950 border-2 border-azure-500 dark:border-cyan-400 flex items-center justify-center shadow-md group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-azure-500 dark:bg-cyan-400 animate-pulse" />
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-dark-900 border border-slate-200 dark:border-slate-800 backdrop-blur-2xl shadow-xl hover:border-azure-500/50 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading font-bold text-xl sm:text-2xl text-dark-900 dark:text-white group-hover:text-azure-600 dark:group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h3>
                      {exp.isCurrent && (
                        <span className="px-3 py-0.5 rounded-full bg-azure-500/10 text-azure-600 dark:text-cyan-300 border border-azure-500/30 text-[11px] font-mono font-bold">
                          Present Role
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-azure-600 dark:text-cyan-300 font-mono font-bold">
                      <Building2 className="w-4 h-4" />
                      <span>{exp.company}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500 text-xs font-normal">{exp.type}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5 font-bold text-azure-600 dark:text-cyan-300">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Achievements List */}
                <div className="space-y-2.5 my-6">
                  {exp.description.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-dark-800 dark:text-cream-300/90 font-body leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-xl bg-cream-200/80 dark:bg-dark-950 border border-slate-300 dark:border-slate-800 text-xs font-mono text-azure-700 dark:text-cyan-300 font-bold"
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
