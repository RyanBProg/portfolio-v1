import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projectsCollection = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/projects/" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    techStack: z.array(z.string()),
    projectUrl: z.string(),
    githubUrl: z.string(),
    slug: z.string(),
  }),
});

export const collections = { projectsCollection };
