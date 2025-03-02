import ContentCard from "@components/ContentCard";
import { listPostsByCategory } from "@utils";
import Link from "next/link";

interface RecentPostsProps {
  category?: string;
  count?: number;
}

const RecentPosts = (props: RecentPostsProps) => {
  const { category, count } = props;
  const posts = listPostsByCategory(category).slice(0, count ?? 6);
  return (
    <div className="container mx-auto max-w-7xl px-8">
      <div className="grid grid-cols-1 place-content-stretch justify-items-center gap-4 sm:grid-cols-1 sm:justify-stretch md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
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
export default RecentPosts;
