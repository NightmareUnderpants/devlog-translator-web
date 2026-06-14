import HomePage from "@/components/home-page";
import { getDevlogPostsFromDb, getPostFiltersFromDb } from "@/lib/db-posts";

export default function Home() {
  const filters = getPostFiltersFromDb();
  const posts = getDevlogPostsFromDb();

  return <HomePage filters={filters} posts={posts} />;
}
