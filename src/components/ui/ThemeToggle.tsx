"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
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
      className="relative p-2 rounded-full bg-white/90 dark:bg-dark-900/90 border border-azure-500/30 dark:border-cyan-400/30 text-azure-600 dark:text-cyan-300 hover:text-azure-500 dark:hover:text-cyan-200 transition-all duration-300 shadow-md hover:scale-105 group"
      aria-label="Toggle theme"
      title={isDark ? "Switch to Warm Creamy Light Mode" : "Switch to Deep Obsidian Dark Mode"}
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        {isDark ? (
          <Sun className="w-5 h-5 text-cyan-300 transition-all transform group-hover:rotate-45" />
        ) : (
          <Moon className="w-5 h-5 text-azure-600 transition-all transform group-hover:-rotate-12" />
        )}
      </div>
    </button>
  );
}
