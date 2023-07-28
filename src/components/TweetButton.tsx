"use client";

import Link from "next/link";
import { FaTwitter } from "react-icons/fa";
import Icon from "@components/Icon";

interface Props {
  title: string;
  url: string;
  tags: string[];
}
const tagsToText = (tags: string[]) => {
  return tags.map((tag) => tag.replace(/ /g, "")).join(",");
};

const TweetButton = ({ title, url, tags }: Props) => {
  return (
    <Link
      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${url}&hashtags=${tagsToText(tags)}`}
    >
      <Icon icon={<FaTwitter />} />
    </Link>
  );
};

export default TweetButton;
