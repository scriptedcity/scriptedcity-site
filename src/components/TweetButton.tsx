"use client";

import Icon from "@components/Icon";
import Link from "next/link";
import { FaTwitter } from "react-icons/fa";

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
        title,
      )}&url=${url}&hashtags=${tagsToText(tags)}`}
    >
      <Icon icon={<FaTwitter />} />
    </Link>
  );
};

export default TweetButton;
