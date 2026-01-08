import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ pattern: "posts/**/!(*_draft).{md,mdx}", base: "./contents" }),
  schema: z.object({
    title: z.string(),
    description: z.string().nullable().optional(),
    date: z.date(),
    image: z.string(),
    tags: z.array(z.string()),
  }),
});

const top = defineCollection({
  loader: glob({ pattern: "top/**/*.md", base: "./contents" }),
});

export const collections = { posts, top };
