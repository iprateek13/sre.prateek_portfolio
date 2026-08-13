"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal as TerminalIcon,
  Play,
  Check,
  Copy,
  Network,
  Activity,
  ShieldCheck,
  Server,
  Database,
  Cpu,
  Layers,
} from "lucide-react";

interface CommandStep {
  cmd: string;
  output: string[];
}

const sreDevOpsSteps: CommandStep[] = [
  {
    cmd: "terraform plan -out=tfplan",
    output: [
      "Initializing Azure & AWS providers (v3.116, v5.62)...",
      "azurerm_resource_group.rg_landing_zone: Refreshed",
      "aws_vpc.prod_multi_cloud_vpc: Refreshed",
      "Plan: 15 to add (15+ Child Modules), 0 to destroy.",
      "  + module.hub_network.azurerm_firewall [ACTIVE]",
      "  + module.spoke_vnet.vnet_peering [CONNECTED]",
      "  + module.aws_vpc.public_subnet [PROVISIONED]",
    ],
  },
  {
    cmd: "trivy image scan azure-prod-app:latest",
    output: [
      "Scanning target container image 'azure-prod-app'...",
      "Total Vulnerabilities: 0 (CRITICAL: 0, HIGH: 0)",
      "Checking Checkov IaC Security Policies...",
      "  PASSED: CKV_AZURE_1 -- Key Vault secret expiration set",
      "  PASSED: CKV_AZURE_35 -- Network isolation enforced",
      "Security Gate Status: PASSED (DevSecOps Guardrails OK)",
    ],
  },
  {
    cmd: "kubectl get pods -n observability",
    output: [
      "NAME                             READY   STATUS    AGE",
      "prometheus-k8s-server-0          1/1     Running   42d",
      "grafana-telemetry-dashboard-8f  1/1     Running   42d",
      "alertmanager-sre-pager-79d       1/1     Running   42d",
      "SLA Status: 99.99% Uptime (MTTR < 5ms)",
    ],
  },
];

export function LiveTerminal() {
  const [viewMode, setViewMode] = useState<"terminal" | "topology" | "telemetry">("terminal");
  const [activeStep, setActiveStep] = useState(0);
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [healthData, setHealthData] = useState<any>(null);

  // Fetch real-time SRE API health status
  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setHealthData(data))
      .catch(() => {});
  }, []);

  // Terminal Typing Simulation Effect
  useEffect(() => {
    if (viewMode !== "terminal") return;
    let currentLogs: string[] = [];
    let stepIndex = 0;
    setIsTyping(true);

    const step = sreDevOpsSteps[activeStep];

    const interval = setInterval(() => {
      if (stepIndex < step.output.length) {
        currentLogs = [...currentLogs, step.output[stepIndex]];
        setDisplayedLogs([...currentLogs]);
        stepIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 240);

    return () => clearInterval(interval);
  }, [activeStep, viewMode]);

  const handleCopy = () => {
    const textToCopy = `$ ${sreDevOpsSteps[activeStep].cmd}\n${displayedLogs.join("\n")}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg lg:max-w-none mx-auto rounded-2xl sm:rounded-3xl bg-dark-950/95 border border-azure-500/30 font-mono text-xs shadow-azure-glow overflow-hidden backdrop-blur-2xl text-slate-200">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 sm:px-4 sm:py-3 bg-dark-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/90" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400/90" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/90" />
          <span className="ml-1.5 sm:ml-2 text-[10px] sm:text-[11px] text-cyan-300 font-semibold flex items-center gap-1.5">
            <TerminalIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-azure-400" />
            <span>sre-hybrid-cloud-hub</span>
          </span>
        </div>

        {/* View Mode Mode Selector Tabs */}
        <div className="flex items-center gap-1 bg-dark-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setViewMode("terminal")}
            className={`px-2 py-1 rounded text-[10px] sm:text-[11px] font-bold transition-colors flex items-center gap-1 ${
              viewMode === "terminal" ? "bg-azure-500/30 text-cyan-300 border border-azure-500/50" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <TerminalIcon className="w-3 h-3" />
            <span className="hidden xs:inline">CLI</span>
          </button>
          <button
            onClick={() => setViewMode("topology")}
            className={`px-2 py-1 rounded text-[10px] sm:text-[11px] font-bold transition-colors flex items-center gap-1 ${
              viewMode === "topology" ? "bg-cyan-500/30 text-cyan-300 border border-cyan-500/50" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Network className="w-3 h-3" />
            <span className="hidden xs:inline">Topology</span>
          </button>
          <button
            onClick={() => setViewMode("telemetry")}
            className={`px-2 py-1 rounded text-[10px] sm:text-[11px] font-bold transition-colors flex items-center gap-1 ${
              viewMode === "telemetry" ? "bg-emerald-500/30 text-emerald-300 border border-emerald-500/50" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span className="hidden xs:inline">Metrics</span>
          </button>
        </div>
      </div>

      {/* Main Viewport Content Area */}
      <AnimatePresence mode="wait">
        {/* VIEW 1: LIVE TERMINAL CLI */}
        {viewMode === "terminal" && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {/* Command selector sub-bar */}
            <div className="flex items-center justify-between p-1.5 sm:p-2 bg-dark-900/60 border-b border-slate-800/80 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1">
                {sreDevOpsSteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-[11px] font-mono whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      activeStep === idx
                        ? "bg-azure-500/20 text-cyan-300 border border-cyan-400/40 font-bold"
                        : "text-slate-400 hover:text-slate-200 hover:bg-dark-800"
                    }`}
                  >
                    <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" />
                    <span>{step.cmd.split(" ")[0]}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleCopy}
                className="p-1.5 rounded hover:bg-dark-800 text-slate-400 hover:text-cyan-300 transition-colors ml-2"
                title="Copy Terminal Logs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Terminal Viewport */}
            <div className="p-3.5 sm:p-5 min-h-[175px] sm:min-h-[195px] font-mono text-[11px] sm:text-xs space-y-2 leading-relaxed">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold flex-wrap">
                <span className="text-emerald-400">prateek@sre-cloud:~$</span>
                <span className="text-white">{sreDevOpsSteps[activeStep].cmd}</span>
              </div>

              <div className="space-y-1 text-slate-300 font-mono">
                {displayedLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`break-words ${
                      log.includes("PASSED")
                        ? "text-emerald-400 font-semibold"
                        : log.includes("15+") || log.includes("ACTIVE") || log.includes("CONNECTED")
                        ? "text-cyan-300 font-semibold"
                        : "text-slate-300"
                    }`}
                  >
                    {log}
                  </div>
                ))}
                {isTyping && <span className="inline-block w-1.5 h-3.5 bg-cyan-400 animate-pulse ml-0.5" />}
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 2: 3D CLOUD ARCHITECTURE TOPOLOGY MAP */}
        {viewMode === "topology" && (
          <motion.div
            key="topology"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-3.5 sm:p-5 min-h-[220px] flex flex-col justify-between"
          >
            <div className="text-[11px] text-slate-400 font-semibold mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <Layers className="w-3.5 h-3.5 text-azure-400" />
                <span>Multi-Cloud Architecture Mesh Topology</span>
              </span>
              <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                ● 15+ Child Modules
              </span>
            </div>

            {/* Cloud Topology Node Mesh Cards */}
            <div className="grid grid-cols-2 gap-2.5 my-auto">
              <div className="p-2.5 rounded-xl bg-dark-900/90 border border-azure-500/30 flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-azure-500/20 text-azure-400 shrink-0">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-white block">Azure Hub VNet</span>
                  <span className="text-[10px] text-cyan-400 font-mono">Firewall & KeyVault</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-dark-900/90 border border-cyan-500/30 flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0">
                  <Network className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-white block">AWS VPC Peering</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Bidi Peered</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-dark-900/90 border border-emerald-500/30 flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-white block">Kubernetes Pods</span>
                  <span className="text-[10px] text-slate-300 font-mono">3/3 Replica Running</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-dark-900/90 border border-amber-500/30 flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-white block">DevSecOps Gate</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Checkov 100% OK</span>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 text-center font-mono pt-2 border-t border-slate-800/80">
              ⚡ Automated via Terraform Enterprise & GitHub Actions CI/CD
            </div>
          </motion.div>
        )}

        {/* VIEW 3: LIVE REAL-TIME SRE TELEMETRY METRICS DASHBOARD */}
        {viewMode === "telemetry" && (
          <motion.div
            key="telemetry"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-3.5 sm:p-5 min-h-[220px] flex flex-col justify-between"
          >
            <div className="text-[11px] text-slate-400 font-semibold mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>Live SRE Cluster Health & Telemetry</span>
              </span>
              <span className="text-cyan-300 text-[10px] font-mono">
                {healthData?.telemetry?.dbLatencyMs ? `Latency: ${healthData.telemetry.dbLatencyMs}` : "Latency: <3ms"}
              </span>
            </div>

            {/* Live Metrics Stats Grid */}
            <div className="grid grid-cols-3 gap-2 my-auto text-center font-mono">
              <div className="p-2.5 rounded-xl bg-dark-900/90 border border-emerald-500/40">
                <span className="text-[10px] text-slate-400 block mb-0.5">SLA Uptime</span>
                <span className="text-sm font-extrabold text-emerald-400">99.99%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-dark-900/90 border border-azure-500/40">
                <span className="text-[10px] text-slate-400 block mb-0.5">MongoDB DB</span>
                <span className="text-xs font-bold text-cyan-300">
                  {healthData?.telemetry?.dbStatus || "CONNECTED"}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-dark-900/90 border border-amber-500/40">
                <span className="text-[10px] text-slate-400 block mb-0.5">K8s Probes</span>
                <span className="text-xs font-bold text-amber-300">
                  {healthData?.k8sProbes?.liveness || "READY"}
                </span>
              </div>
            </div>

            {/* Microservice Info Line */}
            <div className="p-2 rounded-xl bg-dark-900/60 border border-slate-800 text-[10px] font-mono text-slate-300 flex items-center justify-between mt-2">
              <span className="flex items-center gap-1 text-azure-400">
                <Database className="w-3 h-3" />
                <span>MongoDB Atlas Engine</span>
              </span>
              <span className="text-emerald-400 font-bold">● Healthy Service</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
