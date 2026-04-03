import type { APIRoute } from "astro";
import { site } from "../../site.config.ts";

export const GET: APIRoute = () => {
  const sitemapURL = `${site.domain}/sitemap-index.xml`;

  const content = `User-agent: *
Allow: /

# Block admin and private paths
Disallow: /api/
Disallow: /_astro/

# Sitemap
Sitemap: ${sitemapURL}

# Crawl-delay (optional, respected by some bots)
Crawl-delay: 10
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
