"use client";

import Header from "@components/Header";
import { getCategories } from "@utils";
import { LINKS } from "@const";

import Profile from "@contents/profile.mdx";
import RecentPosts from "@contents/recentposts.mdx";
import About from "@contents/about.mdx";

export default function Home() {
  return (
    <main>
      <Header categories={getCategories()} links={LINKS} />
      <div className="container prose prose-zinc mx-auto max-w-xl py-8 dark:prose-invert md:prose-lg lg:prose-xl md:max-w-2xl lg:max-w-6xl xl:max-w-7xl">
        <Profile className="m-4" />
        <About />
        <RecentPosts />
      </div>
    </main>
  );
}
