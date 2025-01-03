// display article
import React from "react";

import ContentRenderer from "@/src/components/ContentRenderer";
import GithubButton from "@/src/components/GithubButton";
import TagCloud from "@/src/components/TagCloud";
import TweetButton from "@/src/components/TweetButton";
import { SITE_URL } from "@const";
import { allDocuments } from "contentlayer/generated";

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
      <div className="justify-center text-center">
        <h2 className="bg-cover font-extrabold text-5xl backdrop-blur-md">
          {post.title}
        </h2>
        <TagCloud
          className="mt-4 mb-2 justify-center text-center"
          tags={post.tags}
        />
        <time dateTime={post.date} className="text-gray-600 text-xs">
          {post.date?.slice(0, 10)}
        </time>
      </div>
      <div className="mt-2 flex justify-center gap-1">
        <TweetButton
          title={post.title}
          url={`${SITE_URL}${post.url}`}
          tags={post.tags}
        />
        <GithubButton path={post._raw.sourceFilePath} />
      </div>
      <div className="markdown mx-auto px-4 [&>*:last-child]:mb-0 [&>*]:mb-3">
        <ContentRenderer post={post} />
      </div>
    </article>
  );
};

export default PostLayout;
