"use client";

import React from "react";
import { motion } from "framer-motion";

export function MotionBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated Digital Infrastructure Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-40 dark:opacity-30" />

      {/* Floating Ambient Wave Blobs */}
      <motion.div
        animate={{
          x: [0, 80, -60, 0],
          y: [0, -60, 80, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/5 w-[550px] h-[550px] bg-azure-500/12 dark:bg-azure-500/18 rounded-full blur-[150px]"
      />

      <motion.div
        animate={{
          x: [0, -90, 70, 0],
          y: [0, 70, -90, 0],
          scale: [1, 0.88, 1.18, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 right-1/5 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[150px]"
      />

      <motion.div
        animate={{
          x: [0, 60, -80, 0],
          y: [0, 80, -60, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[160px]"
      />
    </div>
  );
}
