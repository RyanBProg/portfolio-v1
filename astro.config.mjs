// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://ryanbprog.com/",
  integrations: [tailwind(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: "dracula",
    },
  },
  adapter: node({
    mode: "standalone",
  }),
  experimental: {
    session: true,
  },
});
