import { columnColorData, priorityColorData } from "./src/lib/theme-colors.js";

const columnColors = Object.fromEntries(columnColorData.map((c) => [c.id, c.hex]));
const priorityColors = Object.fromEntries(priorityColorData.map((p) => [p.id, p.hex]));

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        button: "rgb(var(--button) / <alpha-value>)",
        input: "var(--input)",
        "input-background": "var(--input-background)",
        placeholder: "var(--placeholder)",
        ring: "var(--ring)",
        column: columnColors,
        priority: priorityColors,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        xxs: "var(--text-xxs)",
        xs: "var(--text-xs)",
        sm: "var(--text-sm)",
        md: "var(--text-md)",
        lg: "var(--text-lg)",
        xl: "var(--text-xl)",
        "smmd": "var(--text-sm-md)",
        "display-xxs": "var(--text-display-xxs)",
        "display-xs": "var(--text-display-xs)",
        "display-sm": "var(--text-display-sm)",
        "display-md": "var(--text-display-md)",
        "display-lg": "var(--text-display-lg)",
        "display-xl": "var(--text-display-xl)",
        "display-2xl": "var(--text-display-2xl)",
      },
    },
  },
  plugins: [],
};