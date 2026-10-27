// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import { unified } from "@astrojs/markdown-remark";
import { rehypeLinkcard } from "./src/utils/rehype-linkcard";

// https://astro.build/config
export default defineConfig({
  site: "https://scriptedcity.dev",
  markdown: {
    // Astro 7 のデフォルトは Sätteri で rehype プラグインを実行できないため、unified を明示する。
    // MDX はこの processor を継承するので mdx() 側でプラグインを重ねて指定しない。
    processor: unified({
      rehypePlugins: [rehypeLinkcard],
    }),
  },
  integrations: [react(), mdx(), icon()],
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
