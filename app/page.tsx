"use client";
import RecentPosts from "@components/RecentPosts";
import About from "@contents/about.mdx";
import Profile from "@contents/profile.mdx";

export default function Home() {
  return (
    <main>
      <div className="container mx-auto max-w-xl px-8 pb-8 md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
        <div className="markdown">
          <Profile className="m-4" />
          <About />
        </div>
        {/* Recent posts */}
        <h2 className="my-4 font-bold text-3xl">Recent Posts</h2>
        <RecentPosts />
        {/* Works */}
        <h2 className="my-4 font-bold text-3xl">Works</h2>
        <RecentPosts category="works" />
        {/* discography */}
        <h2 className="my-4 font-bold text-3xl">Discography</h2>
        <RecentPosts category="discography" />
      </div>
    </main>
  );
}
