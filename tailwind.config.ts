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
        // Deep Obsidian Slate Void Base
        dark: {
          950: "#07090E",
          900: "#0F172A",
          850: "#1E293B",
          800: "#334155",
          700: "#475569",
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
        // Soft Creamy Ivory Text & Light Surfaces
        cream: {
          100: "#FFFDF5",
          200: "#FAF9E1",
          300: "#F2EFDD",
          400: "#E9D6B6",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "azure-glow": "radial-gradient(circle at center, rgba(2, 132, 199, 0.25) 0%, rgba(16, 185, 129, 0.2) 50%, transparent 85%)",
        "azure-cyan-gradient": "linear-gradient(135deg, #0284C7 0%, #22D3EE 50%, #10B981 100%)",
        "mesh-pattern": "radial-gradient(rgba(15, 23, 42, 0.08) 1px, transparent 1px)",
      },
      boxShadow: {
        "azure-glow": "0 0 35px -5px rgba(2, 132, 199, 0.45)",
        "cyan-glow": "0 0 35px -5px rgba(34, 211, 238, 0.45)",
        "emerald-glow": "0 0 35px -5px rgba(16, 185, 129, 0.45)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.65)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-x": "gradient-x 6s ease infinite",
        "shimmer": "shimmer 2.5s infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
