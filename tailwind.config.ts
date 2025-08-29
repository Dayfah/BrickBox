import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bbxRed: "#E0474C",
        bbxCream: "#f5f5f5",
        bbxDark: "#1f1f1f",
      },
    },
  },
  plugins: [],
};

export default config;
