"use client";

import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import Icon from "@components/Icon";

interface Props {
  path: string;
}
const GithubButton = ({ path }: Props) => {
  return (
    <Link
      href={`https://github.com/scriptedcity/scriptedcity-site/blob/main/contents/posts/${encodeURIComponent(
        path
      )}`}
    >
      <Icon icon={<FaGithub />} />
    </Link>
  );
};

export default GithubButton;
