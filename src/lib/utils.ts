import { allPosts } from "contentlayer/generated";
import { SITE_NAME, TITLE_SEPARATOR } from "@const";

export const capitalize = (string: string) => {
  return string[0].toUpperCase() + string.substring(1).toLowerCase();
}

export const titlize = (title: string) => {
  return `${capitalize(title)} ${TITLE_SEPARATOR} ${SITE_NAME}`
}

export const getCategories = () => {
  const categories: string[] = [];
  allPosts.forEach((post) => {
    if (!categories.includes(post.categoryName)) {
      categories.push(post.categoryName)
    }
  })
  return categories;
}