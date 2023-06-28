import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardBody, Image } from "@components/nextui";
import { getCategories, titlize } from "@utils";

import { allPosts } from "contentlayer/generated";

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
  return { title: titlize(category) };
};

const ListLayout = ({ params }: { params: { category: string } }) => {
  const { category } = params;
  return (
    <div className="flex flex-wrap">
      {allPosts
        .filter((post) => post.categoryName === category)
        .sort((a, b) => (a.date > b.date ? -1 : 1))
        .map((post) => (
          <article className="flex-auto w-1/3" key={post._id}>
            <Link href={post.articleName}>
              <Card className="max-w-fit py-4 px-0">
                <CardHeader className="pb-0 pt-2 px-4 flex-col !items-start">
                  <p className="text-xs uppercase font-bold">{post.date}</p>
                  <small className="text-default-500">
                    {post.categoryName}
                  </small>
                  <h4 className="font-bold text-lg">{post.title}</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <Image
                    alt="Card background"
                    src="../../images/stairs.jpg"
                    width={300}
                  />
                </CardBody>
              </Card>
            </Link>
          </article>
        ))}
    </div>
  );
};

export default ListLayout;
