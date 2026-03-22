import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#7C3AED",
          foreground: "#FFFFFF",
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
        navy: {
          DEFAULT: "#09090B",
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#27272A",
          800: "#18181B",
          900: "#09090B",
          950: "#030305",
        },
        accent: {
          purple: "#8B5CF6",
          indigo: "#6366F1",
          cyan: "#06B6D4",
          green: "#10B981",
          amber: "#F59E0B",
          red: "#EF4444",
          pink: "#EC4899",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "2xs": ["0.65rem", "1rem"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.4s ease-out",
        "pulse-slow": "pulse 3s infinite",
        "gradient": "gradient 8s ease infinite",
        "spin-slow": "spin 8s linear infinite",
        "bounce-gentle": "bounceGentle 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glow: {
          "from": { boxShadow: "0 0 20px rgba(139,92,246,0.4)" },
          "to": { boxShadow: "0 0 40px rgba(139,92,246,0.8)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, #09090B 0%, #0D0B1E 50%, #09090B 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(99,102,241,0.08) 100%)",
        "violet-gradient": "linear-gradient(135deg, #7C3AED, #6366F1)",
        "cyan-gradient": "linear-gradient(135deg, #06B6D4, #0EA5E9)",
        "green-gradient": "linear-gradient(135deg, #10B981, #059669)",
        "amber-gradient": "linear-gradient(135deg, #F59E0B, #D97706)",
        "pink-gradient": "linear-gradient(135deg, #EC4899, #DB2777)",
        "rose-gradient": "linear-gradient(135deg, #F43F5E, #E11D48)",
        "indigo-gradient": "linear-gradient(135deg, #6366F1, #4F46E5)",
        "teal-gradient": "linear-gradient(135deg, #14B8A6, #0D9488)",
        "orange-gradient": "linear-gradient(135deg, #F97316, #EA580C)",
      },
      boxShadow: {
        "glow-violet": "0 0 24px rgba(124,58,237,0.4)",
        "glow-cyan": "0 0 24px rgba(6,182,212,0.3)",
        "glow-green": "0 0 24px rgba(16,185,129,0.3)",
        "card": "0 4px 24px rgba(0,0,0,0.3)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,92,246,0.2)",
        "inner-glow": "inset 0 1px 0 rgba(255,255,255,0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
