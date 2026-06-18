import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D0D0C",
        stark: "#FFFFFF",
        accent: "#E53E3E",
        muted: "#1A1A19",
        borderDark: "#262624",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "slide-in": "slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%) scale(0.9)", opacity: "0" },
          "100%": { transform: "translateX(0) scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
