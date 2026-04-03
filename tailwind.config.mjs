import { site } from "./site.config.ts";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: site.colors.primary,
          50: "color-mix(in srgb, var(--color-primary) 10%, white)",
          100: "color-mix(in srgb, var(--color-primary) 20%, white)",
          200: "color-mix(in srgb, var(--color-primary) 40%, white)",
          300: "color-mix(in srgb, var(--color-primary) 60%, white)",
          400: "color-mix(in srgb, var(--color-primary) 80%, white)",
          500: site.colors.primary,
          600: "color-mix(in srgb, var(--color-primary) 80%, black)",
          700: "color-mix(in srgb, var(--color-primary) 60%, black)",
          800: "color-mix(in srgb, var(--color-primary) 40%, black)",
          900: "color-mix(in srgb, var(--color-primary) 20%, black)",
        },
        accent: {
          DEFAULT: site.colors.accent,
          500: site.colors.accent,
        },
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
