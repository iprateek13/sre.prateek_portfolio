"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Play, Check, Copy } from "lucide-react";

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
    }, 240);

    return () => clearInterval(interval);
  }, [activeStep]);

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
            <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-azure-400" />
            <span>sre-multi-cloud-terminal</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-dark-800 text-slate-400 hover:text-cyan-300 transition-colors"
            title="Copy Terminal Logs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Interactive Command Tabs */}
      <div className="flex items-center gap-1 p-1.5 sm:p-2 bg-dark-900/60 border-b border-slate-800/80 overflow-x-auto no-scrollbar">
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

      {/* Terminal Viewport */}
      <div className="p-3.5 sm:p-5 min-h-[175px] sm:min-h-[195px] font-mono text-[11px] sm:text-xs space-y-2 leading-relaxed">
        {/* Command Line Prompt */}
        <div className="flex items-center gap-1.5 text-cyan-400 font-bold flex-wrap">
          <span className="text-emerald-400">prateek@sre-cloud:~$</span>
          <span className="text-white">{sreDevOpsSteps[activeStep].cmd}</span>
        </div>

        {/* Output Logs */}
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
    </div>
  );
}
