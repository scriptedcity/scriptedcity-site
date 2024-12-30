"use client";
import type { Post, PostMdx } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer2/hooks";

const ContentRenderer = (props: { post: Post | PostMdx }) => {
  const { post } = props;
  if ("html" in post.body) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: post.body.html as string,
        }}
      />
    );
  }
  if ("code" in post.body) {
    const MDXComponent = getMDXComponent(post.body.code as string);
    return <MDXComponent />;
  }
  return null;
};
export default ContentRenderer;
