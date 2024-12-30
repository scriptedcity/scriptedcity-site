import Header from "@components/Header";
import { LINKS } from "@const";
import { getCategories } from "@utils";

import "@/app/globals.css";
import { Inter, Roboto_Mono } from "next/font/google";
import { Providers } from "./providers";

export { metadata } from "@const";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${inter.variable} ${roboto_mono.variable}`}>
      <body className="background">
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.9.0/themes/prism-tomorrow.min.css"
          rel="stylesheet"
        />
        <Providers>
          <Header categories={getCategories()} links={LINKS} />
          <article>{children}</article>
        </Providers>
      </body>
    </html>
  );
}
