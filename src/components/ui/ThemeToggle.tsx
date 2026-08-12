"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9.5 h-9.5 rounded-full bg-cream-200 dark:bg-dark-800 stroke-azure-500/20" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.08 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative p-2.5 rounded-full bg-white/90 dark:bg-dark-900/90 border border-azure-500/35 dark:border-cyan-400/35 text-azure-600 dark:text-cyan-300 focus:outline-none touch-manipulation shadow-md flex items-center justify-center overflow-hidden cursor-pointer group transform-gpu"
      aria-label="Toggle theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {/* Background Glow Ripple Aura */}
      <motion.div
        key={isDark ? "dark-glow" : "light-glow"}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 0.15 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`absolute inset-0 rounded-full ${
          isDark ? "bg-cyan-400" : "bg-azure-600"
        }`}
      />

      <div className="relative w-5 h-5 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ opacity: 0, scale: 0.4, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.4, rotate: 180 }}
              transition={{
                duration: 0.45,
                ease: [0.34, 1.56, 0.64, 1], // Liquid Apple Spring Bounce
              }}
              className="absolute flex items-center justify-center"
            >
              <Sun className="w-5 h-5 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ opacity: 0, scale: 0.4, rotate: 180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.4, rotate: -180 }}
              transition={{
                duration: 0.45,
                ease: [0.34, 1.56, 0.64, 1], // Liquid Apple Spring Bounce
              }}
              className="absolute flex items-center justify-center"
            >
              <Moon className="w-5 h-5 text-azure-600 drop-shadow-[0_0_8px_rgba(2,132,199,0.4)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
