import Link from "next/link";
import { getFilteredPosts } from "@utils";
import ContentCard from "@components/ContentCard";

interface RecentPostsProps {
  category?: string;
  count?: number;
}

const RecentPosts = (props: RecentPostsProps) => {
  const { category, count } = props;
  const posts = getFilteredPosts(category).slice(0, count ?? 4);
  return (
    <div className="container mx-auto max-w-7xl px-8">
      <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 sm:justify-stretch md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post) => (
          <article className="w-fit" key={post._id}>
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
export default RecentPosts;
