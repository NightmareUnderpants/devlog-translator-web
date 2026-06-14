"use client";

import { useMemo, useState } from "react";

import Card from "@/components/card";
import { games, posts, type GameId } from "@/lib/posts";

type FilterId = "all" | GameId;

export default function PostFeed() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("perceptual");

  const visiblePosts = useMemo(() => {
    return posts
      .filter((post) => activeFilter === "all" || post.game === activeFilter)
      .sort(
        (leftPost, rightPost) =>
          new Date(rightPost.createdAt).getTime() -
          new Date(leftPost.createdAt).getTime(),
      );
  }, [activeFilter]);

  const filters: { id: FilterId; title: string }[] = [
    { id: "all", title: "All" },
    ...games,
  ];

  return (
    <section className="w-full space-y-4 p-4">
      <div className="flex gap-2 overflow-x-auto rounded-lg p-1 shadow-sm">
        {filters.map((filter) => {
          const isActive = filter.id === activeFilter;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={[
                "h-10 rounded-md px-4 text-sm font-semibold transition-colors",
                isActive
                  ? "bg-gray-950 text-white dark:bg-white dark:text-gray-950"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
              ].join(" ")}
            >
              {filter.title}
            </button>
          );
        })}
      </div>

      <div className="mx-auto max-w-2xl space-y-4">
        {visiblePosts.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            description={post.content}
            imageSrc={post.backgroundImage}
            author={post.author}
            createdAt={post.createdAt}
            backgroundColor={post.backgroundColor}
            sourceLanguage={post.sourceLanguage}
          />
        ))}
      </div>
    </section>
  );
}
