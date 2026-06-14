"use client";

import { animate, stagger } from "animejs";
import { useEffect, useRef, useState } from "react";

import Footer from "@/components/footer";
import PageBackground from "@/components/page-background";
import PostFeed from "@/components/post-feed";
import {
  getFilterBackgroundImage,
  type FilterId,
  type PostFilter,
} from "@/lib/post-filters";
import type { DevlogPost } from "@/lib/posts";
import Header from "../components/header";

interface HomePageProps {
  filters: PostFilter[];
  posts: DevlogPost[];
}

export default function HomePage({ filters, posts }: HomePageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<FilterId>("perceptual");
  const [previousFilter, setPreviousFilter] = useState<FilterId | null>(null);
  const [isBackgroundTransitioning, setIsBackgroundTransitioning] =
    useState(false);
  const backgroundTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const pageElement = pageRef.current;
    if (!pageElement) {
      return;
    }

    const backgroundElement = pageElement.querySelector(
      "[data-intro='background']",
    );
    const headerElement = pageElement.querySelector("[data-intro='header']");
    const postFeedElement = pageElement.querySelector("[data-intro='post-feed']");
    const contentCards = pageElement.querySelectorAll("[data-intro='content']");

    contentCards.forEach((card) => {
      if (card instanceof HTMLElement) {
        card.style.opacity = "0";
        card.style.transform = "translateY(24px)";
      }
    });

    if (backgroundElement) {
      animate(backgroundElement, {
        opacity: [0, 1],
        duration: 900,
        ease: "outCubic",
      });
    }

    if (headerElement) {
      animate(headerElement, {
        opacity: [0, 1],
        translateY: [-18, 0],
        duration: 650,
        delay: 140,
        ease: "outCubic",
      });
    }

    if (postFeedElement) {
      animate(postFeedElement, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 650,
        delay: 300,
        ease: "outCubic",
      });
    }

    if (contentCards.length > 0) {
      animate(contentCards, {
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 620,
        delay: stagger(80, { start: 520 }),
        ease: "outCubic",
      });
    }
  }, []);

  function handleFilterChange(nextFilter: FilterId) {
    if (nextFilter === activeFilter) {
      return;
    }

    if (backgroundTimeoutRef.current) {
      window.clearTimeout(backgroundTimeoutRef.current);
    }

    setPreviousFilter(activeFilter);
    setActiveFilter(nextFilter);
    setIsBackgroundTransitioning(false);

    window.requestAnimationFrame(() => {
      setIsBackgroundTransitioning(true);
    });

    backgroundTimeoutRef.current = window.setTimeout(() => {
      setPreviousFilter(null);
      setIsBackgroundTransitioning(false);
    }, 700);
  }

  return (
    <div
      ref={pageRef}
      className="relative flex min-h-screen flex-col items-center overflow-hidden bg-black p-6 font-sans"
    >
      <div data-intro="background" className="opacity-0">
        <PageBackground
          imageSrc={getFilterBackgroundImage(filters, activeFilter)}
          isTransitioning={isBackgroundTransitioning}
          previousImageSrc={
            previousFilter
              ? getFilterBackgroundImage(filters, previousFilter)
              : null
          }
        />
      </div>
      <div className="relative z-10 flex w-full flex-col items-center">
        <div data-intro="header" className="w-full opacity-0">
          <Header />
        </div>
        <div data-intro="post-feed" className="w-full opacity-0">
          <PostFeed
            filters={filters}
            onFilterChange={handleFilterChange}
            posts={posts}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}
