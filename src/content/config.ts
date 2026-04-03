import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    metaDescription: z.string(),
    kw_primary: z.string(),
    kw_secondary: z.array(z.string()).default([]),
    internal_links: z
      .array(z.object({ url: z.string(), anchor: z.string() }))
      .default([]),
    word_count: z.number().optional(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

const products = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    price: z.number(),
    supplier_url: z.string().url(),
    description: z.string(),
    features: z.array(z.string()).default([]),
    seo_kw: z.array(z.string()).default([]),
    images: z.array(z.string()).default([]),
    in_stock: z.boolean().default(true),
  }),
});

export const collections = { blog, products };
