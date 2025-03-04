import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projectsCollection = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/collections/projects/" }),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      techStack: z.array(z.string()),
      siteUrl: z.string(),
      githubUrl: z.string(),
      slug: z.string(),
      image: image(),
      featured: z.boolean(),
      features: z.array(z.string()),
      futureOptimisations: z.array(z.string()),
    }),
});

export const collections = { projectsCollection };
