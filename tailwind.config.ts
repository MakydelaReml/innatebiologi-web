import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#030504",
        obsidian: "#07100d",
        moss: "#9abf8b",
        aureate: "#d7c48f",
        lymph: "#d9fff0",
        vein: "#17342b"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-cormorant)", "Cormorant Garamond", "serif"]
      },
      boxShadow: {
        aura: "0 0 80px rgba(154, 191, 139, 0.18)",
        gold: "0 0 50px rgba(215, 196, 143, 0.16)"
      },
      backgroundImage: {
        "radial-biology":
          "radial-gradient(circle at 50% 20%, rgba(217,255,240,0.16), transparent 28%), radial-gradient(circle at 18% 64%, rgba(154,191,139,0.12), transparent 31%), radial-gradient(circle at 78% 56%, rgba(215,196,143,0.11), transparent 28%)"
      }
    }
  },
  plugins: []
};

export default config;
