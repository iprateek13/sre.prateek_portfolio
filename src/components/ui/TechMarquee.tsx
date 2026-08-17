"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cloud, Cpu, Container, GitBranch, Terminal, FileCode2, ShieldCheck, Activity, BarChart3, Lock } from "lucide-react";

const sreTechList = [
  { name: "Microsoft Azure", icon: Cloud, color: "text-azure-500 dark:text-azure-400" },
  { name: "Terraform IaC", icon: Cpu, color: "text-cyan-500 dark:text-cyan-400" },
  { name: "Trivy DevSecOps", icon: ShieldCheck, color: "text-emerald-500 dark:text-emerald-400" },
  { name: "Kubernetes (AKS)", icon: Container, color: "text-azure-600 dark:text-cyan-300" },
  { name: "GitHub Actions CI/CD", icon: GitBranch, color: "text-emerald-600 dark:text-emerald-300" },
  { name: "Prometheus Monitoring", icon: Activity, color: "text-azure-500 dark:text-azure-400" },
  { name: "Grafana Dashboards", icon: BarChart3, color: "text-cyan-500 dark:text-cyan-400" },
  { name: "Azure Entra ID IAM", icon: Lock, color: "text-emerald-500 dark:text-emerald-400" },
  { name: "Bash Automation", icon: Terminal, color: "text-azure-600 dark:text-cyan-300" },
  { name: "Python Scripting", icon: FileCode2, color: "text-emerald-600 dark:text-emerald-300" },
];

export function TechMarquee() {
  const marqueeItems = [...sreTechList, ...sreTechList, ...sreTechList];

  return (
    <div className="w-full overflow-hidden py-6 sm:py-8 bg-[#F7F3E9]/90 dark:bg-dark-950/90 border-y border-amber-900/10 dark:border-azure-500/20 backdrop-blur-md relative z-10">
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#F7F3E9] dark:from-dark-950 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#F7F3E9] dark:from-dark-950 to-transparent z-10" />

      <motion.div
        className="flex items-center gap-4 sm:gap-6 whitespace-nowrap transform-gpu"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{
          ease: "linear",
          duration: 15, // Optimized 15s speed for crisp, smooth 60fps mobile & desktop scroll
          repeat: Infinity,
        }}
        style={{ willChange: "transform" }}
      >
        {marqueeItems.map((tech, idx) => {
          const IconComp = tech.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-2 sm:gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 hover:border-azure-500/50 backdrop-blur-md shadow-sm transition-colors group cursor-default"
            >
              <IconComp className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${tech.color} group-hover:scale-110 transition-transform`} />
              <span className="font-heading font-semibold text-[11px] sm:text-xs text-dark-900 dark:text-cream-300 group-hover:text-azure-600 dark:group-hover:text-white transition-colors tracking-wide">
                {tech.name}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
