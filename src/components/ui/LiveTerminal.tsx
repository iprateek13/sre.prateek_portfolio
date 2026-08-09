"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Play, RotateCcw, Check, Copy, ShieldCheck, Activity } from "lucide-react";

interface CommandStep {
  cmd: string;
  output: string[];
}

const sreDevOpsSteps: CommandStep[] = [
  {
    cmd: "terraform plan -out=tfplan",
    output: [
      "Initializing Azure provider plugins (azurerm v3.116.0)...",
      "azurerm_resource_group.rg_landing_zone: Refreshing state...",
      "azurerm_virtual_network.hub_vnet: Refreshing state...",
      "Plan: 7 to add, 0 to change, 0 to destroy.",
      "  + module.hub_network.azurerm_azure_firewall.fw [ACTIVE]",
      "  + module.spoke_networks.azurerm_vnet_peering.bidirectional [CONNECTED]",
    ],
  },
  {
    cmd: "trivy image scan azure-prod-app:latest",
    output: [
      "Scanning target container image 'azure-prod-app:latest'...",
      "Total Vulnerabilities: 0 (CRITICAL: 0, HIGH: 0, MEDIUM: 0)",
      "Checking Checkov IaC Security Policies...",
      "  PASSED: CKV_AZURE_1 -- Key Vault secret expiration set",
      "  PASSED: CKV_AZURE_35 -- Network isolation enforced",
      "Security Gate Status: PASSED (DevSecOps Guardrails OK)",
    ],
  },
  {
    cmd: "kubectl get pods -n observability",
    output: [
      "NAME                                READY   STATUS    RESTARTS   AGE",
      "prometheus-k8s-server-0             1/1     Running   0          42d",
      "grafana-telemetry-dashboard-8f4b9   1/1     Running   0          42d",
      "alertmanager-sre-pager-79d8c        1/1     Running   0          42d",
      "SLA Reliability Status: 99.99% Uptime (MTTR < 5ms)",
    ],
  },
];

export function LiveTerminal() {
  const [activeStep, setActiveStep] = useState(0);
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
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
    }, 280);

    return () => clearInterval(interval);
  }, [activeStep]);

  const handleCopy = () => {
    const textToCopy = `$ ${sreDevOpsSteps[activeStep].cmd}\n${displayedLogs.join("\n")}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-3xl bg-dark-950/95 border border-azure-500/30 font-mono text-xs shadow-azure-glow overflow-hidden backdrop-blur-2xl text-slate-200">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-dark-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/90" />
          <div className="w-3 h-3 rounded-full bg-amber-400/90" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
          <span className="ml-2 text-[11px] text-cyan-300 font-semibold flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-azure-400" />
            <span>sre-devsecops-terminal</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded hover:bg-dark-800 text-slate-400 hover:text-cyan-300 transition-colors"
            title="Copy Terminal Logs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setActiveStep((prev) => (prev + 1) % sreDevOpsSteps.length)}
            className="p-1.5 rounded hover:bg-dark-800 text-slate-400 hover:text-cyan-300 transition-colors"
            title="Re-run Simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center bg-dark-900/50 border-b border-slate-800/80 px-2 pt-1 gap-1">
        {sreDevOpsSteps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`px-3 py-1.5 rounded-t-lg text-[11px] transition-colors flex items-center gap-1.5 ${
              activeStep === idx
                ? "bg-dark-950 text-cyan-300 border-t border-x border-azure-500/30 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Play className="w-2.5 h-2.5" />
            <span>Step {idx + 1}: {s.cmd.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* Terminal Output */}
      <div className="p-4 space-y-2 h-56 overflow-y-auto leading-relaxed text-slate-300">
        <div className="text-cyan-300 font-bold flex items-center gap-2">
          <span>sre@azure-node:~$</span>
          <span className="text-white">{sreDevOpsSteps[activeStep].cmd}</span>
        </div>

        {displayedLogs.map((line, i) => {
          let lineColor = "text-slate-300";
          if (line.includes("PASSED") || line.includes("SUCCESS") || line.includes("99.99%")) {
            lineColor = "text-emerald-400 font-bold";
          } else if (line.includes("Scanning") || line.includes("Initializing")) {
            lineColor = "text-cyan-400";
          } else if (line.includes("+") || line.includes("Running")) {
            lineColor = "text-azure-400";
          }

          return (
            <div key={i} className={lineColor}>
              {line}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-1 text-cyan-400 animate-pulse mt-1">
            <span className="w-2 h-3 bg-cyan-400 inline-block" />
          </div>
        )}
      </div>
    </div>
  );
}
