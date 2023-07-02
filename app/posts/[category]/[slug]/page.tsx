// display article
import React from "react";

import { allDocuments } from "contentlayer/generated";
import ContentRenderer from "@/src/components/ContentRenderer";

export const generateStaticParams = async () => {
  return allDocuments.map((post) => {
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
  const post = allDocuments.find((post) => {
    return post.path === `${category}/${slug}`;
  });
  if (!post) throw new Error(`Post not found for slug: ${params}`);
  return { title: post.title, openGraph: { images: [post.image] } };
};

const PostLayout = ({
  params,
}: {
  params: { category: string; slug: string };
}) => {
  const { category, slug } = params;
  const post = allDocuments.find((post) => post.path === `${category}/${slug}`);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  return (
    <article className="container mx-auto max-w-5xl py-8">
      <div className="mb-8 justify-center text-center">
        <h2 className="text-3xl font-bold">{post.title}</h2>
        <time dateTime={post.date} className="text-xs text-gray-600">
          {post.date?.slice(0, 10)}
        </time>
      </div>
      <div className="prose prose-zinc mx-auto dark:prose-invert md:prose-lg lg:prose-xl [&>*:last-child]:mb-0 [&>*]:mb-3">
        <ContentRenderer post={post} />
      </div>
    </article>
  );
};

export default PostLayout;
