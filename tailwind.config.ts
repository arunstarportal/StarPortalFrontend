import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        card: "#141414",
        borderColor: "#80808080",
        borderlight: "#374151b3",
        defaultText: "#d1d5db",
        defaultBackground: "#111111",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
