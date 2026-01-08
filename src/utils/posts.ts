export const getParams = (filePath?: string) => {
  if (!filePath) return { category: "", slug: "" };
  const category = filePath.split("/")[2];
  const slug = filePath.split("/")[3].split(".")[1];
  return { category, slug };
};

import { type CollectionEntry } from "astro:content";

export const sortFunction = (
  a: CollectionEntry<"posts">,
  b: CollectionEntry<"posts">,
) => {
  if (a.data.date == null && b.data.date != null) {
    return -1;
  }
  if (a.data.date != null && b.data.date == null) {
    return 1;
  }
  if (a.data.date == null && b.data.date == null) {
    return a.id > b.id ? -1 : 1;
  }
  if (a.data.date != null && b.data.date != null) {
    return a.data.date > b.data.date ? -1 : 1;
  }
  return 0;
};

export const getDateText = (date: string | Date) => {
  return new Date(date)
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replaceAll("/", "-");
};
