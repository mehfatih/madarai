import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default("Madar AI Team"),
    category: z.enum(["Growth", "AI", "Forecasting", "Benchmarks", "Product", "Case Study"]),
    tags: z.array(z.string()).default([]),
    readingTime: z.number().default(5),
    featured: z.boolean().default(false),
    image: z.string().optional()
  })
});

export const collections = { blog };