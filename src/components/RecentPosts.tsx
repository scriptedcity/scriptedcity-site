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
    <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
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
  );
};
export default RecentPosts;
