import React from "react";

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-8 w-full animate-pulse">
      {/* Search Bar Skeleton */}
      <div className="w-full bg-zinc-200 border-[3px] border-black h-14 shadow-[4px_4px_0px_#000]" />

      {/* Note Cards Skeleton Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white border-[3px] border-black p-5 shadow-[5px_5px_0px_#000] flex flex-col gap-4"
          >
            {/* Title Skeleton */}
            <div className="h-6 bg-zinc-300 border-[2px] border-black w-4/5" />

            {/* Date Skeleton */}
            <div className="h-3.5 bg-zinc-200 border-[1.5px] border-black w-1/3" />

            {/* Content Lines Skeleton */}
            <div className="flex flex-col gap-2 my-2">
              <div className="h-3 bg-zinc-200 w-full" />
              <div className="h-3 bg-zinc-200 w-5/6" />
              <div className="h-3 bg-zinc-200 w-2/3" />
            </div>

            {/* Tags Skeleton */}
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-[#facc15]/40 border-[2px] border-black shadow-[2px_2px_0px_#000]" />
              <div className="h-6 w-20 bg-[#00e5ff]/40 border-[2px] border-black shadow-[2px_2px_0px_#000]" />
            </div>

            {/* Actions Skeleton */}
            <div className="flex gap-2 pt-3 border-t-[2px] border-zinc-200 mt-2">
              <div className="flex-1 h-8 bg-zinc-200 border-[2px] border-black" />
              <div className="w-14 h-8 bg-[#facc15]/40 border-[2px] border-black" />
              <div className="w-14 h-8 bg-[#fb7185]/40 border-[2px] border-black" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
