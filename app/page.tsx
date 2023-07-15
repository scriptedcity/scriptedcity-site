"use client";
import Profile from "@contents/profile.mdx";
import About from "@contents/about.mdx";

import RecentPosts from "@components/RecentPosts";

export default function Home() {
  return (
    <main>
      <div className="container mx-auto max-w-xl px-8 pb-8 md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
        <div className="markdown">
          <Profile className="m-4" />
          <About />
        </div>
        {/* Recent posts */}
        <div className="markdown">
          <h2>Recent Posts</h2>
        </div>
        <RecentPosts />
        {/* Works */}
        <div className="markdown">
          <h2>Works</h2>
        </div>
        <RecentPosts category="works" />
        {/* discography */}
        <div className="markdown">
          <h2>Discography</h2>
        </div>
        <RecentPosts category="discography" />
      </div>
    </main>
  );
}
