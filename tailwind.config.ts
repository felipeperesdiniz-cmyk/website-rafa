import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "rgba(255,255,255,0.92)",
        muted: "rgba(255,255,255,0.45)",
        surface: "#111111",
        border: "rgba(255,255,255,0.1)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
      },
      spacing: {
        section: "clamp(6rem, 15vh, 12rem)",
      },
    },
  },
  plugins: [],
};

export default config;
