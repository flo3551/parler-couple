/**
 * Re-export the products collection schema for direct import convenience.
 * The collection is registered in src/content/config.ts.
 * This file provides the TypeScript type so other modules can import it easily.
 */
import { z } from "astro:content";

export const productSchema = z.object({
  name: z.string(),
  slug: z.string(),
  price: z.number(),
  supplier_url: z.string().url(),
  description: z.string(),
  features: z.array(z.string()).default([]),
  seo_kw: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  in_stock: z.boolean().default(true),
});

export type Product = z.infer<typeof productSchema>;
