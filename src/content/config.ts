import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
    }),
});

const guides = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    location: z.string(),
    languages: z.array(z.string()).default(["English"]),
    email: z.string().optional(),
    phone: z.string().optional(),
    website: z.string().optional(),
    photo: z.string().optional(),
    lat: z.number(),
    lng: z.number(),
    order: z.number().default(100),
    placeholder: z.boolean().optional(),
  }),
});

export const collections = { blog, guides };
