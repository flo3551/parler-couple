import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import { site } from "./site.config.ts";

export default defineConfig({
  site: site.domain || "https://parler-couple.vercel.app",
  // Hybrid mode: most pages are static, API routes use server-side rendering
  output: "hybrid",
  adapter: node({ mode: "standalone" }),
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
