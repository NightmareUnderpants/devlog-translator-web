import {
  games,
  pageBackgroundImages,
  type DevlogPost,
  type GameId,
} from "@/lib/posts";

export type FilterId = "all" | GameId;

export type PostFilter = {
  id: FilterId;
  title: string;
  backgroundImage: string;
};

export const postFilters: PostFilter[] = [
  {
    id: "all",
    title: "All",
    backgroundImage: pageBackgroundImages.default,
  },
  ...games,
];

export function getFilterBackgroundImage(
  filters: { id: FilterId; backgroundImage: string }[],
  filterId: FilterId,
) {
  return (
    filters.find((filter) => filter.id === filterId)?.backgroundImage ??
    pageBackgroundImages.default
  );
}

export function getDefaultFilterBackgroundImage(filterId: FilterId) {
  return getFilterBackgroundImage(postFilters, filterId);
}

export function getVisiblePosts(allPosts: DevlogPost[], filterId: FilterId) {
  return allPosts
    .filter((post) => filterId === "all" || post.game === filterId)
    .sort(
      (leftPost, rightPost) =>
        new Date(rightPost.createdAt).getTime() -
        new Date(leftPost.createdAt).getTime(),
    );
}
