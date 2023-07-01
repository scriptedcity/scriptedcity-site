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
    <div className="container mx-auto max-w-7xl py-8">
      <h2 className="text-3xl font-bold pt-5 mb-4 w-full text-center">
        {capitalize(category)}
      </h2>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
        {getFilteredPosts(category).map((post) => (
          <article className="w-full" key={post._id}>
            <Link href={post.articleName} prefetch={false}>
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
