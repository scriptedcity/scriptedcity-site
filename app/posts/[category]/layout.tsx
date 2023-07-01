"use client";

import "@/app/globals.css";

import Header from "@components/Header";
import { getCategories } from "@utils";
import { LINKS } from "@const";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header categories={getCategories()} links={LINKS} />
      <article>{children}</article>
    </>
  );
}
