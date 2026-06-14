"use client";

import { useMemo } from "react";

import FilterTabs from "@/components/filter-tabs";
import PostList from "@/components/post-list";
import { useFilterTransition } from "@/hooks/use-filter-transition";
import { getVisiblePosts } from "@/lib/post-filters";
import type { FilterId, PostFilter } from "@/lib/post-filters";
import type { DevlogPost } from "@/lib/posts";

interface PostFeedProps {
  filters: PostFilter[];
  onFilterChange?: (filterId: FilterId) => void;
  posts: DevlogPost[];
}

export default function PostFeed({
  filters,
  onFilterChange,
  posts,
}: PostFeedProps) {
  const { activeFilter, changeFilter, containerRef, renderedFilter } =
    useFilterTransition("perceptual", filters, onFilterChange);

  const visiblePosts = useMemo(() => {
    return getVisiblePosts(posts, renderedFilter);
  }, [posts, renderedFilter]);

  return (
    <section className="w-full space-y-4 p-4">
      <FilterTabs
        activeFilter={activeFilter}
        filters={filters}
        onChange={changeFilter}
      />
      <PostList containerRef={containerRef} posts={visiblePosts} />
    </section>
  );
}
