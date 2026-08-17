"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/content";
import { 
  Mail, Send, CheckCircle2, Copy, Check, MessageSquare, 
  MapPin, Sparkles, ShieldCheck, Clock 
} from "lucide-react";
import confetti from "canvas-confetti";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatusMessage({
          type: "success",
          text: "Message received! Thank you for reaching out.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
        });
      } else {
        setStatusMessage({
          type: "error",
          text: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: "Network error. Please try sending again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-32 relative overflow-hidden bg-mesh-gradient">
      {/* Background Radial Halos */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-azure-500/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-azure-500/10 border border-azure-500/30 text-azure-600 dark:text-cyan-300 text-xs font-mono mb-4 shadow-sm">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-dark-900 dark:text-white tracking-tight mb-4">
            Let's Build Resilient <span className="text-gradient-sre">Cloud Infrastructure</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-body">
            Open for Site Reliability Engineering (SRE), Multi-Cloud Architecture, and DevSecOps opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info & Quick Copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Contact Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-dark-900/90 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="p-3 rounded-2xl bg-azure-500/10 text-azure-500 border border-azure-500/20">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-dark-900 dark:text-white">Direct Communication</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Fast Response within 24h</p>
                </div>
              </div>

              {/* Email Copy Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="text-xs font-mono text-slate-400">Direct Email Address</div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs sm:text-sm font-bold text-azure-500 truncate">
                    {portfolioData.email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-xl bg-white dark:bg-dark-850 border border-slate-200 dark:border-slate-800 hover:border-azure-500 text-xs font-mono text-slate-700 dark:text-slate-300 transition-all flex items-center gap-1.5 shrink-0"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-azure-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Status Badges */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300 font-mono">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>Available for immediate SRE & DevOps onboarding</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300 font-mono">
                  <div className="p-1.5 rounded-lg bg-azure-500/10 text-azure-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>Encrypted message storage in MongoDB Atlas</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-white/90 dark:bg-dark-900/90 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 text-sm text-dark-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-azure-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 text-sm text-dark-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-azure-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Subject / Inquiry Type
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. SRE Role Opportunity / Infrastructure Consulting"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 text-sm text-dark-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-azure-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, team, or infrastructure requirements..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 text-sm text-dark-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-azure-500 transition-colors resize-none"
                />
              </div>

              {statusMessage && (
                <div
                  className={`p-4 rounded-2xl text-xs font-mono flex items-center gap-2 ${
                    statusMessage.type === "success"
                      ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                      : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white font-heading font-extrabold text-sm shadow-azure-glow hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message to Prateek</span>
                    <Send className="w-4 h-4" />
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
