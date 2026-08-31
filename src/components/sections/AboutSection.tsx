"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/content";
import { Counter } from "@/components/ui/Counter";
import { 
  Award, CheckCircle2, Shield, Cloud, Terminal, MapPin, 
  Sparkles, Code2, Server, Cpu, Globe, Rocket 
} from "lucide-react";

export function AboutSection() {
  const stats = [
    { label: "Years Experience", value: 3, suffix: "+" },
    { label: "IaC Terraform Modules", value: 25, suffix: "+" },
    { label: "Kubernetes Microservices", value: 50, suffix: "+" },
    { label: "Cloud Uptime SLA", value: 99.99, suffix: "%" },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-dot-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>CLOUD PLATFORM & SRE PHILOSOPHY</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
          >
            Engineering <span className="text-gradient-sre">High-Availability</span> Systems
          </motion.h2>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Card 1: Core Bio & Philosophy (Span 8) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  <Server className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-white">Prateek Gupta</h3>
                  <p className="text-xs font-mono text-cyan-400">Site Reliability Engineer & Infrastructure Architect</p>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Specialized in architecting automated, reproducible multi-cloud infrastructure on Azure and AWS. I leverage HashiCorp Terraform, Kubernetes, Docker, and CI/CD automation pipelines to achieve zero-downtime deployments and continuous observability.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Multi-Cloud Architecture (Azure & AWS)",
                  "15+ Modular Terraform Child Modules",
                  "DevSecOps Pipeline Automation & Security",
                  "99.99% Target SLA & Disaster Recovery"
                ].map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bento Card 2: Live Location & Status (Span 4) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">LOCATION & TIMEZONE</span>
                <span className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                  <Globe className="w-5 h-5" />
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                  <MapPin className="w-5 h-5 text-rose-400" />
                  <span>New Delhi, India</span>
                </div>
                <p className="text-xs font-mono text-slate-400">IST (UTC +5:30) • Remote Ready</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono text-emerald-300 font-semibold">Available for full-time SRE roles</span>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 3: Metrics Counter Cards (Span 12) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="glass-panel glass-panel-hover rounded-3xl p-6 text-center space-y-2">
                <div className="font-heading font-extrabold text-3xl sm:text-4xl text-gradient-sre flex items-center justify-center">
                  <Counter to={stat.value} decimals={stat.value % 1 !== 0 ? 2 : 0} />
                  <span>{stat.suffix}</span>
                </div>
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Bento Card 4: Certifications Showcase (Span 12) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-12 glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 space-y-6"
          >
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-cyan-400" />
              <h3 className="font-heading font-bold text-xl text-white">Verified Certifications & Credentials</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolioData.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-start gap-3 group"
                >
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-300 group-hover:scale-110 transition-transform">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">{cert.name}</h4>
                    <p className="text-xs font-mono text-slate-400">{cert.issuer}</p>
                    <span className="inline-block text-[10px] font-mono text-emerald-400 mt-1">{cert.issueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
