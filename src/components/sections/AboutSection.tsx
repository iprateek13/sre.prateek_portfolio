"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/content";
import { Counter } from "@/components/ui/Counter";
import { TiltCard } from "@/components/ui/TiltCard";
import { GraduationCap, Award, Cloud, Terminal, CheckCircle2, Sparkles } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 relative bg-cream-100 dark:bg-dark-950 text-dark-900 dark:text-cream-300">
      {/* Background Azure & Emerald Accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-azure-500/10 dark:bg-azure-500/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-azure-500/10 dark:bg-azure-500/20 border border-azure-500/30 text-azure-600 dark:text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>Engineering Background</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-dark-900 dark:text-white mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-azure-600 via-cyan-500 to-emerald-500 dark:from-azure-300 dark:via-cyan-300 dark:to-emerald-300">
              Architecting Scalable SRE Infrastructure
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-800/90 dark:text-cream-300/90 text-base sm:text-lg"
          >
            Bridging multi-cloud automation, DevSecOps security guardrails, and site reliability engineering.
          </motion.p>
        </div>

        {/* Bio & Education Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Main Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-white/90 dark:bg-dark-900/90 border border-azure-500/25 dark:border-azure-400/25 backdrop-blur-2xl shadow-lg relative overflow-hidden h-full"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <Cloud className="w-52 h-52 text-azure-500 dark:text-cyan-400" />
            </div>

            <div>
              <h3 className="font-heading font-bold text-2xl text-dark-900 dark:text-white mb-6 flex items-center gap-3">
                <Terminal className="w-6 h-6 text-azure-500 dark:text-cyan-400" />
                <span>About Me</span>
              </h3>
              <div className="space-y-4 text-dark-800 dark:text-cream-300/90 font-body leading-relaxed text-sm sm:text-base">
                {portfolioData.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-3 text-xs font-mono">
              <div className="flex items-center gap-1.5 bg-azure-500/10 px-3.5 py-2 rounded-xl border border-azure-500/30 text-azure-600 dark:text-cyan-300 font-bold shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-azure-500" />
                <span>Azure Landing Zones</span>
              </div>
              <div className="flex items-center gap-1.5 bg-cyan-500/10 px-3.5 py-2 rounded-xl border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-bold shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                <span>Terraform IaC</span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-500/10 px-3.5 py-2 rounded-xl border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>DevSecOps & SRE</span>
              </div>
            </div>
          </motion.div>

          {/* Education & Certification Side Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* Education Box */}
            <TiltCard className="p-6 sm:p-7 rounded-3xl bg-white/90 dark:bg-dark-900/90 border border-slate-200 dark:border-slate-800 backdrop-blur-2xl shadow-lg hover:border-azure-500/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-azure-500/10 text-azure-500 border border-azure-500/30 shadow-md shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-azure-600 dark:text-cyan-300 uppercase tracking-wider font-bold">
                    {portfolioData.education.period}
                  </span>
                  <h4 className="font-heading font-bold text-xl text-dark-900 dark:text-white mt-1 leading-snug">
                    {portfolioData.education.degree}
                  </h4>
                  <p className="text-sm text-dark-800/80 dark:text-slate-300 mt-1">
                    {portfolioData.education.institution}
                  </p>
                  <p className="text-xs text-dark-800/70 dark:text-slate-400 mt-2 font-mono">
                    Specialization: {portfolioData.education.specialization}
                  </p>
                </div>
              </div>
            </TiltCard>

            {/* Certification Box (Static Container) */}
            {portfolioData.certifications.map((cert) => (
              <div
                key={cert.code}
                className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-white via-cream-100 to-azure-50/50 dark:from-dark-900 dark:via-dark-900 dark:to-azure-950/40 border border-azure-500/30 dark:border-cyan-400/40 backdrop-blur-2xl shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 shadow-md shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white text-xs font-extrabold font-mono">
                        {cert.code}
                      </span>
                      <span className="text-xs text-azure-600 dark:text-cyan-300 font-mono font-bold">Issued {cert.issueDate}</span>
                    </div>
                    <h4 className="font-heading font-bold text-lg text-dark-900 dark:text-white mt-2 leading-snug">
                      {cert.name}
                    </h4>
                    <p className="text-xs text-dark-800/80 dark:text-slate-300 mt-1 leading-relaxed">{cert.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Animated Stat Counters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {portfolioData.stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-white/90 dark:bg-dark-900/90 border border-slate-200 dark:border-slate-800 backdrop-blur-xl text-center hover:border-azure-500/40 transition-all duration-300 group shadow-md"
            >
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-azure-600 dark:text-cyan-300 group-hover:scale-110 transition-transform">
                <Counter
                  to={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.value % 1 !== 0 ? 2 : 0}
                />
              </div>
              <div className="font-heading font-semibold text-sm text-dark-900 dark:text-slate-200 mt-2">
                {stat.label}
              </div>
              <div className="text-xs font-mono text-azure-600 dark:text-cyan-300 mt-1 font-bold">
                {stat.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
