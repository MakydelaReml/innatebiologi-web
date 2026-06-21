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
        vein: "#17342b",
        
        // Brand palette updates
        bonewhite: "#FAFAF9",
        biogold: "#78634F",
        softgold: "#E7D8C1",
        graphite: "#2B2B2B",
        deepbiology: "#766C61",
        softmineral: "#F3EEE7",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        display: ["var(--font-cormorant)", "Cormorant Garamond", "serif"]
      },
      boxShadow: {
        aura: "0 0 80px rgba(154, 191, 139, 0.18)",
        gold: "0 0 50px rgba(120, 99, 79, 0.08)"
      },
      backgroundImage: {
        "radial-biology":
          "radial-gradient(circle at 50% 20%, rgba(231,216,193,0.15), transparent 30%), radial-gradient(circle at 18% 64%, rgba(120,99,79,0.06), transparent 32%), radial-gradient(circle at 78% 56%, rgba(118,108,97,0.05), transparent 30%)"
      }
    }
  },
  plugins: []
};

export default config;
