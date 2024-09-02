import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";

const getPath = (doc) => {
  const { category, slug } = doc;
  let [pathCategory, pathSlug] = doc._raw.flattenedPath.split("/");
  if (pathSlug.indexOf(".") > 0) {
    pathSlug = pathSlug.substring(pathSlug.indexOf(".") + 1);
  }
  return `${category ?? pathCategory}/${slug ?? pathSlug}`;
};

const fields = {
  title: {
    type: "string",
    description: "The title of the post",
    required: true,
  },
  description: {
    type: "string",
    description: "The title of the post",
    required: false,
  },
  date: {
    type: "date",
    description: "The date of the post",
    required: false,
  },
  category: {
    type: "string",
    description: "The category of the post",
    required: false,
  },
  slug: {
    type: "string",
    description: "The path of the post",
    required: false,
  },
  image: {
    type: "string",
    description: "The image of the post",
    required: false,
  },
  tags: {
    type: "list",
    of: { type: "string" },
    description: "The tags of the post",
    required: true,
  },
};
const computedFields = {
  path: {
    type: "string",
    resolve: getPath,
  },
  url: {
    type: "string",
    resolve: (doc) => `/posts/${getPath(doc)}`,
  },
  categoryName: {
    type: "string",
    resolve: (doc) => doc.category ?? doc._raw.flattenedPath.split("/")[0],
  },
  articleName: {
    type: "string",
    resolve: (doc) => doc.slug ?? getPath(doc).split("/")[1],
  },
};

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/!(*_draft).md`,
  contentType: "markdown",
  fields,
  computedFields,
}));

const PostMdx = defineDocumentType(() => ({
  name: "PostMdx",
  filePathPattern: `**/!(*_draft).mdx`,
  contentType: "mdx",
  fields,
  computedFields,
}));

export default makeSource({
  contentDirPath: "contents/posts",
  documentTypes: [Post, PostMdx],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
});
