import "server-only";

import { DatabaseSync } from "node:sqlite";
import path from "node:path";

import { pageBackgroundImages, type DevlogPost, type GameId } from "@/lib/posts";
import type { PostFilter } from "@/lib/post-filters";

type GameRow = {
  id: GameId;
  title: string;
  backgroundImage: string | null;
};

type DevlogPostRow = {
  id: string;
  title: string;
  author: string;
  gameId: GameId;
  backgroundImage: string | null;
  backgroundColor: string | null;
  sourceLanguage: string;
  content: string;
  createdAt: string;
};

function openDatabase() {
  return new DatabaseSync(path.join(process.cwd(), "dev.db"));
}

function formatDate(value: string) {
  return value.slice(0, 10);
}

export function getPostFiltersFromDb(): PostFilter[] {
  const db = openDatabase();

  try {
    const games = db
      .prepare("SELECT id, title, backgroundImage FROM Game ORDER BY title")
      .all() as GameRow[];

    return [
      {
        id: "all",
        title: "All",
        backgroundImage: pageBackgroundImages.default,
      },
      ...games.map((game) => ({
        id: game.id,
        title: game.title,
        backgroundImage: game.backgroundImage ?? pageBackgroundImages.default,
      })),
    ];
  } finally {
    db.close();
  }
}

export function getDevlogPostsFromDb(): DevlogPost[] {
  const db = openDatabase();

  try {
    const posts = db
      .prepare(
        `SELECT
          id,
          title,
          author,
          gameId,
          backgroundImage,
          backgroundColor,
          sourceLanguage,
          content,
          createdAt
        FROM DevlogPost
        ORDER BY createdAt DESC, id ASC`,
      )
      .all() as DevlogPostRow[];

    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      author: post.author,
      game: post.gameId,
      backgroundImage: post.backgroundImage ?? undefined,
      backgroundColor: post.backgroundColor ?? undefined,
      sourceLanguage: post.sourceLanguage,
      content: post.content,
      createdAt: formatDate(post.createdAt),
    }));
  } finally {
    db.close();
  }
}
