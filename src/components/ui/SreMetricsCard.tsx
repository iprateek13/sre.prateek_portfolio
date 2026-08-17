"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Cloud, ShieldCheck, Cpu, Layers, Activity, 
  CheckCircle2, Boxes, ArrowRight, Sparkles, Network 
} from "lucide-react";
import { TerraformModuleExplorerModal } from "./TerraformModuleExplorerModal";

export function SreMetricsCard() {
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);

  return (
    <>
      <TerraformModuleExplorerModal
        isOpen={isExplorerOpen}
        onClose={() => setIsExplorerOpen(false)}
      />

      <div className="rounded-3xl bg-white/90 dark:bg-dark-900/90 border border-azure-500/30 shadow-2xl backdrop-blur-2xl p-6 sm:p-7 space-y-6 relative overflow-hidden group">
        {/* Glow Halo Background */}
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-azure-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Status */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-azure-500/10 text-azure-600 dark:text-cyan-300 border border-azure-500/30">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                SRE Live Command Center
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Real-Time Cloud Telemetry</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs font-mono font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>99.99% SLA Uptime</span>
          </div>
        </div>

        {/* Live Active Infrastructure Status List */}
        <div className="space-y-3">
          <div className="text-xs font-mono font-bold text-azure-600 dark:text-cyan-300 uppercase tracking-wider">
            Active Multi-Cloud Topologies
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-azure-500/10 text-azure-500">
                <Cloud className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-heading font-bold text-slate-900 dark:text-white">
                  Azure Landing Zone (Hub VNet)
                </div>
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  10.0.0.0/16 • Azure Firewall & Bastion
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 shrink-0">
              HEALTHY
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500">
                <Network className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-heading font-bold text-slate-900 dark:text-white">
                  AWS Multi-AZ VPC
                </div>
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  172.16.0.0/16 • Public/Private Subnets
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 shrink-0">
              HEALTHY
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-heading font-bold text-slate-900 dark:text-white">
                  DevSecOps Guardrails
                </div>
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  tfsec, Checkov & Trivy Scans
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-azure-500/10 text-azure-600 dark:text-cyan-300 border border-azure-500/30 shrink-0">
              0 FAILURES
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => setIsExplorerOpen(true)}
            className="w-full py-3 px-4 rounded-2xl bg-slate-100 dark:bg-dark-850 hover:bg-azure-500/10 border border-slate-200 dark:border-slate-800 hover:border-azure-500/40 text-xs font-heading font-bold text-slate-900 dark:text-white hover:text-azure-600 dark:hover:text-cyan-300 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2">
              <Boxes className="w-4 h-4 text-azure-500" />
              <span>Inspect 15+ Terraform Child Modules</span>
            </div>
            <ArrowRight className="w-4 h-4 text-azure-500 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </>
  );
}
