import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bbxDark: "#0D0D0D",
        bbxRed: "#7A0B0B",
        bbxCream: "#ECE8E3"
      }
    }
  },
  plugins: []
};
export default config;
