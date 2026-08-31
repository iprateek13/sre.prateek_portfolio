"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/content";
import { 
  User, Award, GraduationCap, MapPin, CheckCircle2, 
  Cloud, ShieldCheck, Activity, Terminal, ExternalLink 
} from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-32 relative overflow-hidden bg-mesh-gradient">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-azure-500/10 border border-azure-500/30 text-azure-600 dark:text-cyan-300 text-xs font-mono mb-4 shadow-sm">
            <User className="w-4 h-4 text-cyan-400" />
            <span>SRE Background & Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-dark-900 dark:text-white tracking-tight mb-4">
            Reliability Engineering <span className="text-gradient-sre">at Scale</span>
          </h2>
        </div>

        {/* Top Grid: Bio & Stats Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Left Column: Bio Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-white/90 dark:bg-dark-900/90 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl space-y-5"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <MapPin className="w-4 h-4 text-azure-500" />
                <span>{portfolioData.location}</span>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 font-bold border border-emerald-500/30">
                Open to SRE Roles
              </span>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-body leading-relaxed">
              {portfolioData.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-4 grid grid-cols-2 gap-3 text-xs font-mono text-slate-600 dark:text-slate-400">
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-dark-850 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-azure-500 shrink-0" />
                <span>15+ Modular IaC Specs</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-dark-850 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>99.99% Target SLA</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Key Metric Counters Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {portfolioData.stats.map((stat, idx) => (
              <div
                key={stat.id}
                className="p-6 rounded-3xl bg-white/90 dark:bg-dark-900/90 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl flex flex-col justify-between hover:border-azure-500/40 transition-all hover:-translate-y-1"
              >
                <div className="text-[10px] font-mono font-bold text-azure-500 uppercase tracking-wider mb-2">
                  {stat.label}
                </div>

                <div className="text-3xl sm:text-4xl font-heading font-extrabold text-dark-900 dark:text-white mb-2">
                  <span className="text-gradient-sre">
                    {stat.prefix || ""}
                    {stat.value}
                    {stat.suffix || ""}
                  </span>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {stat.sublabel}
                </div>
              </div>
            ))}

            {/* Certification Badge Box */}
            <div className="sm:col-span-2 p-6 rounded-3xl bg-white/90 dark:bg-dark-900/90 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl flex items-center justify-between hover:border-azure-500/40 transition-all hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-azure-500/10 dark:bg-azure-500/20 border border-azure-500/30 text-azure-500 dark:text-cyan-300">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-azure-500 uppercase tracking-wider mb-1">
                    MICROSOFT CERTIFIED
                  </div>
                  <div className="text-lg sm:text-xl font-heading font-extrabold mb-1">
                    <span className="text-gradient-sre">Azure Fundamentals (AZ-900)</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Verified Cloud Concepts, Security Governance & Architecture
                  </div>
                </div>
              </div>

              <a
                href={portfolioData.certifications[0].credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-azure-500/10 dark:bg-azure-500/20 hover:bg-azure-500/20 border border-azure-500/30 text-azure-500 dark:text-cyan-300 transition-all hover:scale-105 active:scale-95 shrink-0"
                title="Verify Certification"
                aria-label="Verify AZ-900 Certification"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
