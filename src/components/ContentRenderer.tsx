"use client";
import { getMDXComponent } from "next-contentlayer2/hooks";
import { Post, PostMdx } from "contentlayer/generated";

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
  } else if ("code" in post.body) {
    const MDXComponent = getMDXComponent(post.body.code as string);
    return <MDXComponent />;
  } else {
    return null;
  }
};
export default ContentRenderer;
