import ContentCard from "@components/ContentCard";
import { capitalize, getCategories, listPostsByCategory } from "@utils";
import Link from "next/link";
// display articles in a category
import React from "react";

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
    <div className="container mx-auto max-w-7xl px-8">
      <h2 className="mb-4 w-full pt-5 text-center font-bold text-3xl">
        {capitalize(category)}
      </h2>
      <div className="grid grid-cols-1 place-content-stretch justify-items-center gap-4 sm:grid-cols-1 sm:justify-stretch md:grid-cols-2 lg:grid-cols-3">
        {listPostsByCategory(category).map((post) => (
          <article className="w-full" key={post._id}>
            <Link href={post.url} prefetch={false}>
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
