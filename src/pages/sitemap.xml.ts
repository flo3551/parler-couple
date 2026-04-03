/**
 * Dynamic sitemap fallback.
 * The @astrojs/sitemap integration generates sitemap-index.xml automatically
 * from all static pages during build.
 *
 * This endpoint provides a redirect to the generated sitemap for bots
 * that land on /sitemap.xml (common convention).
 *
 * For production, @astrojs/sitemap is the primary mechanism (configured in astro.config.mjs).
 * This file handles the /sitemap.xml → /sitemap-index.xml redirect.
 */

import type { APIRoute } from "astro";
import { site } from "../../site.config.ts";

export const GET: APIRoute = ({ url }) => {
  // During dev or if @astrojs/sitemap hasn't built yet,
  // return a minimal sitemap pointing to the domain root.
  const now = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${site.domain}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    ${site.lang !== "en" ? `<xhtml:link rel="alternate" hreflang="${site.lang}" href="${site.domain}/"/>` : ""}
  </url>
  <url>
    <loc>${site.domain}/blog</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "noindex",
    },
  });
};
