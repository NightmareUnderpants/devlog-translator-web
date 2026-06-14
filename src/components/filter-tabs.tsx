"use client";

import type { FilterId } from "@/lib/post-filters";

interface FilterTabsProps {
  activeFilter: FilterId;
  filters: { id: FilterId; title: string }[];
  onChange: (filterId: FilterId) => void;
}

export default function FilterTabs({
  activeFilter,
  filters,
  onChange,
}: FilterTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto rounded-lg p-1 shadow-sm">
      {filters.map((filter) => {
        const isActive = filter.id === activeFilter;

        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onChange(filter.id)}
            className={[
              "h-10 rounded-md px-4 text-sm font-semibold transition-colors",
              isActive
                ? "bg-gray-950 text-white dark:bg-white dark:text-gray-950"
                : "bg-black/60 text-gray-200 hover:bg-black/75 dark:text-gray-200",
            ].join(" ")}
          >
            {filter.title}
          </button>
        );
      })}
    </div>
  );
}
