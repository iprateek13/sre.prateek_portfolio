"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/types";
import { X, Github, ExternalLink, ShieldCheck, Layers, CheckCircle2, Copy, Check, Terminal } from "lucide-react";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const sampleTerraformCode: Record<string, string> = {
  "azure-landing-zone": `# main.tf - Azure Enterprise Hub-and-Spoke Landing Zone
module "hub_network" {
  source              = "./modules/network/hub_vnet"
  resource_group_name = azurerm_resource_group.rg_hub.name
  location            = "East US 2"
  vnet_address_space  = ["10.0.0.0/16"]

  subnets = {
    AzureFirewallSubnet = "10.0.1.0/24"
    GatewaySubnet       = "10.0.2.0/24"
  }
}

module "spoke_network" {
  source              = "./modules/network/spoke_vnet"
  vnet_address_space  = ["10.1.0.0/16"]
  hub_vnet_id         = module.hub_network.vnet_id
}`,
  default: `# main.tf - SRE Terraform Infrastructure Module
module "sre_infrastructure" {
  source      = "terraform-azure-modules/sre/azurerm"
  version     = "3.2.0"
  environment = "production"

  enable_devsecops_gate = true
  enable_telemetry      = true
}`,
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const codeSnippet = sampleTerraformCode[project.id] || sampleTerraformCode.default;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <AnimatePresence>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto bg-dark-950/80 backdrop-blur-md cursor-pointer"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto max-h-[88vh] flex flex-col cursor-default"
        >
          {/* Header Bar */}
          <div className="p-5 sm:p-6 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between bg-cream-100/50 dark:bg-dark-950/50">
            <div>
              <span className="text-xs font-mono font-extrabold text-azure-600 dark:text-cyan-400 uppercase tracking-widest block">
                {project.subtitle}
              </span>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-dark-900 dark:text-white mt-1">
                {project.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-dark-800 text-dark-800 dark:text-slate-200 hover:text-azure-600 hover:bg-slate-200 dark:hover:bg-dark-700 transition-all touch-manipulation active:scale-95 shadow-sm"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
            <div>
              <h4 className="text-xs font-mono font-bold text-azure-600 dark:text-cyan-400 uppercase tracking-wider mb-2">
                Architecture Specification
              </h4>
              <p className="text-sm sm:text-base text-dark-800 dark:text-cream-300/90 leading-relaxed font-body">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h4 className="text-xs font-mono font-bold text-azure-600 dark:text-cyan-400 uppercase tracking-wider mb-3">
                  Key Technical Highlights
                </h4>
                <div className="space-y-2">
                  {project.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-dark-800 dark:text-slate-200 font-body">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Terraform HCL Code Snippet Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-dark-950 border border-azure-500/30 text-slate-200 font-mono text-xs shadow-inner relative">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
                  <Terminal className="w-4 h-4 text-azure-400" />
                  <span>Production Terraform HCL Spec</span>
                </span>
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1 rounded-lg bg-dark-900 border border-slate-800 hover:border-cyan-400 text-slate-300 text-[11px] flex items-center gap-1.5 transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? "Copied HCL" : "Copy Code"}</span>
                </button>
              </div>
              <pre className="text-[11px] leading-relaxed overflow-x-auto text-cyan-100 no-scrollbar">
                {codeSnippet}
              </pre>
            </div>

            {/* Tags */}
            <div>
              <h4 className="text-xs font-mono font-bold text-azure-600 dark:text-cyan-400 uppercase tracking-wider mb-3">
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-semibold text-dark-800 dark:text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="p-4 sm:p-6 border-t border-slate-200/80 dark:border-slate-800/80 bg-cream-100/50 dark:bg-dark-950/50 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white font-extrabold text-xs font-heading shadow-azure-glow hover:scale-105 active:scale-95 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>View GitHub Repo</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-slate-200 dark:bg-dark-800 text-dark-900 dark:text-slate-200 text-xs font-bold font-heading hover:bg-slate-300 dark:hover:bg-dark-700 transition-colors"
            >
              Close Spec
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
