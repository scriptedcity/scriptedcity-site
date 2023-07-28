const { withContentlayer } = require("next-contentlayer");
const nextMdx = require("@next/mdx");
const remarkGfm = import("remark-gfm");
const rehypePrism = require("@mapbox/rehype-prism");
const remarkBreaks = import("remark-breaks");

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

module.exports = withContentlayer(withMDX(nextConfig));
