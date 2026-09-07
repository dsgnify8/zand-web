import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        zand: {
          bg: "#FDFDFC",
          ink: "#171717",
          "ink-mid": "#3D3D3D",
          "ink-light": "#6B6B6B",
          pomegranate: "#8B1D2E",
          wine: "#5C1528",
          "wine-deep": "#3D0E1A",
          gold: "#B8924A",
          "gold-light": "#D4AD5E",
          "rose-mist": "#F9F0F0",
          "warm-white": "#F8F6F2",
          "cream-blush": "#FDF5F3",
        },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "heading-xl": ["clamp(2.6rem, 5.5vw, 3.8rem)", { lineHeight: "1.15" }],
        "heading-lg": ["2.6rem", { lineHeight: "1.15" }],
        "heading-md": ["1.75rem", { lineHeight: "1.25" }],
        "body-lg": ["1.1rem", { lineHeight: "1.8" }],
        "body": ["1rem", { lineHeight: "1.85" }],
        "small": ["0.82rem", { lineHeight: "1.6" }],
        "xs": ["0.72rem", { lineHeight: "1.5" }],
      },
    },
  },
  plugins: [],
};
export default config;
