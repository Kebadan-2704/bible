import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#061026",
          900: "#0B1F4B",
          850: "#0E285F",
          800: "#13357B",
          700: "#1E4C9F",
          100: "#E6EDF8",
          50: "#F0F4FA",
        },
        gold: {
          600: "#B8860B",
          500: "#D4A017",
          400: "#E5B834",
          300: "#F2C94C",
          200: "#F7DB80",
          100: "#FDF5DC",
          50: "#FFFDF5",
        },
        ivory: {
          DEFAULT: "#FAF7F0",
          50: "#FCFAF6",
          100: "#FAF7F0",
          200: "#F3EDE0",
          300: "#E8DEC9",
        },
        accent: {
          purple: "#5B2C83",
          green: "#1E6B3A",
          orange: "#C0561B",
          brown: "#7A4A1E",
          crimson: "#B3202A",
          teal: "#0D5C75",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(11, 31, 75, 0.08)",
        card: "0 8px 30px rgba(11, 31, 75, 0.06)",
        hover: "0 14px 35px rgba(11, 31, 75, 0.12)",
        gold: "0 4px 16px rgba(11, 31, 75, 0.12), 0 0 0 1px rgba(212, 160, 23, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
