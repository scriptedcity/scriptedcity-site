import { DocumentTypes, allDocuments } from "contentlayer/generated";
import { SITE_NAME, TITLE_SEPARATOR } from "@const";

export const capitalize = (string: string) => {
  return string[0].toUpperCase() + string.substring(1).toLowerCase();
};

export const titlize = (title: string) => {
  return `${capitalize(title)} ${TITLE_SEPARATOR} ${SITE_NAME}`;
};

export const getCategories = () => {
  const categories: string[] = [];
  allDocuments.forEach((post) => {
    if (!categories.includes(post.categoryName)) {
      categories.push(post.categoryName);
    }
  });
  return categories;
};

export const getTags = () => {
  const tags: string[] = [];
  allDocuments.forEach((post) => {
    post.tags.forEach((tag) => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });
  return tags.sort();
};

const sortFunction = (a: DocumentTypes, b: DocumentTypes) => {
  if (a.date == null && b.date != null) {
    return -1;
  }
  if (a.date != null && b.date == null) {
    return 1;
  }
  if (a.date == null && b.date == null) {
    return a._id > b._id ? -1 : 1;
  }
  if (a.date != null && b.date != null) {
    return a.date > b.date ? -1 : 1;
  }
  return 0;
};

export const listPostsByCategory = (category?: string) => {
  return allDocuments
    .filter((post) => post.categoryName === category || !category)
    .sort(sortFunction);
};

export const listPostsByTag = (tag: string) => {
  const decodedTag = decodeURIComponent(tag);
  return allDocuments
    .filter((post) => post.tags.includes(decodedTag))
    .sort(sortFunction);
};
