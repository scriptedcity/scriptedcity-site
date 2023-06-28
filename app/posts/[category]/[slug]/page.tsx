import React from "react";

import { allPosts } from "contentlayer/generated";
import MdxComponent from "@components/MdxComponent";

export const generateStaticParams = async () => {
  return allPosts.map((post) => {
    const [category, slug] = post.path.split("/");
    return {
      category,
      slug,
    };
  });
};

export const generateMetadata = ({
  params,
}: {
  params: { category: string; slug: string };
}) => {
  const { category, slug } = params;
  const post = allPosts.find((post) => {
    return post.path === `${category}/${slug}`;
  });
  if (!post) throw new Error(`Post not found for slug: ${params}`);
  return { title: post.title };
};

const PostLayout = ({
  params,
}: {
  params: { category: string; slug: string };
}) => {
  console.log({params})
  const { category, slug } = params;
  const post = allPosts.find((post) => post.path === `${category}/${slug}`);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  return (
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-left">
        <h2 className="text-3xl font-bold">{post.title}</h2>
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {post.date}
        </time>
      </div>
      <div className="[&>*]:mb-3 [&>*:last-child]:mb-0">
        <MdxComponent code={post.body.code} />
      </div>
    </article>
  );
};

export default PostLayout;
