import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projectsCollection = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/collections/projects/" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      techStack: z.array(z.string()),
      projectUrl: z.string(),
      githubUrl: z.string(),
      slug: z.string(),
      image: image(),
    }),
});

export const collections = { projectsCollection };
