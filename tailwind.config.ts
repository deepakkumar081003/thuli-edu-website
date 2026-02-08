import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6A0DAD",   // Purple
        secondary: "#F5F5F5", // Light grey
        accent: "#D4AF37",    // Gold
        dark: "#1F1F1F",
      },
    },
  },
  plugins: [],
};

export default config;
