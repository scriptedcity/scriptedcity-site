const { withContentlayer } = require('next-contentlayer');
const nextMdx = require("@next/mdx");
const remarkGfm = import("remark-gfm");
const rehypePrism = require( '@mapbox/rehype-prism');

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  trailingSlash: true,
  output: 'export'
  /*
  experimental: {
    mdxRs: true,
  },
  */
}

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  }
});

module.exports = withContentlayer(withMDX(nextConfig));