"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/content";
import { 
  Cloud, Cpu, Layers, Terminal, Server, Shield, 
  Sparkles, CheckCircle2, Zap, Database, Activity, Code2
} from "lucide-react";

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Skills", icon: Sparkles },
    { id: "cloud-iac", label: "Cloud & IaC", icon: Cloud },
    { id: "containers-cicd", label: "Containers & CI/CD", icon: Server },
    { id: "observability", label: "Observability & Linux", icon: Activity },
  ];

  const skillList = [
    { name: "Terraform", category: "cloud-iac", level: 95, exp: "3+ yrs", highlight: "Modular HCL Architecture" },
    { name: "Microsoft Azure", category: "cloud-iac", level: 90, exp: "3+ yrs", highlight: "AKS, VNet, Blob, KeyVault" },
    { name: "Amazon Web Services (AWS)", category: "cloud-iac", level: 85, exp: "2+ yrs", highlight: "EC2, S3, IAM, EKS" },
    { name: "Kubernetes (AKS/EKS)", category: "containers-cicd", level: 90, exp: "3+ yrs", highlight: "Helm, Ingress, HPA" },
    { name: "Docker", category: "containers-cicd", level: 95, exp: "3+ yrs", highlight: "Multi-stage builds, Compose" },
    { name: "Azure DevOps Pipelines", category: "containers-cicd", level: 90, exp: "3+ yrs", highlight: "YAML Pipelines, Self-hosted" },
    { name: "GitHub Actions", category: "containers-cicd", level: 90, exp: "3+ yrs", highlight: "Custom Workflows, OIDC" },
    { name: "Prometheus & Grafana", category: "observability", level: 85, exp: "2+ yrs", highlight: "Alertmanager, Dashboards" },
    { name: "Linux Administration", category: "observability", level: 90, exp: "3+ yrs", highlight: "Bash, Systemd, Networking" },
    { name: "Python Scripting", category: "observability", level: 80, exp: "2+ yrs", highlight: "Automation, Boto3, APIs" },
    { name: "Git & GitOps (ArgoCD)", category: "containers-cicd", level: 88, exp: "2+ yrs", highlight: "Declarative Deployments" },
    { name: "Ansible", category: "cloud-iac", level: 80, exp: "2+ yrs", highlight: "Configuration Management" },
  ];

  const filteredSkills = activeCategory === "all"
    ? skillList
    : skillList.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono"
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>TECHNICAL CAPABILITIES</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
          >
            Cloud <span className="text-gradient-sre">Infrastructure & Tooling</span> Matrix
          </motion.h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2.5 rounded-full text-xs font-mono transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                    : "bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skill Bento Cards Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass-panel glass-panel-hover rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-lg text-white">{skill.name}</h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                      {skill.exp}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-400">{skill.highlight}</p>
                </div>

                {/* Progress Bar Gauge */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>PROFICIENCY</span>
                    <span className="text-emerald-400 font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
