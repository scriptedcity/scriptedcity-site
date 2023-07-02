// display articles in a category
import React from "react";
import Link from "next/link";
import ContentCard from "@components/ContentCard";
import { getCategories, capitalize, titlize, getFilteredPosts } from "@utils";

export const generateStaticParams = async () => {
  return getCategories().map((category) => ({
    category,
  }));
};

export const generateMetadata = ({
  params,
}: {
  params: { category: string };
}) => {
  const { category } = params;
  return { title: capitalize(category) };
};

const ListLayout = ({ params }: { params: { category: string } }) => {
  const { category } = params;
  return (
    <div className="container mx-auto max-w-7xl">
      <h2 className="mb-4 w-full pt-5 text-center text-3xl font-bold">
        {capitalize(category)}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {getFilteredPosts(category).map((post) => (
          <article className="w-full" key={post._id}>
            <Link href={post.path} prefetch={false}>
              <ContentCard
                title={post.title}
                src={post.image ?? ""}
                date={post.date ?? ""}
                tags={post.tags ?? []}
              />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ListLayout;
