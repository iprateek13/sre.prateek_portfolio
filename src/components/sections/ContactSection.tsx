"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/content";
import { TiltCard } from "@/components/ui/TiltCard";
import confetti from "canvas-confetti";
import {
  Mail,
  Send,
  Github,
  Linkedin,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Sparkles,
  MapPin,
  ShieldCheck,
  Activity,
} from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({ type: "success", message: data.message || "Message sent successfully!" });
        setFormData({ name: "", email: "", message: "" });

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#0284C7", "#22D3EE", "#10B981"],
        });
      } else {
        setStatus({ type: "error", message: data.error || "Failed to send message. Please try again." });
      }
    } catch (err) {
      setStatus({ type: "error", message: "Network error occurred. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-cream-100 dark:bg-dark-950 text-dark-900 dark:text-cream-300">
      {/* Ambient Azure Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-azure-glow opacity-50 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-azure-500/10 dark:bg-azure-500/20 border border-azure-500/30 text-azure-600 dark:text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3 shadow-md"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>Get In Touch</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-dark-900 dark:text-white mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-azure-600 via-cyan-500 to-emerald-500 dark:from-azure-300 dark:via-cyan-300 dark:to-emerald-300">
              Let&apos;s Build Resilient Cloud Systems
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-800/90 dark:text-cream-300/90 text-base sm:text-lg"
          >
            Looking for an SRE, DevOps, or DevSecOps engineer to automate your Azure cloud infrastructure? Drop a message below!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Availability & Direct Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Availability Box */}
            <TiltCard className="p-7 rounded-3xl bg-gradient-to-br from-white via-cream-100 to-azure-50/50 dark:from-dark-900 dark:via-dark-900 dark:to-azure-950/40 border border-azure-500/40 backdrop-blur-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600 dark:bg-emerald-400" />
                </span>
                <span className="font-heading font-bold text-xs text-azure-600 dark:text-cyan-300 uppercase tracking-wider">
                  SRE / DevOps Hiring Status
                </span>
              </div>
              <h3 className="font-heading font-bold text-xl text-dark-900 dark:text-white mb-2">
                Open for SRE & DevOps Roles
              </h3>
              <p className="text-sm text-dark-800/90 dark:text-cream-300/90 font-body leading-relaxed">
                Available for internships, full-time engineering roles, and cloud automation projects.
              </p>
            </TiltCard>

            {/* Direct Contact Cards */}
            <div className="p-7 rounded-3xl bg-white/90 dark:bg-dark-900 border border-slate-200 dark:border-slate-800 backdrop-blur-2xl space-y-6 shadow-xl">
              <a
                href={`mailto:${portfolioData.email}`}
                className="flex items-center gap-4 group p-3.5 rounded-2xl hover:bg-cream-200/50 dark:hover:bg-dark-850 transition-colors"
              >
                <div className="p-3.5 rounded-2xl bg-azure-500/10 text-azure-500 dark:text-cyan-400 border border-azure-500/30 group-hover:scale-110 transition-transform shadow-md">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">SRE Contact Email</span>
                  <span className="font-heading font-bold text-dark-900 dark:text-white group-hover:text-azure-600 dark:group-hover:text-cyan-300 transition-colors">
                    sre.prateek@gmail.com
                  </span>
                </div>
              </a>

              <a
                href={portfolioData.socials.find((s) => s.platform === "GitHub")?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group p-3.5 rounded-2xl hover:bg-cream-200/50 dark:hover:bg-dark-850 transition-colors"
              >
                <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 group-hover:scale-110 transition-transform shadow-md">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">GitHub Infrastructure Repos</span>
                  <span className="font-heading font-bold text-dark-900 dark:text-white group-hover:text-azure-600 dark:group-hover:text-cyan-300 transition-colors">
                    github.com/iprateek13
                  </span>
                </div>
              </a>

              <a
                href={portfolioData.socials.find((s) => s.platform === "LinkedIn")?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group p-3.5 rounded-2xl hover:bg-cream-200/50 dark:hover:bg-dark-850 transition-colors"
              >
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 group-hover:scale-110 transition-transform shadow-md">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">LinkedIn Profile</span>
                  <span className="font-heading font-bold text-dark-900 dark:text-white group-hover:text-azure-600 dark:group-hover:text-cyan-300 transition-colors">
                    linkedin.com/in/iprateekgupta13
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-3.5 rounded-2xl">
                <div className="p-3.5 rounded-2xl bg-azure-500/10 text-azure-500 dark:text-cyan-300 border border-azure-500/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">Location</span>
                  <span className="font-heading font-bold text-dark-900 dark:text-white">India</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-3xl bg-white/90 dark:bg-dark-900 border border-azure-500/30 dark:border-cyan-400/30 backdrop-blur-2xl shadow-xl space-y-6"
            >
              <h3 className="font-heading font-bold text-2xl text-dark-900 dark:text-white mb-2">Send an Infrastructure Inquiry</h3>

              {status && (
                <div
                  className={`p-4 rounded-2xl text-sm font-medium flex items-center gap-3 ${
                    status.type === "success"
                      ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                      : "bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-xs font-mono text-dark-900 dark:text-cream-300 uppercase tracking-wider mb-2 font-bold">
                  Your Name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Engineering Lead"
                  className="w-full px-4 py-3.5 rounded-2xl bg-cream-100/80 dark:bg-dark-950 border border-slate-300 dark:border-slate-800 text-dark-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-azure-500 focus:ring-1 focus:ring-azure-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono text-dark-900 dark:text-cream-300 uppercase tracking-wider mb-2 font-bold">
                  Your Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3.5 rounded-2xl bg-cream-100/80 dark:bg-dark-950 border border-slate-300 dark:border-slate-800 text-dark-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-azure-500 focus:ring-1 focus:ring-azure-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-dark-900 dark:text-cream-300 uppercase tracking-wider mb-2 font-bold">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Discuss cloud architecture, SRE uptime targets, or DevSecOps automation..."
                  className="w-full px-4 py-3.5 rounded-2xl bg-cream-100/80 dark:bg-dark-950 border border-slate-300 dark:border-slate-800 text-dark-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-azure-500 focus:ring-1 focus:ring-azure-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white dark:text-dark-950 font-heading font-extrabold text-base shadow-azure-glow hover:scale-[1.01] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white dark:border-dark-950 border-t-transparent rounded-full animate-spin" />
                    <span>Sending message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to sre.prateek@gmail.com</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
