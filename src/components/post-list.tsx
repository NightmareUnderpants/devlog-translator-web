"use client";

import type { RefObject } from "react";

import Card from "@/components/card";
import type { DevlogPost } from "@/lib/posts";

interface PostListProps {
  containerRef: RefObject<HTMLDivElement | null>;
  posts: DevlogPost[];
}

export default function PostList({ containerRef, posts }: PostListProps) {
  return (
    <div className="overflow-hidden">
      <div ref={containerRef} className="mx-auto max-w-2xl space-y-4">
        {posts.map((post) => (
          <div key={post.id} data-intro="content">
            <Card
              title={post.title}
              description={post.content}
              imageSrc={post.backgroundImage}
              author={post.author}
              createdAt={post.createdAt}
              backgroundColor={post.backgroundColor}
              sourceLanguage={post.sourceLanguage}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
