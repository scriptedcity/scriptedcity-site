// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import { rehypeLinkcard } from "./src/utils/rehype-linkcard";

// https://astro.build/config
export default defineConfig({
  markdown: {
    rehypePlugins: [rehypeLinkcard],
  },
  integrations: [
    react(),
    mdx({
      rehypePlugins: [rehypeLinkcard],
    }),
    icon(),
  ],
  trailingSlash: "never",
  vite: {
    resolve: {
      alias: {
        "@": "./src",
      },
    },
    plugins: [tailwindcss()],
  },
});
