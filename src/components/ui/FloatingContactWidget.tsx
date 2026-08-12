"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, MessageSquare, X } from "lucide-react";

export function FloatingContactWidget() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 450);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Expanded Quick Contact Speed Dial Links */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="mb-3 p-3 rounded-2xl glass-mobile-drawer flex flex-col gap-2 shadow-2xl border border-azure-500/30 transform-gpu"
          >
            <a
              href="mailto:sre.prateek@gmail.com"
              onClick={() => setExpanded(false)}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-azure-500/15 text-azure-600 dark:text-cyan-300 hover:bg-azure-500/25 active:scale-98 transition-all text-xs font-bold font-heading whitespace-nowrap touch-manipulation"
            >
              <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Email: sre.prateek@gmail.com</span>
            </a>
            <a
              href="https://linkedin.com/in/iprateekgupta13"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setExpanded(false)}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 hover:bg-cyan-500/25 active:scale-98 transition-all text-xs font-bold font-heading whitespace-nowrap touch-manipulation"
            >
              <Linkedin className="w-4 h-4 text-azure-500 shrink-0" />
              <span>LinkedIn: iprateekgupta13</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speed Dial Button with 60fps Apple Liquid Icon Morphing */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="p-3.5 rounded-full bg-gradient-to-tr from-azure-600 via-cyan-500 to-emerald-500 text-white shadow-azure-glow hover:scale-108 active:scale-90 transition-all duration-300 flex items-center justify-center cursor-pointer overflow-hidden touch-manipulation"
        aria-label="Quick Contact Options"
        title="Reach Out to Prateek"
      >
        <motion.div
          initial={false}
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          <AnimatePresence mode="wait" initial={false}>
            {expanded ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.18, ease: "easeInOut" }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.18, ease: "easeInOut" }}
              >
                <MessageSquare className="w-5 h-5 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </button>
    </div>
  );
}
