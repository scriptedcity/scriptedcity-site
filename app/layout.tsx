import "@/app/globals.css";
import { Providers } from "./providers";

export { metadata } from "@const";

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
          <article>{children}</article>
        </Providers>
      </body>
    </html>
  );
}
