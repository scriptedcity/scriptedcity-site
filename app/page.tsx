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
      <div className="container mx-auto max-w-7xl py-8 prose prose-zinc mx-auto md:prose-lg lg:prose-xl dark:prose-invert">
        <Profile className="m-4" />
        <About />
        <RecentPosts />
      </div>
    </main>
  );
}
