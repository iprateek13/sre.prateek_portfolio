"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Trash2, Check, Copy } from "lucide-react";
import canvasConfetti from "canvas-confetti";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export function LiveTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll terminal to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isMatrixMode]);

  // Initial Welcome Output
  useEffect(() => {
    setHistory([
      {
        command: "welcome",
        output: (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-300 font-bold">
              ⚡ Welcome to Prateek's SRE & Cloud Interactive Terminal v2.4
            </p>
            <p className="text-slate-400">
              Type <span className="text-emerald-400 font-bold">help</span> or click any quick pill below to execute CLI commands:
            </p>
          </div>
        ),
      },
    ]);
  }, []);

  const handleRunCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    let outputNode: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        outputNode = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-300 font-bold">Available Commands:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] pt-1">
              <div><span className="text-emerald-400 font-bold">skills</span> - SRE & Cloud Stack</div>
              <div><span className="text-emerald-400 font-bold">projects</span> - Top Infrastructure Case Studies</div>
              <div><span className="text-emerald-400 font-bold">whoami</span> - Prateek's Bio Summary</div>
              <div><span className="text-emerald-400 font-bold">contact</span> - Email & Reach Out</div>
              <div><span className="text-emerald-400 font-bold">matrix</span> - Cyberpunk Rain Animation</div>
              <div><span className="text-emerald-400 font-bold">hire</span> - Trigger Celebration Blast 🎉</div>
              <div><span className="text-emerald-400 font-bold">clear</span> - Clear Terminal Output</div>
            </div>
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="space-y-1">
            <p className="text-cyan-300 font-bold">Cloud & Reliability Architecture Matrix:</p>
            <div className="text-slate-300 space-y-1 pt-1">
              <p>☁️ <span className="text-azure-400 font-semibold">Cloud Platforms:</span> Azure (Expert), AWS (Peering & Multi-Cloud)</p>
              <p>🛠️ <span className="text-emerald-400 font-semibold">IaC & Automation:</span> Terraform (15+ Modules), Bicep, Ansible</p>
              <p>📦 <span className="text-cyan-300 font-semibold">Containers & K8s:</span> Docker, Kubernetes, Helm, AKS, EKS</p>
              <p>📊 <span className="text-amber-300 font-semibold">Observability:</span> Prometheus, Grafana, Alertmanager, Azure Monitor</p>
              <p>🛡️ <span className="text-rose-400 font-semibold">DevSecOps:</span> Checkov, Trivy, GitHub Actions CI/CD</p>
            </div>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-1.5">
            <p className="text-cyan-300 font-bold">Featured SRE Case Studies:</p>
            <div className="space-y-1 text-slate-300">
              <p><span className="text-emerald-400 font-bold">1. Enterprise Azure Landing Zone</span> (15+ Terraform Child Modules)</p>
              <p><span className="text-cyan-300 font-bold">2. Bidi Multi-Cloud Peering Mesh</span> (Azure Hub VNet &lt;-&gt; AWS VPC)</p>
              <p><span className="text-amber-300 font-bold">3. Automated DevSecOps Pipeline</span> (Checkov & Trivy Guardrails)</p>
            </div>
          </div>
        );
        break;

      case "whoami":
        outputNode = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-300 font-bold">Prateek Gupta — SRE & DevOps Engineer</p>
            <p>Architecting resilient, self-healing cloud infrastructure on Azure & AWS with 99.99% SLA reliability.</p>
          </div>
        );
        break;

      case "contact":
        outputNode = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-300 font-bold">Direct Reach Out:</p>
            <p>📧 Email: <a href="mailto:sre.prateek@gmail.com" className="text-emerald-400 underline font-bold">sre.prateek@gmail.com</a></p>
            <p>💼 LinkedIn: <a href="https://linkedin.com/in/iprateekgupta13" target="_blank" rel="noreferrer" className="text-azure-400 underline">iprateekgupta13</a></p>
          </div>
        );
        break;

      case "matrix":
        setIsMatrixMode(true);
        setTimeout(() => setIsMatrixMode(false), 4500);
        outputNode = (
          <p className="text-emerald-400 font-mono animate-pulse font-bold">
            🟢 CYBERPUNK MATRIX DIGITAL RAIN INITIALIZED (4.5s)...
          </p>
        );
        break;

      case "hire":
        try {
          canvasConfetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch (e) {}
        outputNode = (
          <div className="space-y-1 text-emerald-400 font-bold">
            <p>🎉 THANK YOU! Prateek is ready to build high-availability cloud infrastructure with your team!</p>
            <p className="text-slate-300 font-normal">
              Reach out directly via email at <span className="text-cyan-300 underline font-bold">sre.prateek@gmail.com</span>
            </p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        outputNode = (
          <p className="text-rose-400 font-mono">
            zsh: command not found: {trimmed}. Type <span className="text-emerald-400 font-bold underline cursor-pointer" onClick={() => handleRunCommand("help")}>help</span> to see available commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: trimmed, output: outputNode }]);
    setInputVal("");
  };

  const handleCopyLogs = () => {
    const text = history.map((item) => `$ ${item.command}\n`).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg lg:max-w-none mx-auto rounded-2xl sm:rounded-3xl bg-dark-950/95 border border-azure-500/30 font-mono text-xs shadow-azure-glow overflow-hidden backdrop-blur-2xl text-slate-200 relative">
      {/* Matrix Rain Mode Overlay */}
      <AnimatePresence>
        {isMatrixMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 bg-black/90 pointer-events-none p-4 font-mono text-emerald-400 text-[10px] overflow-hidden leading-tight flex flex-col justify-between"
          >
            <div className="animate-pulse space-y-1">
              <p>01001000 01100101 01101100 01101100 01101111 00100000 01010011 01010010 01000101</p>
              <p>AZURE_LANDING_ZONE_ACTIVE = true | TERRAFORM_MODULES = 15+</p>
              <p>PROMETHEUS_METRICS = HEALTHY | SLA_UPTIME = 99.99%</p>
              <p>KUBERNETES_POD_STATUS = RUNNING (REPLICAS: 3/3)</p>
              <p>01101001 01110000 01110010 01100001 01110100 01100101 01100101 01101011 00110001 00110011</p>
              <p>CHECKOV_SECURITY_GUARDRAILS = PASSED (0 VULNERABILITIES)</p>
            </div>
            <div className="text-center font-bold text-cyan-300 text-xs py-2">
              ⚡ SRE CYBER RAIN MATRIX RUNNING ⚡
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Window Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 sm:px-4 sm:py-3 bg-dark-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/90" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400/90" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/90" />
          <span className="ml-1.5 sm:ml-2 text-[10px] sm:text-[11px] text-cyan-300 font-semibold flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-azure-400" />
            <span>prateek@sre-cloud:~</span>
          </span>
        </div>

        <button
          onClick={handleCopyLogs}
          className="p-1.5 rounded hover:bg-dark-800 text-slate-400 hover:text-cyan-300 transition-colors"
          title="Copy Terminal Output"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Quick Action Command Pills */}
      <div className="px-3 py-2 bg-dark-900/70 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {["help", "skills", "projects", "whoami", "matrix", "hire", "clear"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleRunCommand(cmd)}
            className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono whitespace-nowrap transition-all border ${
              cmd === "hire"
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold hover:bg-emerald-500/30"
                : cmd === "matrix"
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold hover:bg-cyan-500/30"
                : "bg-dark-800 text-slate-300 border-slate-700 hover:bg-azure-500/20 hover:text-cyan-300 hover:border-azure-500/40"
            }`}
          >
            {cmd === "hire" ? "🎉 hire" : cmd === "matrix" ? "🟢 matrix" : `$ ${cmd}`}
          </button>
        ))}
      </div>

      {/* Terminal Output Area */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="p-3.5 sm:p-5 min-h-[210px] max-h-[280px] overflow-y-auto space-y-3 cursor-text font-mono text-[11px] sm:text-xs"
      >
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            {item.command !== "welcome" && (
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <span className="text-emerald-400">prateek@sre-cloud:~$</span>
                <span className="text-white">{item.command}</span>
              </div>
            )}
            <div className="pl-0.5">{item.output}</div>
          </div>
        ))}

        {/* Input Prompt */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRunCommand(inputVal);
          }}
          className="flex items-center gap-1.5 pt-1 text-cyan-400 font-bold"
        >
          <span className="text-emerald-400 shrink-0">prateek@sre-cloud:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-[11px] sm:text-xs caret-cyan-400 p-0"
            placeholder="type 'help' or any command..."
            autoComplete="off"
            spellCheck="false"
          />
          <button type="submit" className="text-slate-500 hover:text-cyan-300 p-1">
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </form>

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
