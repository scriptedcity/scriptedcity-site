"use client";

import "@/app/globals.css";
import { Providers } from "./providers";

import Header from "@components/Header";
import { getCategories } from "@utils";
import { LINKS } from "@const";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.9.0/themes/prism-tomorrow.min.css"
          rel="stylesheet"
        />
        <Providers>
          <Header categories={getCategories()} links={LINKS} />
          <article className="prose prose-xl">{children}</article>
        </Providers>
      </body>
    </html>
  );
}
