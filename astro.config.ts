import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";

const BASE = "/nsg-ireland";

// Prefix root-relative links/images in Markdown (e.g. CMS uploads "/assets/…") with the base path
type HastNode = {
  type: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};
const rehypeBasePath = () => (tree: HastNode) => {
  const walk = (node: HastNode) => {
    if (node.type === "element" && node.properties) {
      for (const key of ["href", "src"]) {
        const value = node.properties[key];
        if (
          typeof value === "string" &&
          value.startsWith("/") &&
          !value.startsWith("//") &&
          !value.startsWith(`${BASE}/`)
        ) {
          node.properties[key] = `${BASE}${value}`;
        }
      }
    }
    node.children?.forEach(walk);
  };
  walk(tree);
};

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  base: BASE,
  trailingSlash: "ignore",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
  ],
  markdown: {
    rehypePlugins: [rehypeBasePath],
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "class",
});
