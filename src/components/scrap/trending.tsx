"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RankCard } from "./trending-card";

const Trending = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Demo data
  const items = Array.from({ length: 10 }, (_, i) => ({
    rank: (i + 1).toString().padStart(2, "0"),
    title: `The Story of Big Foot ${i + 1}`,
    imageUrl: `https://picsum.photos/200/250?random=${i}`,
  }));

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth : clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="text-white p-6 rounded-lg w-full relative flex flex-col h-[300px]">
      <h2 className="text-xl font-semibold mb-4">Trending</h2>

      {/* Scrollable area with arrows absolutely inside */}
      <div className="relative w-full h-[250px]">
        <div className="relative w-full flex flex-start h-full ">
          <div
            ref={scrollRef}
            className="absolute flex gap-4 max-w-[95%] overflow-x-auto max-h-[300px]  pb-5"
          >
            {items.map((item, i) => (
              <RankCard
                key={i}
                rank={item.rank}
                title={item.title}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
          {/* Arrows floating inside container on the right side */}
          <div className="flex flex-col gap-2 absolute right-2 top-1/2 -translate-y-1/2">
            <button
              onClick={() => scroll("left")}
              className="cursor-pointer bg-neutral-800 hover:bg-neutral-600 text-white p-2 rounded-lg shadow-lg"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="cursor-pointer bg-neutral-800 hover:bg-neutral-600 text-white p-2 rounded-lg shadow-lg"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
