import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from "remark-gfm";
import rehypePrism from '@mapbox/rehype-prism';

const getPath = (doc) =>{ 
    const { category, slug } = doc;
    let [pathCategory, pathSlug] = doc._raw.flattenedPath.split('/')
    if (pathSlug.indexOf(".") > 0) {
      pathSlug = pathSlug.substring(pathSlug.indexOf(".")+1);
    }
    return `${category ?? pathCategory}/${slug ?? pathSlug}`
  }

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/!(*_draft).mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    category: {
      type: 'string',
      description: 'The category of the post',
      required: false,
    },
    slug: {
      type: 'string',
      description: 'The path of the post',
      required: false,
    },
  },
  computedFields: {
    path: {
      type: 'string',
      resolve: getPath,
    },
    url: {
      type: 'string',
      resolve: (doc) => `/posts/${getPath(doc)}`,
    },
    categoryName: {
      type: 'string',
      resolve: (doc) => doc.category ?? doc._raw.flattenedPath.split('/')[0],
    },
    articleName: {
      type: 'string',
      resolve: (doc) => doc.slug ?? getPath(doc).split('/')[1],
    },
  },
}))

export default makeSource({
  contentDirPath: 'contents',
  documentTypes: [Post],
    mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  }
})
