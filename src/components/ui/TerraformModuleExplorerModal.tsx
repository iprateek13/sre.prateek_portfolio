"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Boxes, ShieldCheck, Code, Layers, Check, Copy, Terminal } from "lucide-react";

interface TerraformModuleExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ModuleInfo {
  name: string;
  category: "Azure" | "AWS" | "DevSecOps";
  description: string;
  variables: string[];
  codeSnippet: string;
}

export function TerraformModuleExplorerModal({ isOpen, onClose }: TerraformModuleExplorerModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  const modules: ModuleInfo[] = [
    {
      name: "azurerm_virtual_network_hub",
      category: "Azure",
      description: "Hub VNet topology containing Azure Firewall, Bastion, and GatewaySubnet.",
      variables: ["vnet_name", "address_space", "dns_servers", "tags"],
      codeSnippet: `module "hub_vnet" {\n  source         = "./modules/azure_vnet_hub"\n  vnet_name      = "vnet-hub-prod"\n  address_space  = ["10.0.0.0/16"]\n  location       = "East US"\n}`,
    },
    {
      name: "azurerm_vnet_peering_bidirectional",
      category: "Azure",
      description: "Automated bidirectional VNet peering between Hub and Spoke networks with transit gateway enabled.",
      variables: ["hub_vnet_id", "spoke_vnet_id", "allow_forwarded_traffic"],
      codeSnippet: `module "vnet_peering" {\n  source                  = "./modules/vnet_peering"\n  hub_vnet_id             = module.hub_vnet.id\n  spoke_vnet_id           = module.spoke_vnet.id\n  allow_gateway_transit   = true\n}`,
    },
    {
      name: "azurerm_firewall_premium",
      category: "Azure",
      description: "Next-Gen Firewall module with Threat Intelligence, TLS inspection, and IDPS rules.",
      variables: ["firewall_name", "subnet_id", "public_ip_id", "firewall_policy_id"],
      codeSnippet: `module "azure_firewall" {\n  source       = "./modules/azure_firewall"\n  sku_tier     = "Premium"\n  subnet_id    = module.hub_vnet.subnets["AzureFirewallSubnet"].id\n}`,
    },
    {
      name: "azurerm_key_vault_private",
      category: "Azure",
      description: "Enterprise Key Vault with Private Endpoint, soft-delete, and RBAC authorization.",
      variables: ["vault_name", "sku_name", "purge_protection_enabled", "network_acls"],
      codeSnippet: `module "key_vault" {\n  source            = "./modules/key_vault"\n  name              = "kv-sre-prod-001"\n  enable_rbac_auth  = true\n  private_endpoint  = true\n}`,
    },
    {
      name: "aws_vpc_multi_az",
      category: "AWS",
      description: "Multi-AZ AWS VPC with Public/Private subnets, NAT Gateways, and Route Tables.",
      variables: ["vpc_cidr", "availability_zones", "enable_nat_gateway"],
      codeSnippet: `module "aws_vpc" {\n  source              = "./modules/aws_vpc"\n  cidr_block          = "172.16.0.0/16"\n  enable_nat_gateway  = true\n  single_nat_gateway  = false\n}`,
    },
    {
      name: "azurerm_nsg_dynamic_rules",
      category: "Azure",
      description: "Parameterized NSG module processing dynamic block rules via map(object(...)) schemas.",
      variables: ["nsg_name", "security_rules_map"],
      codeSnippet: `module "nsg_rules" {\n  source         = "./modules/nsg_dynamic"\n  security_rules = var.custom_nsg_rules_map\n}`,
    },
  ];

  const filteredModules = activeCategory === "All" ? modules : modules.filter((m) => m.category === activeCategory);

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md cursor-pointer"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl bg-dark-900 border border-azure-500/30 shadow-2xl backdrop-blur-2xl flex flex-col cursor-default"
          >
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 mr-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block shadow-sm"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block shadow-sm"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block shadow-sm"></span>
              </div>
              <div className="p-3 rounded-2xl bg-azure-500/20 text-azure-400">
                <Boxes className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-white">15+ Terraform Child Modules Library</h3>
                <p className="text-xs text-slate-400 font-mono">
                  Modular, enterprise-grade Infrastructure as Code modules built by Prateek Gupta
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Pills */}
          <div className="px-6 py-3 border-b border-slate-800/60 bg-dark-950/50 flex items-center gap-2">
            {["All", "Azure", "AWS", "DevSecOps"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-azure-500 text-white shadow-azure-glow"
                    : "bg-dark-800 text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Module List Body */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            {filteredModules.map((mod, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-dark-850 border border-slate-800 hover:border-azure-500/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-heading font-bold text-azure-300 font-mono">{mod.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                      {mod.category}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(mod.codeSnippet, idx)}
                    className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-dark-900 border border-slate-700 hover:border-azure-400 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-azure-400" />
                        <span>Copy Spec</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-300 mb-3">{mod.description}</p>

                {/* Code Box */}
                <pre className="p-3.5 rounded-xl bg-dark-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
                  <code>{mod.codeSnippet}</code>
                </pre>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 bg-dark-950 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Verified 15+ Modular Architecture</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-azure-500 text-white font-semibold hover:bg-azure-600 transition-colors"
            >
              Close Explorer
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
  );
}
