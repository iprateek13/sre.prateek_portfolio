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
    return <div className="w-9 h-9 rounded-full bg-cream-200 dark:bg-dark-800 border border-azure-500/20" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative p-2.5 rounded-full bg-white/80 dark:bg-dark-900/80 border border-slate-200/80 dark:border-slate-800/80 text-dark-900 dark:text-cream-200 hover:text-azure-600 focus:outline-none touch-manipulation active:scale-90 transition-all duration-300 flex items-center justify-center overflow-hidden"
      aria-label="Toggle theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
        }}
        transition={{
          duration: 0.25,
          ease: [0.16, 1, 0.3, 1], // Apple 60fps Liquid Curve (Same as Hamburger button)
        }}
        className="flex items-center justify-center"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
            >
              <Sun className="w-5 h-5 text-cyan-300" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
            >
              <Moon className="w-5 h-5 text-azure-600" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}
