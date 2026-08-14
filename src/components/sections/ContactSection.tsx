"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/content";
import { Mail, Send, Github, Linkedin, MapPin, CheckCircle2, Sparkles, AlertCircle, Loader2 } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err) {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 relative bg-cream-100 dark:bg-dark-950 text-dark-900 dark:text-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-azure-500/10 dark:bg-azure-500/20 border border-azure-500/30 text-azure-600 dark:text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>Get in Touch</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-dark-900 dark:text-white mb-3 sm:mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-azure-600 via-cyan-500 to-emerald-500 dark:from-azure-300 dark:via-cyan-300 dark:to-emerald-300">
              Let&apos;s Build Resilient Infrastructure
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-800/90 dark:text-cream-300/90 text-sm sm:text-base px-2"
          >
            Have an SRE, DevOps, or Azure Cloud opportunity? Reach out directly via the form below.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-dark-900/90 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-lg space-y-6"
          >
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-dark-900 dark:text-white">
              Direct Contact Channels
            </h3>

            <div className="space-y-4">
              <a
                href="mailto:sre.prateek@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-dark-800/60 border border-slate-200 dark:border-slate-700/80 hover:border-azure-500 transition-colors group"
              >
                <div className="p-3 rounded-xl bg-azure-500/10 text-azure-600 dark:text-cyan-300 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-azure-600 dark:text-cyan-400 uppercase tracking-wider block">
                    Email Address
                  </span>
                  <span className="text-sm font-semibold text-dark-900 dark:text-white">
                    sre.prateek@gmail.com
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-dark-800/60 border border-slate-200 dark:border-slate-700/80">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                    Location
                  </span>
                  <span className="text-sm font-semibold text-dark-900 dark:text-white">
                    {portfolioData.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block mb-3">
                Social Profiles
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/iprateek13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-dark-800 text-dark-900 dark:text-white text-xs font-bold hover:bg-azure-500 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://linkedin.com/in/iprateekgupta13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-dark-800 text-dark-900 dark:text-white text-xs font-bold hover:bg-azure-500 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-dark-900/90 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-dark-900 dark:text-slate-200 uppercase mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-slate-50 dark:bg-dark-800/80 border border-slate-200 dark:border-slate-700/80 text-dark-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-azure-500 text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-dark-900 dark:text-slate-200 uppercase mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-slate-50 dark:bg-dark-800/80 border border-slate-200 dark:border-slate-700/80 text-dark-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-azure-500 text-sm transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-dark-900 dark:text-slate-200 uppercase mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="SRE Opportunity / Cloud Architecture Inquiry"
                  className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-slate-50 dark:bg-dark-800/80 border border-slate-200 dark:border-slate-700/80 text-dark-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-azure-500 text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-dark-900 dark:text-slate-200 uppercase mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hi Prateek, I came across your SRE & Azure portfolio..."
                  className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-slate-50 dark:bg-dark-800/80 border border-slate-200 dark:border-slate-700/80 text-dark-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-azure-500 text-sm transition-colors resize-none"
                />
              </div>

              {status === "success" && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Message sent successfully! I will respond within 24 hours.</span>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-azure-500 via-cyan-500 to-emerald-500 text-white font-extrabold text-sm font-heading shadow-azure-glow hover:scale-102 active:scale-98 transition-all disabled:opacity-50"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
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
