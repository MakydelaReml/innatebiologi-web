import type { Config } from "tailwindcss";

// Paleta y tipografía alineadas al sistema hero-02 (cálido tierra).
// La página usa las clases portadas desde hero-02 (globals.css); estos
// tokens mantienen la marca consistente si se usa alguna utilidad.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#211d17",
        "ink-soft": "#3d352b",
        ivory: "#f7efe2",
        marfil: "#efe3d0",
        bone: "#e5d7c0",
        sand: "#d9c6aa",
        stone: "#c6b49c",
        taupe: "#9a8670",
        gold: "#a7937c",
        olive: "#4c563d",
        moss: "#303829"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
