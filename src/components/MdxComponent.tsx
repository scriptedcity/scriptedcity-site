"use client";

import { useMDXComponent } from "next-contentlayer/hooks";

const MdxBody = ({ code }: { code: string }) => {
  const MDXComponent = useMDXComponent(code);
  return <MDXComponent />;
};
export default MdxBody;
