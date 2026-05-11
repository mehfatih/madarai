import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default("Madar AI Team"),
    category: z.enum(["Growth", "AI", "Forecasting", "Benchmarks", "Product", "Case Study"]),
    tags: z.array(z.string()).default([]),
    readingTime: z.number().default(5),
    featured: z.boolean().default(false),
    image: z.string().optional()
  })
});

export const collections = { blog };