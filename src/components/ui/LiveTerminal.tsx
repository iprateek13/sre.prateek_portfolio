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
      "Initializing Multi-Cloud Azure & AWS provider plugins (azurerm v3.116, aws v5.62)...",
      "azurerm_resource_group.rg_landing_zone: Refreshing state...",
      "aws_vpc.prod_multi_cloud_vpc: Refreshing state...",
      "Plan: 15 to add (15+ Child Modules), 0 to change, 0 to destroy.",
      "  + module.hub_network.azurerm_azure_firewall.fw [ACTIVE]",
      "  + module.spoke_networks.azurerm_vnet_peering.bidirectional [CONNECTED]",
      "  + module.aws_vpc.aws_subnet.public_private [PROVISIONED]",
    ],
  },
  {
    cmd: "trivy image scan azure-prod-app:latest",
    output: [
      "Scanning target container image 'azure-prod-app:latest'...",
      "Total Vulnerabilities: 0 (CRITICAL: 0, HIGH: 0, MEDIUM: 0)",
      "Checking tfsec & Checkov IaC Security Policies...",
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
            <span>sre-multi-cloud-terminal</span>
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
        </div>
      </div>

      {/* Interactive Command Tabs */}
      <div className="flex items-center gap-1 p-2 bg-dark-900/60 border-b border-slate-800/80 overflow-x-auto no-scrollbar">
        {sreDevOpsSteps.map((step, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-mono whitespace-nowrap transition-all flex items-center gap-2 ${
              activeStep === idx
                ? "bg-azure-500/20 text-cyan-300 border border-cyan-400/40 font-bold"
                : "text-slate-400 hover:text-slate-200 hover:bg-dark-800"
            }`}
          >
            <Play className="w-3 h-3 text-emerald-400" />
            <span>{step.cmd.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* Terminal Viewport */}
      <div className="p-4 sm:p-6 min-h-[220px] font-mono text-xs sm:text-sm space-y-3 leading-relaxed">
        {/* Command Line Prompt */}
        <div className="flex items-center gap-2 text-cyan-400 font-bold">
          <span className="text-emerald-400">prateek@sre-cloud:~$</span>
          <span className="text-white">{sreDevOpsSteps[activeStep].cmd}</span>
        </div>

        {/* Output Logs */}
        <div className="space-y-1.5 text-slate-300">
          {displayedLogs.map((log, idx) => (
            <div
              key={idx}
              className={`${
                log.includes("PASSED")
                  ? "text-emerald-400 font-semibold"
                  : log.includes("15+") || log.includes("ACTIVE")
                  ? "text-cyan-300 font-semibold"
                  : "text-slate-300"
              }`}
            >
              {log}
            </div>
          ))}
          {isTyping && <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-1" />}
        </div>
      </div>
    </div>
  );
}
