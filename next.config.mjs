import nextMdx from "@next/mdx";
import { withContentlayer } from "next-contentlayer2";
import rehypePrism from "rehype-prism-plus";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  trailingSlash: true,
  output: "export",
  /*
  experimental: {
    mdxRs: true,
  },
  */
};

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkBreaks],
    rehypePlugins: [rehypePrism],
  },
});

export default withContentlayer(withMDX(nextConfig));
