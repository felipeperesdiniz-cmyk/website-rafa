import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#F2F0EA",
        muted: "#B0AAA2",
        surface: "#0E0E0E",
        border: "#1A1A1A",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      spacing: {
        section: "clamp(6rem, 15vh, 12rem)",
      },
    },
  },
  plugins: [],
};

export default config;
