import { visit } from "unist-util-visit";
import type { Root, Element, ElementContent } from "hast";
import * as cheerio from "cheerio";
import { promises as fs } from "fs";
import { join } from "path";

interface OgpData {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const CACHE_DIR = join(process.cwd(), ".cache", "ogp");

async function ensureCacheDir() {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
  } catch (error) {
    console.error("キャッシュディレクトリの作成に失敗:", error);
  }
}

async function getCacheKey(url: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(url);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function getFromCache(url: string): Promise<OgpData | null> {
  try {
    const key = await getCacheKey(url);
    const cachePath = join(CACHE_DIR, `${key}.json`);
    const data = await fs.readFile(cachePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return null;
  }
}

async function saveToCache(url: string, data: OgpData): Promise<void> {
  try {
    await ensureCacheDir();
    const key = await getCacheKey(url);
    const cachePath = join(CACHE_DIR, `${key}.json`);
    await fs.writeFile(cachePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("キャッシュの保存に失敗:", error);
  }
}

async function fetchOgpData(url: string): Promise<OgpData> {
  const cached = await getFromCache(url);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LinkCardBot/1.0)",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const ogpData: OgpData = {
      title:
        $('meta[property="og:title"]').attr("content") || $("title").text(),
      description:
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="description"]').attr("content"),
      image: $('meta[property="og:image"]').attr("content"),
      url: $('meta[property="og:url"]').attr("content") || url,
    };

    await saveToCache(url, ogpData);
    return ogpData;
  } catch (error) {
    console.error(`OGP情報の取得に失敗 (${url}):`, error);
    const fallbackData: OgpData = { title: url, url };
    await saveToCache(url, fallbackData);
    return fallbackData;
  }
}

export function rehypeLinkcard() {
  return async (tree: Root) => {
    const promises: Promise<void>[] = [];

    visit(tree, "element", (node: Element, index, parent) => {
      if (
        node.tagName === "a" &&
        node.properties?.href &&
        typeof node.properties.href === "string" &&
        node.properties.href.startsWith("https://") &&
        parent &&
        typeof index === "number"
      ) {
        const href = node.properties.href;
        const textContent = extractText(node.children);

        if (textContent !== href) {
          return;
        }

        const promise = (async () => {
          const ogpData = await fetchOgpData(href);

          const linkCard: Element = {
            type: "element",
            tagName: "div",
            properties: {
              className: ["not-prose"],
            },
            children: [
              {
                type: "element",
                tagName: "a",
                properties: {
                  href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: [
                    "card",
                    "card-side",
                    "bg-base-100",
                    "border",
                    "border-base-300",
                    "transition-all",
                    "hover:shadow-lg",
                    "no-underline",
                    "items-center",
                  ],
                },
                children: [
                  ...(ogpData.image
                    ? [
                        {
                          type: "element" as const,
                          tagName: "figure",
                          properties: {
                            className: [
                              "w-32",
                              "h-32",
                              "flex-shrink-0",
                              "overflow-hidden",
                              "max-sm:w-full",
                              "max-sm:h-48",
                            ],
                          },
                          children: [
                            {
                              type: "element" as const,
                              tagName: "img",
                              properties: {
                                src: ogpData.image,
                                alt: ogpData.title || "",
                                loading: "lazy",
                                className: ["w-full", "h-full", "object-cover"],
                              },
                              children: [],
                            },
                          ],
                        },
                      ]
                    : []),
                  {
                    type: "element",
                    tagName: "div",
                    properties: {
                      className: ["card-body", "p-4"],
                    },
                    children: [
                      {
                        type: "element",
                        tagName: "h3",
                        properties: {
                          className: [
                            "card-title",
                            "text-base",
                            "line-clamp-2",
                          ],
                        },
                        children: [
                          {
                            type: "text",
                            value: ogpData.title || textContent || href,
                          },
                        ],
                      },
                      ...(ogpData.description
                        ? [
                            {
                              type: "element" as const,
                              tagName: "p",
                              properties: {
                                className: [
                                  "text-sm",
                                  "text-neutral",
                                  "line-clamp-2",
                                ],
                              },
                              children: [
                                {
                                  type: "text" as const,
                                  value: ogpData.description,
                                },
                              ],
                            },
                          ]
                        : []),
                      {
                        type: "element",
                        tagName: "p",
                        properties: {
                          className: ["text-xs", "text-neutral", "truncate"],
                        },
                        children: [
                          {
                            type: "text",
                            value: href,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          };

          parent.children[index] = linkCard;
        })();

        promises.push(promise);
      }
    });

    await Promise.all(promises);
  };
}

function extractText(children: ElementContent[]): string {
  return children
    .map((child) => {
      if (child.type === "text") {
        return child.value;
      }
      if (child.type === "element" && child.children) {
        return extractText(child.children);
      }
      return "";
    })
    .join("");
}
