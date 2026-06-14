"use client";

import { animate } from "animejs";
import { useRef, useState } from "react";

import type { FilterId } from "@/lib/post-filters";

const SLIDE_DISTANCE = 64;

interface FilterOption {
  id: FilterId;
}

export function useFilterTransition(
  initialFilter: FilterId,
  filters: FilterOption[],
  onFilterChange?: (filterId: FilterId) => void,
) {
  const [activeFilter, setActiveFilter] = useState<FilterId>(initialFilter);
  const [renderedFilter, setRenderedFilter] = useState<FilterId>(initialFilter);
  const containerRef = useRef<HTMLDivElement>(null);
  const transitionIdRef = useRef(0);

  function getFilterIndex(filterId: FilterId) {
    return filters.findIndex((filter) => filter.id === filterId);
  }

  function changeFilter(nextFilter: FilterId) {
    if (nextFilter === activeFilter) {
      return;
    }

    const containerElement = containerRef.current;
    const currentIndex = getFilterIndex(activeFilter);
    const nextIndex = getFilterIndex(nextFilter);
    const isMovingRight = nextIndex > currentIndex;
    const exitTo = isMovingRight ? -SLIDE_DISTANCE : SLIDE_DISTANCE;
    const enterFrom = isMovingRight ? SLIDE_DISTANCE : -SLIDE_DISTANCE;
    const transitionId = transitionIdRef.current + 1;

    transitionIdRef.current = transitionId;
    setActiveFilter(nextFilter);
    onFilterChange?.(nextFilter);

    if (!containerElement) {
      setRenderedFilter(nextFilter);
      return;
    }

    animate(containerElement, {
      translateX: exitTo,
      opacity: 0,
      duration: 180,
      ease: "inQuad",
      onComplete: () => {
        if (transitionId !== transitionIdRef.current) {
          return;
        }

        setRenderedFilter(nextFilter);
        containerElement.style.transform = `translateX(${enterFrom}px)`;

        animate(containerElement, {
          translateX: 0,
          opacity: 1,
          duration: 260,
          ease: "outCubic",
        });
      },
    });
  }

  return {
    activeFilter,
    renderedFilter,
    containerRef,
    changeFilter,
  };
}
