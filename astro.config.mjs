import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { site } from "./site.config.ts";

export default defineConfig({
  site: site.domain || "https://parler-couple.vercel.app",
  output: "static",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
