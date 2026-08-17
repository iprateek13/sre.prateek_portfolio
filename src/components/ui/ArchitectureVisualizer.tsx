"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Server, Lock, Cpu, Network, ArrowRightLeft, Layers, Terminal, CheckCircle2 } from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  type: string;
  ipRange: string;
  status: string;
  description: string;
  terraformSnippet: string;
}

export function ArchitectureVisualizer() {
  const [selectedNode, setSelectedNode] = useState<string>("hub-fw");

  const nodes: Record<string, NodeData> = {
    "hub-fw": {
      id: "hub-fw",
      name: "Azure Firewall & Bastion (Hub)",
      type: "Central Hub Security Gateway",
      ipRange: "10.0.0.0/24",
      status: "Healthy (0 Threat Alerts)",
      description: "Centralized threat detection, IDPS inspection, and secure SSH/RDP Bastion tunnel.",
      terraformSnippet: `module "hub_firewall" {\n  source         = "./modules/azure_firewall"\n  resource_group = module.resource_group.name\n  sku_tier       = "Standard"\n  subnet_id      = module.hub_vnet.subnets["AzureFirewallSubnet"].id\n}`,
    },
    "spoke1-aks": {
      id: "spoke1-aks",
      name: "Spoke 1: Microservices (AKS Cluster)",
      type: "Kubernetes Compute Spoke",
      ipRange: "10.1.0.0/16",
      status: "3/3 Pod Replicas Active",
      description: "Autoscaling containerized SRE microservices connected via VNet Peering to Hub Firewall.",
      terraformSnippet: `module "spoke1_vnet" {\n  source       = "./modules/vnet_spoke"\n  vnet_name    = "vnet-spoke1-aks"\n  address_space = ["10.1.0.0/16"]\n  peering_hub  = module.hub_vnet.vnet_id\n}`,
    },
    "spoke2-sec": {
      id: "spoke2-sec",
      name: "Spoke 2: Key Vault & Azure SQL",
      type: "Encrypted Data Spoke",
      ipRange: "10.2.0.0/16",
      status: "Private Link Secured",
      description: "Isolated storage and Key Vault secrets accessible strictly through Private Endpoints.",
      terraformSnippet: `module "spoke2_keyvault" {\n  source                 = "./modules/key_vault"\n  enable_private_endpoint = true\n  allowed_subnet_ids      = [module.spoke1_vnet.subnets["aks-subnet"].id]\n}`,
    },
  };

  const node = nodes[selectedNode];

  return (
    <div className="rounded-3xl bg-dark-900/90 border border-azure-500/30 p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-azure-500/10 border border-azure-500/30 text-azure-400 text-xs font-mono mb-1">
            <Network className="w-3.5 h-3.5 text-cyan-400" />
            <span>Multi-Cloud IaC Topology</span>
          </div>
          <h3 className="text-lg font-heading font-bold text-white">Hub-and-Spoke Architecture Visualizer</h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>SLA: 99.99% Operational</span>
        </div>
      </div>

      {/* Interactive Topology Diagram */}
      <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Animated Packet Flow SVG Background */}
        <div className="absolute inset-0 pointer-events-none hidden md:flex items-center justify-center opacity-30">
          <svg className="w-full h-20" xmlns="http://www.w3.org/2000/svg">
            <line x1="15%" y1="50%" x2="85%" y2="50%" stroke="#06b6d4" strokeWidth="2" strokeDasharray="6 6" />
          </svg>
        </div>

        {/* Node 1: Hub VNet */}
        <button
          onClick={() => setSelectedNode("hub-fw")}
          className={`p-5 rounded-2xl border text-left transition-all duration-300 relative group ${
            selectedNode === "hub-fw"
              ? "bg-azure-500/20 border-azure-400 shadow-azure-glow scale-105"
              : "bg-dark-800/80 border-slate-800 hover:border-azure-500/50 hover:bg-dark-800"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-azure-500/20 text-azure-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-azure-500/20 text-azure-300">HUB VNET</span>
          </div>
          <h4 className="font-heading font-bold text-sm text-white mb-1">Azure Firewall Hub</h4>
          <p className="text-xs text-slate-400 font-mono mb-2">10.0.0.0/24</p>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>IDPS Enforced</span>
          </div>
        </button>

        {/* Node 2: Spoke 1 */}
        <button
          onClick={() => setSelectedNode("spoke1-aks")}
          className={`p-5 rounded-2xl border text-left transition-all duration-300 relative group ${
            selectedNode === "spoke1-aks"
              ? "bg-cyan-500/20 border-cyan-400 shadow-cyan-glow scale-105"
              : "bg-dark-800/80 border-slate-800 hover:border-cyan-500/50 hover:bg-dark-800"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Server className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">SPOKE 1</span>
          </div>
          <h4 className="font-heading font-bold text-sm text-white mb-1">AKS Microservices</h4>
          <p className="text-xs text-slate-400 font-mono mb-2">10.1.0.0/16</p>
          <div className="flex items-center gap-1.5 text-[11px] text-cyan-400 font-mono">
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>VNet Peering Active</span>
          </div>
        </button>

        {/* Node 3: Spoke 2 */}
        <button
          onClick={() => setSelectedNode("spoke2-sec")}
          className={`p-5 rounded-2xl border text-left transition-all duration-300 relative group ${
            selectedNode === "spoke2-sec"
              ? "bg-emerald-500/20 border-emerald-400 shadow-emerald-glow scale-105"
              : "bg-dark-800/80 border-slate-800 hover:border-emerald-500/50 hover:bg-dark-800"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">SPOKE 2</span>
          </div>
          <h4 className="font-heading font-bold text-sm text-white mb-1">Key Vault & Private Link</h4>
          <p className="text-xs text-slate-400 font-mono mb-2">10.2.0.0/16</p>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero Public IPs</span>
          </div>
        </button>
      </div>

      {/* Selected Node Details & Terraform Preview */}
      <AnimatePresence mode="wait">
        <motion.div
          key={node.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-5 rounded-2xl bg-dark-950 border border-slate-800"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <h4 className="font-heading font-bold text-base text-azure-300">{node.name}</h4>
              <p className="text-xs text-slate-400">{node.description}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono shrink-0">
              {node.status}
            </span>
          </div>

          {/* Terraform Code Snippet Preview */}
          <div className="mt-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-azure-400" />
                <span>Terraform Module Spec:</span>
              </span>
              <span className="text-[10px] font-mono text-cyan-400">main.tf</span>
            </div>
            <pre className="p-3.5 rounded-xl bg-dark-900 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
              <code>{node.terraformSnippet}</code>
            </pre>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
