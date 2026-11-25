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
          50: "#F0F4FA",
          100: "#E6EDF8",
          200: "#C5D4EE",
          300: "#9EB7E0",
          400: "#6F94D0",
          500: "#4472BC",
          600: "#2B5AA8",
          700: "#1E4C9F",
          800: "#13357B",
          850: "#0E285F",
          900: "#0B1F4B",
          950: "#061026",
        },
        gold: {
          50: "#FFFDF5",
          100: "#FDF5DC",
          200: "#F7DB80",
          300: "#F2C94C",
          400: "#E5B834",
          500: "#D4A017",
          600: "#8C6403", // >= 5.05:1 on ivory & >= 5.4:1 on white
          700: "#785402", // >= 6.4:1 on ivory & >= 6.8:1 on white
          800: "#634401", // >= 8.0:1 on ivory & >= 7.2:1 on gold-100
          900: "#4D3401", // >= 10.3:1
          950: "#362300", // >= 13.6:1
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
        sans: ["var(--font-inter)", "var(--font-tamil)", "system-ui", "sans-serif"],
        tamil: ["var(--font-tamil)", "var(--font-inter)", "system-ui", "sans-serif"],
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
