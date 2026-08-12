import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // TakeUForward (TUF) Style Deep Obsidian Void Base
        dark: {
          950: "#05070C",
          900: "#0B0F19",
          850: "#141A29",
          800: "#1E293B",
          700: "#334155",
        },
        // Deep Azure Cloud Blue Accent
        azure: {
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0284C7",
          600: "#0369A1",
          glow: "rgba(2, 132, 199, 0.45)",
        },
        // Cyan Neon Accent
        cyan: {
          300: "#67E8F9",
          400: "#22D3EE",
          500: "#06B6D4",
          glow: "rgba(34, 211, 238, 0.45)",
        },
        // Emerald Mint SRE Uptime Accent
        emerald: {
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          glow: "rgba(16, 185, 129, 0.45)",
        },
        // Rich Crimson Accent
        crimson: {
          300: "#FDA4AF",
          400: "#F43F5E",
          500: "#910F3F",
          600: "#911A1D",
          glow: "rgba(145, 15, 63, 0.45)",
        },
        // Soft Creamy Ivory Text & Light Surfaces (Preserved 100%)
        cream: {
          100: "#FFFDF5",
          200: "#FAF9E1",
          300: "#F2EFDD",
          400: "#E9D6B6",
        },
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "azure-glow": "0 0 25px rgba(2, 132, 199, 0.35)",
        "cyan-glow": "0 0 25px rgba(34, 211, 238, 0.35)",
        "emerald-glow": "0 0 25px rgba(16, 185, 129, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
